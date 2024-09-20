import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useEmrSeedData } from "../domain/emr/api/get-emr-seed-data";
import {
  PatientFormData,
  PatientPostCaseForm,
} from "../domain/patients/components/patient-postcase-form";

export const Route = createFileRoute("/postcase/emr")({
  component: PostCaseEmrComponent,
});

function PostCaseEmrComponent() {
  const [identifier, setIdentifier] = useState<string | null>(null);
  const { data: seedData, isLoading } = useEmrSeedData(identifier);

  const handleIdentifierSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setIdentifier(formData.get("identifier") as string);
  };

  const handlePatientSubmit = (data: PatientFormData) => {
    console.log("Submitted patient data:", data);
  };

  return (
    <div className="p-2">
      <h3>Post Case EMR</h3>
      <form onSubmit={handleIdentifierSubmit} className="mb-4">
        <input
          type="text"
          name="identifier"
          placeholder="Enter EMR identifier"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Get Seed Data
        </button>
      </form>

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
