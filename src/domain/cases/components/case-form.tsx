import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostCaseApiResponse } from "../../../types";
import { usePostCaseSideBar } from "../../postcase/postcase-sidebar.store";

const caseFormSchema = z.object({
  conferenceName: z.string().min(1, "Conference name is required"),
  suggestedDateTime: z.string().optional(),
});

export type CaseFormData = z.infer<typeof caseFormSchema>;

interface CaseFormProps {
  caseId?: string;
  caseData?: CaseFormData;
  onSubmit: (data: CaseFormData) => PostCaseApiResponse;
}

export function CaseForm({ caseId, caseData, onSubmit }: CaseFormProps) {
  const isEditMode = !!caseId;

  const {
    register,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: caseData,
  });

  const {
    updateSideBarSectionState,
    startAutosavingForm,
    finishAutosavingForm,
  } = usePostCaseSideBar();

  useEffect(() => {
    updateSideBarSectionState("case", isValid ? "valid" : "invalid");
  }, [isValid, updateSideBarSectionState]);

  const debouncedSubmit = debounce(async (data: CaseFormData) => {
    if (!isValid) {
      return;
    }

    startAutosavingForm("case");
    var response = await onSubmit(data);
    if (response.state === "success") {
      finishAutosavingForm("case", true);
    } else {
      finishAutosavingForm("case", false);
    }
  }, 1500);

  useEffect(() => {
    const subscription = watch((data) => {
      if (isDirty) {
        debouncedSubmit(data as CaseFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isDirty, debouncedSubmit]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-200">
        {isEditMode ? "Edit Case" : "Add Case"}
      </h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="conferenceName"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Conference Name <span className="text-red-500">*</span>
          </label>
          <input
            id="conferenceName"
            {...register("conferenceName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.conferenceName && (
            <span className="text-red-500 text-xs mt-1">
              {errors.conferenceName.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="suggestedDateTime"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Suggested Date and Time
          </label>
          <input
            id="suggestedDateTime"
            type="datetime-local"
            {...register("suggestedDateTime")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
}
