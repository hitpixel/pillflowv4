import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Patient,
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "@/services/patientService";

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPatients = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (
    patientData: Omit<Patient, "id" | "pharmacist_id">,
  ) => {
    if (!user?.id) return null;

    setError(null);

    try {
      const newPatient = await createPatient({
        ...patientData,
        pharmacist_id: user.id,
      });

      if (newPatient) {
        setPatients((prev) => [...prev, newPatient]);
        return newPatient;
      }
      return null;
    } catch (err) {
      console.error("Error adding patient:", err);
      setError("Failed to add patient");
      return null;
    }
  };

  const editPatient = async (id: string, patientData: Partial<Patient>) => {
    if (!user?.id) return null;

    setError(null);

    try {
      const updatedPatient = await updatePatient(id, patientData);

      if (updatedPatient) {
        setPatients((prev) =>
          prev.map((p) => (p.id === id ? updatedPatient : p)),
        );
        return updatedPatient;
      }
      return null;
    } catch (err) {
      console.error(`Error updating patient ${id}:`, err);
      setError("Failed to update patient");
      return null;
    }
  };

  const removePatient = async (id: string) => {
    if (!user?.id) return false;

    setError(null);

    try {
      const success = await deletePatient(id);

      if (success) {
        setPatients((prev) => prev.filter((p) => p.id !== id));
      }

      return success;
    } catch (err) {
      console.error(`Error deleting patient ${id}:`, err);
      setError("Failed to delete patient");
      return false;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPatients();
    } else {
      setPatients([]);
      setLoading(false);
    }
  }, [user?.id]);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    addPatient,
    editPatient,
    removePatient,
  };
};
