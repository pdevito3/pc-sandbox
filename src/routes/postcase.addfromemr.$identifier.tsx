import { createFileRoute, useParams } from "@tanstack/react-router";
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

      {isLoading && <p>Loading seed data...</p>}

      {seedData && (
        <>
          <div className="mb-8">
            <PatientPostCaseForm
              patientData={{
                firstName: seedData.patientName.split(" ")[0],
                lastName: seedData.patientName.split(" ")[1] || "",
                dateOfBirth: new Date(seedData.dateOfBirth),
              }}
              onSubmit={handlePatientSubmit}
            />
          </div>

          <div className="mb-8">
            <CaseForm onSubmit={handleCaseSubmit} />
          </div>

          <div>
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
