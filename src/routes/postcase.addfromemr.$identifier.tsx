import { createFileRoute, useParams } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { CaseForm, CaseFormData } from "../domain/cases/components/case-form";
import {
  DiseaseForm,
  DiseaseFormData,
} from "../domain/diseases/components/disease-form";
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
    toast.success("Patient data added successfully!");
  };

  const handleCaseSubmit = (data: CaseFormData) => {
    toast.success("Case data added successfully!");
  };

  const handleDiseaseSubmit = (data: DiseaseFormData) => {
    toast.success("Disease data added successfully!");
  };

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold mb-6">Post Case</h3>

      {isLoading && <p>Loading seed data...</p>}

      {seedData && (
        <>
          <div className="mt-8">
            <PatientPostCaseForm
              patientData={{
                firstName: seedData.patientName.split(" ")[0],
                lastName: seedData.patientName.split(" ")[1] || "",
                dateOfBirth: new Date(seedData.dateOfBirth),
              }}
              onSubmit={handlePatientSubmit}
            />
          </div>

          <div className="mt-8">
            <CaseForm onSubmit={handleCaseSubmit} />
          </div>

          <div className="mt-8">
            <DiseaseForm
              diseaseData={seedData.disease}
              onSubmit={handleDiseaseSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}
