import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Medication,
  getPatientMedications,
  createMedication,
  updateMedication,
  deleteMedication,
} from "@/services/patientService";

export const useMedications = (patientId: string) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchMedications = async () => {
    if (!user?.id || !patientId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPatientMedications(patientId);
      setMedications(data);
    } catch (err) {
      console.error(
        `Error fetching medications for patient ${patientId}:`,
        err,
      );
      setError("Failed to load medications");
    } finally {
      setLoading(false);
    }
  };

  const addMedication = async (medicationData: Omit<Medication, "id">) => {
    if (!user?.id || !patientId) return null;

    setError(null);

    try {
      const newMedication = await createMedication({
        ...medicationData,
        patient_id: patientId,
      });

      if (newMedication) {
        setMedications((prev) => [...prev, newMedication]);
        return newMedication;
      }
      return null;
    } catch (err) {
      console.error("Error adding medication:", err);
      setError("Failed to add medication");
      return null;
    }
  };

  const editMedication = async (
    id: string,
    medicationData: Partial<Medication>,
  ) => {
    if (!user?.id || !patientId) return null;

    setError(null);

    try {
      const updatedMedication = await updateMedication(id, medicationData);

      if (updatedMedication) {
        setMedications((prev) =>
          prev.map((m) => (m.id === id ? updatedMedication : m)),
        );
        return updatedMedication;
      }
      return null;
    } catch (err) {
      console.error(`Error updating medication ${id}:`, err);
      setError("Failed to update medication");
      return null;
    }
  };

  const removeMedication = async (id: string) => {
    if (!user?.id || !patientId) return false;

    setError(null);

    try {
      const success = await deleteMedication(id);

      if (success) {
        setMedications((prev) => prev.filter((m) => m.id !== id));
      }

      return success;
    } catch (err) {
      console.error(`Error deleting medication ${id}:`, err);
      setError("Failed to delete medication");
      return false;
    }
  };

  useEffect(() => {
    if (user?.id && patientId) {
      fetchMedications();
    } else {
      setMedications([]);
      setLoading(false);
    }
  }, [user?.id, patientId]);

  return {
    medications,
    loading,
    error,
    fetchMedications,
    addMedication,
    editMedication,
    removeMedication,
  };
};
