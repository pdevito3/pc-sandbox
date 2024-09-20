import { useQuery } from "@tanstack/react-query";

interface EmrSeedData {
  // Define the structure of your seed data here
  patientName: string;
  dateOfBirth: string;
  // Add more fields as needed
}

const fetchEmrSeedData = async (identifier: string): Promise<EmrSeedData> => {
  // Simulate API call with 1 second delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return dummy data
  return {
    patientName: "Jane Doe",
    dateOfBirth: "1994-01-16",
    // Add more fields as needed
  };
};

export const useEmrSeedData = (identifier: string | null) => {
  return useQuery<EmrSeedData, Error>({
    queryKey: ["emrSeedData", identifier],
    queryFn: () => fetchEmrSeedData(identifier!),
    enabled: !!identifier,
  });
};
