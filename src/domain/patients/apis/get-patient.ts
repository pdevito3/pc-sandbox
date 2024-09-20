import { useQuery } from "@tanstack/react-query";
import { PatientDto } from "../types";

const fetchPatientData = async (patientId: string): Promise<PatientDto> => {
  // Simulate API call with 2 second delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return dummy data
  return {
    id: patientId,
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: new Date("1990-04-06"),
  };
};

export const usePatient = ({
  patientId,
}: {
  patientId: string | null | undefined;
}) => {
  return useQuery<PatientDto, Error>({
    queryKey: ["patient", patientId],
    queryFn: () => fetchPatientData(patientId!),
    enabled: !!patientId,
  });
};
