import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Allergy,
  getPatientAllergies,
  addPatientAllergy,
  deletePatientAllergy,
} from "@/services/patientService";

export const useAllergies = (patientId: string) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAllergies = async () => {
    if (!user?.id || !patientId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPatientAllergies(patientId);
      setAllergies(data);
    } catch (err) {
      console.error(`Error fetching allergies for patient ${patientId}:`, err);
      setError("Failed to load allergies");
    } finally {
      setLoading(false);
    }
  };

  const addAllergy = async (allergyText: string) => {
    if (!user?.id || !patientId) return null;

    setError(null);

    try {
      const newAllergy = await addPatientAllergy({
        patient_id: patientId,
        allergy: allergyText,
      });

      if (newAllergy) {
        setAllergies((prev) => [...prev, newAllergy]);
        return newAllergy;
      }
      return null;
    } catch (err) {
      console.error("Error adding allergy:", err);
      setError("Failed to add allergy");
      return null;
    }
  };

  const removeAllergy = async (id: string) => {
    if (!user?.id || !patientId) return false;

    setError(null);

    try {
      const success = await deletePatientAllergy(id);

      if (success) {
        setAllergies((prev) => prev.filter((a) => a.id !== id));
      }

      return success;
    } catch (err) {
      console.error(`Error deleting allergy ${id}:`, err);
      setError("Failed to delete allergy");
      return false;
    }
  };

  useEffect(() => {
    if (user?.id && patientId) {
      fetchAllergies();
    } else {
      setAllergies([]);
      setLoading(false);
    }
  }, [user?.id, patientId]);

  return {
    allergies,
    loading,
    error,
    fetchAllergies,
    addAllergy,
    removeAllergy,
  };
};
