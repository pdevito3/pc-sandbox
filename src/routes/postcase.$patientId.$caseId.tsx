import { createFileRoute, useParams } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useCase } from "../domain/cases/apis/get-case";
import { CaseForm, CaseFormData } from "../domain/cases/components/case-form";
import { useDisease } from "../domain/diseases/apis/get-disease";
import {
  DiseaseForm,
  DiseaseFormData,
} from "../domain/diseases/components/disease-form";
import { usePatient } from "../domain/patients/apis/get-patient";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";
import { FormStatusCard } from "../domain/postcase/form-status-card";

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

  const handlePatientSubmit = async (data: { patient: PatientFormData }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(
      `Patient data autosaved successfully!\n\n${JSON.stringify(data.patient, null, 2)}`
    );
  };

  const handleCaseSubmit = async (data: CaseFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(
      `Case data autosaved successfully!\n\n${JSON.stringify(data, null, 2)}`
    );
  };

  const handleDiseaseSubmit = async (data: DiseaseFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(
      `Disease data autosaved successfully!\n\n${JSON.stringify(data, null, 2)}`
    );
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
