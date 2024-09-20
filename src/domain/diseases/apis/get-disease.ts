import { useQuery } from "@tanstack/react-query";
import { DiseaseFormData } from "../components/disease-form";

const fetchDiseaseData = async (
  diseaseId: string
): Promise<DiseaseFormData> => {
  // Simulate API call with 1 second delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return dummy data
  return {
    cancerType: "Breast Cancer",
    pathology: "Invasive Ductal Carcinoma",
    location: "Left Breast",
    dateOfDiagnosis: "2023-01-15",
    menopausalStatus: "postmenopausal",
  };
};

export const useDisease = ({
  diseaseId,
}: {
  diseaseId: string | null | undefined;
}) => {
  return useQuery<DiseaseFormData, Error>({
    queryKey: ["disease", diseaseId],
    queryFn: () => fetchDiseaseData(diseaseId!),
    enabled: !!diseaseId,
  });
};
