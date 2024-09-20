import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostCaseSideBar } from "../../postcase/postcase-sidebar.store";

const patientFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .date()
    .max(new Date(), "Date of birth cannot be in the future"),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;

interface PatientPostCaseFormProps {
  patientId?: string;
  patientData?: PatientFormData;
  onSubmit: (data: { patient: PatientFormData }) => void;
}

export function PatientPostCaseForm({
  patientId,
  patientData,
  onSubmit,
}: PatientPostCaseFormProps) {
  const isEditMode = !!patientId;

  const {
    register: registerPatient,
    handleSubmit: handleSubmitPatient,
    formState: { errors: patientErrors, isValid },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: patientData,
  });

  const onSubmitHandler = (patientData: PatientFormData) => {
    onSubmit({ patient: patientData });
  };
  const { updateSideBarSectionState } = usePostCaseSideBar();
  React.useEffect(() => {
    updateSideBarSectionState("patient", isValid ? "valid" : "invalid");
  }, [isValid]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 dark:text-gray-200">
        {isEditMode ? "Edit Patient" : "Add Patient"}
      </h2>

      <form onSubmit={handleSubmitPatient(onSubmitHandler)}>
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            {...registerPatient("firstName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {patientErrors.firstName && (
            <span className="text-red-500 text-xs mt-1">
              {patientErrors.firstName.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            {...registerPatient("lastName")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {patientErrors.lastName && (
            <span className="text-red-500 text-xs mt-1">
              {patientErrors.lastName.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
          >
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            id="dateOfBirth"
            type="date"
            {...registerPatient("dateOfBirth", { valueAsDate: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {patientErrors.dateOfBirth && (
            <span className="text-red-500 text-xs mt-1">
              {patientErrors.dateOfBirth.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
        >
          {isEditMode ? "Update" : "Add"} Patient
        </button>
      </form>
    </div>
  );
}
