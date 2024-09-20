import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEmrSeedData } from "../domain/emr/api/get-emr-seed-data";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";

export const Route = createFileRoute("/postcase/addfromemr/$identifier")({
  component: PostCaseEmrComponent,
});

function PostCaseEmrComponent() {
  const { identifier } = useParams({ strict: false });
  const { data: seedData, isLoading } = useEmrSeedData({ identifier });
  const handlePatientSubmit = (data: PatientFormData) => {
    console.log("Submitted patient data:", data);
  };

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold">Post Case</h3>

      {isLoading && <p>Loading seed data...</p>}

      {seedData && (
        <PatientPostCaseForm
          patientData={{
            firstName: seedData.patientName.split(" ")[0],
            lastName: seedData.patientName.split(" ")[1] || "",
            dateOfBirth: seedData.dateOfBirth,
          }}
          onSubmit={handlePatientSubmit}
        />
      )}
    </div>
  );
}
