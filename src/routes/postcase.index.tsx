import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { CaseForm, CaseFormData } from "../domain/cases/components/case-form";
import {
  DiseaseForm,
  DiseaseFormData,
} from "../domain/diseases/components/disease-form";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";
import { FormStatusCard } from "../domain/postcase/form-status-card";

export const Route = createFileRoute("/postcase/")({
  component: PostCaseComponent,
});

function PostCaseComponent() {
  const handlePatientSubmit = (data: PatientFormData) => {
    // console.log("Patient data:", JSON.stringify(data, null, 2));
    toast.success(`Submitted Patient data: ${JSON.stringify(data, null, 2)}`);
  };

  const handleCaseSubmit = (data: CaseFormData) => {
    // console.log("Case data:", JSON.stringify(data, null, 2));
    toast.success(`Submitted Case data: ${JSON.stringify(data, null, 2)}`);
  };

  const handleDiseaseSubmit = (data: DiseaseFormData) => {
    // console.log("Disease data:", JSON.stringify(data, null, 2));
    toast.success(`Submitted Disease data: ${JSON.stringify(data, null, 2)}`);
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
