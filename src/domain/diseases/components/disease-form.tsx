import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    handleSubmit,
    formState: { errors },
  } = useForm<DiseaseFormData>({
    resolver: zodResolver(diseaseFormSchema),
    defaultValues: diseaseData,
  });

  const onSubmitHandler = (data: DiseaseFormData) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-200">
        {isEditMode ? "Edit Disease" : "Add Disease"}
      </h2>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
        >
          {isEditMode ? "Update" : "Add"} Disease
        </button>
      </form>
    </div>
  );
}
