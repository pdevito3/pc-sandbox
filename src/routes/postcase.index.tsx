import { createFileRoute } from "@tanstack/react-router";
import { CaseForm, CaseFormData } from "../domain/cases/components/case-form";
import {
  DiseaseForm,
  DiseaseFormData,
} from "../domain/diseases/components/disease-form";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";

export const Route = createFileRoute("/postcase/")({
  component: PostCaseComponent,
});

function PostCaseComponent() {
  const handlePatientSubmit = (data: PatientFormData) => {
    console.log("Patient data:", JSON.stringify(data, null, 2));
  };

  const handleCaseSubmit = (data: CaseFormData) => {
    console.log("Case data:", JSON.stringify(data, null, 2));
  };

  const handleDiseaseSubmit = (data: DiseaseFormData) => {
    console.log("Disease data:", JSON.stringify(data, null, 2));
  };

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold mb-6">Post Case</h3>

      <div className="mb-8">
        <PatientPostCaseForm onSubmit={handlePatientSubmit} />
      </div>

      <div className="mb-8">
        <CaseForm onSubmit={handleCaseSubmit} />
      </div>

      <div>
        <DiseaseForm onSubmit={handleDiseaseSubmit} />
      </div>
    </div>
  );
}
