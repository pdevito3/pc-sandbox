import { useMutation } from "@tanstack/react-query";
import { DiseaseFormData } from "../components/disease-form";

const updateDisease = async (data: {
  id: string;
  disease: DiseaseFormData;
}): Promise<DiseaseFormData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.1) {
    throw new Error("Failed to update disease");
  }
  return data.disease;
};

export const useUpdateDisease = () => {
  return useMutation({
    mutationFn: updateDisease,
  });
};
