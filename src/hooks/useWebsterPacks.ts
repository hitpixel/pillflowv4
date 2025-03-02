import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import {
  WebsterPack,
  getWebsterPacks,
  getPatientWebsterPacks,
  createWebsterPack,
  updateWebsterPack,
  deleteWebsterPack,
  getWebsterPackByBarcode,
} from "@/services/patientService";

export const useWebsterPacks = (patientId?: string) => {
  const [packs, setPacks] = useState<WebsterPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchPacks = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (patientId) {
        data = await getPatientWebsterPacks(patientId);
      } else {
        data = await getWebsterPacks();
      }
      setPacks(data);
    } catch (err) {
      console.error("Error fetching webster packs:", err);
      setError("Failed to load webster packs");
    } finally {
      setLoading(false);
    }
  };

  const scanBarcode = async (barcode: string) => {
    if (!user?.id) return null;

    setError(null);

    try {
      const pack = await getWebsterPackByBarcode(barcode);
      return pack;
    } catch (err) {
      console.error(`Error scanning barcode ${barcode}:`, err);
      setError("Failed to scan barcode");
      return null;
    }
  };

  const addPack = async (
    packData: Omit<WebsterPack, "id" | "pharmacist_id">,
  ) => {
    if (!user?.id) return null;

    setError(null);

    try {
      const newPack = await createWebsterPack({
        ...packData,
        pharmacist_id: user.id,
      });

      if (newPack) {
        setPacks((prev) => [newPack, ...prev]);
        return newPack;
      }
      return null;
    } catch (err) {
      console.error("Error adding webster pack:", err);
      setError("Failed to add webster pack");
      return null;
    }
  };

  const updatePack = async (id: string, packData: Partial<WebsterPack>) => {
    if (!user?.id) return null;

    setError(null);

    try {
      const updatedPack = await updateWebsterPack(id, packData);

      if (updatedPack) {
        setPacks((prev) => prev.map((p) => (p.id === id ? updatedPack : p)));
        return updatedPack;
      }
      return null;
    } catch (err) {
      console.error(`Error updating webster pack ${id}:`, err);
      setError("Failed to update webster pack");
      return null;
    }
  };

  const removePack = async (id: string) => {
    if (!user?.id) return false;

    setError(null);

    try {
      const success = await deleteWebsterPack(id);

      if (success) {
        setPacks((prev) => prev.filter((p) => p.id !== id));
      }

      return success;
    } catch (err) {
      console.error(`Error deleting webster pack ${id}:`, err);
      setError("Failed to delete webster pack");
      return false;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPacks();
    } else {
      setPacks([]);
      setLoading(false);
    }
  }, [user?.id, patientId]);

  return {
    packs,
    loading,
    error,
    fetchPacks,
    scanBarcode,
    addPack,
    updatePack,
    removePack,
  };
};
