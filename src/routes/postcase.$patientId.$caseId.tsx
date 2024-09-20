import { createFileRoute, useParams } from "@tanstack/react-router";
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
  const { data: patientDto, isLoading } = usePatient({ patientId });

  const handlePatientSubmit = (data: PatientFormData) => {
    console.log(JSON.stringify(data, null, 2));
  };

  if (isLoading) {
    return (
      <div className="p-2">
        <h3>Post Case</h3>
        <p className="text-white">Loading patient data...</p>
      </div>
    );
  }

  return (
    <div className="p-2">
      <h3>Post Case</h3>

      <div className="pt-10">
        {patientDto && (
          <PatientPostCaseForm
            patientId={patientId}
            patientData={{
              ...patientDto,
              dateOfBirth: patientDto.dateOfBirth.toISOString().split("T")[0], // Convert Date to YYYY-MM-DD string
            }}
            onSubmit={handlePatientSubmit}
          />
        )}
      </div>
    </div>
  );
}
