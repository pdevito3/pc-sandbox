import { useMutation } from "@tanstack/react-query";
import { PatientFormData } from "../components/patient-postcase-form";

const createPatient = async (
  data: PatientFormData
): Promise<PatientFormData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.9) {
    throw new Error("Failed to create patient");
  }
  return data;
};

export const useCreatePatient = () => {
  return useMutation({
    mutationFn: createPatient,
  });
};
