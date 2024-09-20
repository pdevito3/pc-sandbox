import { useMutation } from "@tanstack/react-query";
import { CaseFormData } from "../components/case-form";

const createCase = async (data: CaseFormData): Promise<CaseFormData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.1) {
    throw new Error("Failed to create case");
  }
  return data;
};

export const useCreateCase = () => {
  return useMutation({
    mutationFn: createCase,
  });
};
