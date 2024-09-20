import { createFileRoute } from "@tanstack/react-router";
import { PatientPostCaseForm } from "../domain/patients/components/patient-postcase-form";
import { PatientFormData } from "../domain/patients/types";

export const Route = createFileRoute("/postcase/")({
  component: PostCaseComponent,
});

function PostCaseComponent() {
  const handlePatientSubmit = (data: PatientFormData) => {
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <div className="p-2">
      <h3>Post Case</h3>

      <div className="pt-10">
        <PatientPostCaseForm onSubmit={handlePatientSubmit} />
      </div>
    </div>
  );
}
