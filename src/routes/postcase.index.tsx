import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useCreateCase } from "../domain/cases/apis/create-case";
import { CaseForm, CaseFormData } from "../domain/cases/components/case-form";
import { useCreateDisease } from "../domain/diseases/apis/create-disease";
import {
  DiseaseForm,
  DiseaseFormData,
} from "../domain/diseases/components/disease-form";
import { useCreatePatient } from "../domain/patients/apis/create-patient";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";
import { FormStatusCard } from "../domain/postcase/form-status-card";
import { PostCaseApiResponse } from "../types";

export const Route = createFileRoute("/postcase/")({
  component: PostCaseComponent,
});

function PostCaseComponent() {
  const createPatient = useCreatePatient();
  const createCase = useCreateCase();
  const createDisease = useCreateDisease();

  const handlePatientSubmit = async (data: { patient: PatientFormData }) => {
    try {
      await createPatient.mutateAsync(data.patient);
      toast.success(`Patient data saved successfully!`);
      return {
        state: "success",
        message: "Patient data saved successfully!",
      } as PostCaseApiResponse;
    } catch (error) {
      toast.error(`Failed to save patient data: ${error.message}`);
      return {
        state: "fail",
        message: `Failed to save patient data: ${error.message}`,
      } as PostCaseApiResponse;
    }
  };

  const handleCaseSubmit = async (data: CaseFormData) => {
    try {
      await createCase.mutateAsync(data);
      toast.success(`Case data saved successfully!`);

      return {
        state: "success",
        message: "Case data saved successfully!",
      } as PostCaseApiResponse;
    } catch (error) {
      toast.error(`Failed to save case data: ${error.message}`);
      return {
        state: "fail",
        message: `Failed to save case data: ${error.message}`,
      } as PostCaseApiResponse;
    }
  };

  const handleDiseaseSubmit = async (data: DiseaseFormData) => {
    try {
      await createDisease.mutateAsync(data);
      toast.success(`Disease data saved successfully!`);

      return {
        state: "success",
        message: "Disease data saved successfully!",
      } as PostCaseApiResponse;
    } catch (error) {
      toast.error(`Failed to save disease data: ${error.message}`);
      return {
        state: "fail",
        message: `Failed to save disease data: ${error.message}`,
      } as PostCaseApiResponse;
    }
  };

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6">Post Case</h3>

      <div className="flex items-start justify-between">
        <FormStatusCard />
        <div className="flex-1">
          <div className="">
            <PatientPostCaseForm onSubmit={handlePatientSubmit} />
          </div>

          <div className="mt-8">
            <CaseForm onSubmit={handleCaseSubmit} />
          </div>

          <div className="mt-8">
            <DiseaseForm onSubmit={handleDiseaseSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
