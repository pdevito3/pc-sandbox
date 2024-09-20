import { useMutation } from "@tanstack/react-query";
import { CaseFormData } from "../components/case-form";

const updateCase = async (data: {
  id: string;
  case: CaseFormData;
}): Promise<CaseFormData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.9) {
    throw new Error("Failed to update case");
  }
  return data.case;
};

export const useUpdateCase = () => {
  return useMutation({
    mutationFn: updateCase,
  });
};
