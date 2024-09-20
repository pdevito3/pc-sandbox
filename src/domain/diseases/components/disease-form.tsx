import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostCaseSideBar } from "../../postcase/postcase-sidebar.store";

const diseaseFormSchema = z.object({
  cancerType: z.string().min(1, "Cancer type is required"),
  pathology: z.string().min(1, "Pathology is required"),
  location: z.string().min(1, "Location is required"),
  dateOfDiagnosis: z.string().optional(),
  menopausalStatus: z.string().optional(),
});

export type DiseaseFormData = z.infer<typeof diseaseFormSchema>;

interface DiseaseFormProps {
  diseaseId?: string;
  diseaseData?: DiseaseFormData;
  onSubmit: (data: DiseaseFormData) => void;
}

export function DiseaseForm({
  diseaseId,
  diseaseData,
  onSubmit,
}: DiseaseFormProps) {
  const isEditMode = !!diseaseId;

  const {
    register,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<DiseaseFormData>({
    resolver: zodResolver(diseaseFormSchema),
    defaultValues: diseaseData,
  });

  const {
    updateSideBarSectionState,
    startAutosavingForm,
    finishAutosavingForm,
  } = usePostCaseSideBar();
  useEffect(() => {
    updateSideBarSectionState("disease", isValid ? "valid" : "invalid");
  }, [isValid, updateSideBarSectionState]);

  const debouncedSubmit = React.useCallback(
    debounce(async (data: DiseaseFormData) => {
      if (!isValid) {
        return;
      }

      startAutosavingForm("disease");
      await onSubmit(data);
      finishAutosavingForm("disease", true);
    }, 1500),
    [onSubmit, isValid]
  );

  useEffect(() => {
    const subscription = watch((data) => {
      if (isDirty) {
        debouncedSubmit(data as DiseaseFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isDirty, debouncedSubmit]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-200">
        {isEditMode ? "Edit Disease" : "Add Disease"}
      </h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="cancerType"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Cancer Type <span className="text-red-500">*</span>
          </label>
          <input
            id="cancerType"
            {...register("cancerType")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.cancerType && (
            <span className="text-red-500 text-xs mt-1">
              {errors.cancerType.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="pathology"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Pathology <span className="text-red-500">*</span>
          </label>
          <input
            id="pathology"
            {...register("pathology")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pathology && (
            <span className="text-red-500 text-xs mt-1">
              {errors.pathology.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            {...register("location")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location && (
            <span className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="dateOfDiagnosis"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Date of Diagnosis
          </label>
          <input
            id="dateOfDiagnosis"
            type="date"
            {...register("dateOfDiagnosis")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="menopausalStatus"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Menopausal Status
          </label>
          <select
            id="menopausalStatus"
            {...register("menopausalStatus")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select status</option>
            <option value="premenopausal">Premenopausal</option>
            <option value="perimenopausal">Perimenopausal</option>
            <option value="postmenopausal">Postmenopausal</option>
          </select>
        </div>
      </form>
    </div>
  );
}
