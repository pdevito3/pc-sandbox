import { createFileRoute, useParams } from "@tanstack/react-router";
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
  }); // Assuming diseaseId is the same as caseId

  const handlePatientSubmit = (data: PatientFormData) => {
    console.log("Patient data:", JSON.stringify(data, null, 2));
  };

  const handleCaseSubmit = (data: CaseFormData) => {
    console.log("Case data:", JSON.stringify(data, null, 2));
  };

  const handleDiseaseSubmit = (data: DiseaseFormData) => {
    console.log("Disease data:", JSON.stringify(data, null, 2));
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
    <div className="p-2">
      <h3 className="text-2xl font-bold mb-6">Post Case</h3>

      <div className="mb-8">
        {patientDto && (
          <PatientPostCaseForm
            patientId={patientId}
            patientData={{
              ...patientDto,
              dateOfBirth: patientDto.dateOfBirth.toISOString().split("T")[0],
            }}
            onSubmit={handlePatientSubmit}
          />
        )}
      </div>

      <div className="mb-8">
        {caseDto && (
          <CaseForm
            caseId={caseId}
            caseData={caseDto}
            onSubmit={handleCaseSubmit}
          />
        )}
      </div>

      <div>
        {diseaseDto && (
          <DiseaseForm
            diseaseId={caseId}
            diseaseData={diseaseDto}
            onSubmit={handleDiseaseSubmit}
          />
        )}
      </div>
    </div>
  );
}
