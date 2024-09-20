import { useQuery } from "@tanstack/react-query";
import { CaseFormData } from "../components/case-form";

const fetchCaseData = async (caseId: string): Promise<CaseFormData> => {
  // Simulate API call with 1 second delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return dummy data
  return {
    conferenceName: "Sample Conference",
    suggestedDateTime: "2023-05-15T14:00",
  };
};

export const useCase = ({ caseId }: { caseId: string | null | undefined }) => {
  return useQuery<CaseFormData, Error>({
    queryKey: ["case", caseId],
    queryFn: () => fetchCaseData(caseId!),
    enabled: !!caseId,
  });
};
