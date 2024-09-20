import { createFileRoute, useParams } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useCase } from "../domain/cases/apis/get-case";
import { useUpdateCase } from "../domain/cases/apis/update-case";
import { CaseForm, CaseFormData } from "../domain/cases/components/case-form";
import { useDisease } from "../domain/diseases/apis/get-disease";
import { useUpdateDisease } from "../domain/diseases/apis/update-disease";
import {
  DiseaseForm,
  DiseaseFormData,
} from "../domain/diseases/components/disease-form";
import { usePatient } from "../domain/patients/apis/get-patient";
import { useUpdatePatient } from "../domain/patients/apis/update-patient";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";
import { FormStatusCard } from "../domain/postcase/form-status-card";
import { PostCaseApiResponse } from "../types";

export const Route = createFileRoute("/postcase/$patientId/$caseId")({
  component: PostCaseEditComponent,
});

function PostCaseEditComponent() {
  const { patientId, caseId } = useParams({ strict: false });
  const { data: patientDto, isLoading: isLoadingPatient } = usePatient({
    patientId,
  });
  const { data: caseDto, isLoading: isLoadingCase } = useCase({ caseId });
  const { data: diseaseDto, isLoading: isLoadingDisease } = useDisease({
    diseaseId: caseId,
  });

  const updatePatient = useUpdatePatient();
  const updateCase = useUpdateCase();
  const updateDisease = useUpdateDisease();

  const handlePatientSubmit = async (data: { patient: PatientFormData }) => {
    try {
      await updatePatient.mutateAsync({
        id: patientId!,
        patient: data.patient,
      });
      toast.success(`Patient data updated successfully!`);
      return {
        state: "success",
        message: "Patient data updated successfully!",
      } as PostCaseApiResponse;
    } catch (error) {
      toast.error(`Failed to update patient data: ${error.message}`);
      return {
        state: "fail",
        message: `Failed to update patient data: ${error.message}`,
      } as PostCaseApiResponse;
    }
  };

  const handleCaseSubmit = async (data: CaseFormData) => {
    try {
      await updateCase.mutateAsync({ id: caseId!, case: data });
      toast.success(`Case data updated successfully!`);
      return {
        state: "success",
        message: "Case data updated successfully!",
      } as PostCaseApiResponse;
    } catch (error) {
      toast.error(`Failed to update case data: ${error.message}`);
      return {
        state: "fail",
        message: `Failed to update case data: ${error.message}`,
      } as PostCaseApiResponse;
    }
  };

  const handleDiseaseSubmit = async (data: DiseaseFormData) => {
    try {
      await updateDisease.mutateAsync({ id: caseId!, disease: data });
      toast.success(`Disease data updated successfully!`);
      return {
        state: "success",
        message: "Disease data updated successfully!",
      } as PostCaseApiResponse;
    } catch (error) {
      toast.error(`Failed to update disease data: ${error.message}`);
      return {
        state: "fail",
        message: `Failed to update disease data: ${error.message}`,
      } as PostCaseApiResponse;
    }
  };

  if (isLoadingPatient || isLoadingCase || isLoadingDisease) {
    return (
      <div className="p-2">
        <h3 className="text-2xl font-bold">Post Case</h3>
        <p className="text-white">Loading data...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-6">Post Case</h3>
      <div className="flex items-start justify-between">
        <FormStatusCard
          isLoading={isLoadingPatient || isLoadingCase || isLoadingDisease}
        />
        <div className="flex-1">
          <div className="mt-0">
            {patientDto && (
              <PatientPostCaseForm
                patientId={patientId}
                patientData={{
                  ...patientDto,
                  dateOfBirth: patientDto.dateOfBirth
                    .toISOString()
                    .split("T")[0],
                }}
                onSubmit={handlePatientSubmit}
              />
            )}
          </div>

          <div className="mt-8">
            {caseDto && (
              <CaseForm
                caseId={caseId}
                caseData={caseDto}
                onSubmit={handleCaseSubmit}
              />
            )}
          </div>

          <div className="mt-8">
            {diseaseDto && (
              <DiseaseForm
                diseaseId={caseId}
                diseaseData={diseaseDto}
                onSubmit={handleDiseaseSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
