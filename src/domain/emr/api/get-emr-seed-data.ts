import { useQuery } from "@tanstack/react-query";

interface EmrSeedData {
  patientName: string;
  dateOfBirth: string;
  disease: {
    cancerType: string;
    pathology: string;
    location: string;
    dateOfDiagnosis: string;
    menopausalStatus?: string;
  };
}

const fetchEmrSeedData = async (identifier: string): Promise<EmrSeedData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    patientName: "Jane Doe",
    dateOfBirth: "1994-01-16",
    disease: {
      cancerType: "Breast Cancer",
      pathology: "Invasive Ductal Carcinoma",
      location: "Left Breast",
      dateOfDiagnosis: "2023-03-01",
      menopausalStatus: "premenopausal",
    },
  };
};

export const useEmrSeedData = ({ identifier }: { identifier: string }) => {
  return useQuery<EmrSeedData, Error>({
    queryKey: ["emrSeedData", identifier],
    queryFn: () => fetchEmrSeedData(identifier),
    enabled: !!identifier,
  });
};
