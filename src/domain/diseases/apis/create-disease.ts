import { useMutation } from "@tanstack/react-query";
import { DiseaseFormData } from "../components/disease-form";

const createDisease = async (
  data: DiseaseFormData
): Promise<DiseaseFormData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.1) {
    throw new Error("Failed to create disease");
  }
  return data;
};

export const useCreateDisease = () => {
  return useMutation({
    mutationFn: createDisease,
  });
};
