import { useMutation } from "@tanstack/react-query";
import { PatientFormData } from "../components/patient-postcase-form";

const updatePatient = async (data: {
  id: string;
  patient: PatientFormData;
}): Promise<PatientFormData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (Math.random() < 0.1) {
    throw new Error("Failed to update patient");
  }
  return data.patient;
};

export const useUpdatePatient = () => {
  return useMutation({
    mutationFn: updatePatient,
  });
};
