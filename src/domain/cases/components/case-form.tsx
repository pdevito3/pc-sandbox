import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostCaseSideBar } from "../../postcase/postcase-sidebar";

const caseFormSchema = z.object({
  conferenceName: z.string().min(1, "Conference name is required"),
  suggestedDateTime: z.string().optional(),
});

export type CaseFormData = z.infer<typeof caseFormSchema>;

interface CaseFormProps {
  caseId?: string;
  caseData?: CaseFormData;
  onSubmit: (data: CaseFormData) => void;
}

export function CaseForm({ caseId, caseData, onSubmit }: CaseFormProps) {
  const isEditMode = !!caseId;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseFormSchema),
    defaultValues: caseData,
  });

  const onSubmitHandler = (data: CaseFormData) => {
    onSubmit(data);
  };

  const { updateSideBarState } = usePostCaseSideBar();
  React.useEffect(() => {
    updateSideBarState("case", isValid ? "valid" : "invalid");
  }, [isValid]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-200">
        {isEditMode ? "Edit Case" : "Add Case"}
      </h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
        >
          {isEditMode ? "Update" : "Add"} Case
        </button>
      </form>
    </div>
  );
}
