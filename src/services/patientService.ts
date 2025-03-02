import { supabase } from "@/lib/supabase";

export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  notes?: string;
  pharmacist_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Allergy {
  id: string;
  patient_id: string;
  allergy: string;
  created_at?: string;
}

export interface Medication {
  id: string;
  patient_id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface WebsterPack {
  id: string;
  barcode: string;
  patient_id: string;
  pharmacist_id: string;
  status: "pending" | "completed";
  timestamp: string;
  created_at?: string;
  updated_at?: string;
}

export interface WebsterPackMedication {
  id: string;
  webster_pack_id: string;
  medication_id: string;
  created_at?: string;
}

// Patient functions
export const getPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching patients:", error);
    return [];
  }

  return data || [];
};

export const getPatientById = async (id: string): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching patient ${id}:`, error);
    return null;
  }

  return data;
};

export const createPatient = async (
  patient: Omit<Patient, "id">,
): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from("patients")
    .insert([patient])
    .select()
    .single();

  if (error) {
    console.error("Error creating patient:", error);
    return null;
  }

  return data;
};

export const updatePatient = async (
  id: string,
  patient: Partial<Patient>,
): Promise<Patient | null> => {
  const { data, error } = await supabase
    .from("patients")
    .update(patient)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating patient ${id}:`, error);
    return null;
  }

  return data;
};

export const deletePatient = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("patients").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting patient ${id}:`, error);
    return false;
  }

  return true;
};

// Allergy functions
export const getPatientAllergies = async (
  patientId: string,
): Promise<Allergy[]> => {
  const { data, error } = await supabase
    .from("patient_allergies")
    .select("*")
    .eq("patient_id", patientId);

  if (error) {
    console.error(`Error fetching allergies for patient ${patientId}:`, error);
    return [];
  }

  return data || [];
};

export const addPatientAllergy = async (
  allergy: Omit<Allergy, "id" | "created_at">,
): Promise<Allergy | null> => {
  const { data, error } = await supabase
    .from("patient_allergies")
    .insert([allergy])
    .select()
    .single();

  if (error) {
    console.error("Error adding allergy:", error);
    return null;
  }

  return data;
};

export const deletePatientAllergy = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from("patient_allergies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting allergy ${id}:`, error);
    return false;
  }

  return true;
};

// Medication functions
export const getPatientMedications = async (
  patientId: string,
): Promise<Medication[]> => {
  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("patient_id", patientId)
    .order("name");

  if (error) {
    console.error(
      `Error fetching medications for patient ${patientId}:`,
      error,
    );
    return [];
  }

  return data || [];
};

export const getMedicationById = async (
  id: string,
): Promise<Medication | null> => {
  const { data, error } = await supabase
    .from("medications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching medication ${id}:`, error);
    return null;
  }

  return data;
};

export const createMedication = async (
  medication: Omit<Medication, "id">,
): Promise<Medication | null> => {
  const { data, error } = await supabase
    .from("medications")
    .insert([medication])
    .select()
    .single();

  if (error) {
    console.error("Error creating medication:", error);
    return null;
  }

  return data;
};

export const updateMedication = async (
  id: string,
  medication: Partial<Medication>,
): Promise<Medication | null> => {
  const { data, error } = await supabase
    .from("medications")
    .update(medication)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating medication ${id}:`, error);
    return null;
  }

  return data;
};

export const deleteMedication = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("medications").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting medication ${id}:`, error);
    return false;
  }

  return true;
};

// Webster Pack functions
export const getWebsterPacks = async (): Promise<WebsterPack[]> => {
  const { data, error } = await supabase
    .from("webster_packs")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Error fetching webster packs:", error);
    return [];
  }

  return data || [];
};

export const getPatientWebsterPacks = async (
  patientId: string,
): Promise<WebsterPack[]> => {
  const { data, error } = await supabase
    .from("webster_packs")
    .select("*")
    .eq("patient_id", patientId)
    .order("timestamp", { ascending: false });

  if (error) {
    console.error(
      `Error fetching webster packs for patient ${patientId}:`,
      error,
    );
    return [];
  }

  return data || [];
};

export const getWebsterPackById = async (
  id: string,
): Promise<WebsterPack | null> => {
  const { data, error } = await supabase
    .from("webster_packs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching webster pack ${id}:`, error);
    return null;
  }

  return data;
};

export const getWebsterPackByBarcode = async (
  barcode: string,
): Promise<WebsterPack | null> => {
  const { data, error } = await supabase
    .from("webster_packs")
    .select("*")
    .eq("barcode", barcode)
    .single();

  if (error) {
    console.error(
      `Error fetching webster pack with barcode ${barcode}:`,
      error,
    );
    return null;
  }

  return data;
};

export const createWebsterPack = async (
  pack: Omit<WebsterPack, "id">,
): Promise<WebsterPack | null> => {
  const { data, error } = await supabase
    .from("webster_packs")
    .insert([pack])
    .select()
    .single();

  if (error) {
    console.error("Error creating webster pack:", error);
    return null;
  }

  return data;
};

export const updateWebsterPack = async (
  id: string,
  pack: Partial<WebsterPack>,
): Promise<WebsterPack | null> => {
  const { data, error } = await supabase
    .from("webster_packs")
    .update(pack)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating webster pack ${id}:`, error);
    return null;
  }

  return data;
};

export const deleteWebsterPack = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("webster_packs").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting webster pack ${id}:`, error);
    return false;
  }

  return true;
};

// Webster Pack Medications functions
export const getWebsterPackMedications = async (
  websterPackId: string,
): Promise<WebsterPackMedication[]> => {
  const { data, error } = await supabase
    .from("webster_pack_medications")
    .select("*")
    .eq("webster_pack_id", websterPackId);

  if (error) {
    console.error(
      `Error fetching medications for webster pack ${websterPackId}:`,
      error,
    );
    return [];
  }

  return data || [];
};

export const addMedicationToWebsterPack = async (
  websterPackId: string,
  medicationId: string,
): Promise<WebsterPackMedication | null> => {
  const { data, error } = await supabase
    .from("webster_pack_medications")
    .insert([{ webster_pack_id: websterPackId, medication_id: medicationId }])
    .select()
    .single();

  if (error) {
    console.error("Error adding medication to webster pack:", error);
    return null;
  }

  return data;
};

export const removeMedicationFromWebsterPack = async (
  id: string,
): Promise<boolean> => {
  const { error } = await supabase
    .from("webster_pack_medications")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error removing medication from webster pack ${id}:`, error);
    return false;
  }

  return true;
};

// Helper function to get full webster pack details including patient and medications
export const getWebsterPackDetails = async (packId: string) => {
  // Get the webster pack
  const pack = await getWebsterPackById(packId);
  if (!pack) return null;

  // Get the patient
  const patient = await getPatientById(pack.patient_id);
  if (!patient) return null;

  // Get the medications in this pack
  const packMedications = await getWebsterPackMedications(packId);
  const medicationIds = packMedications.map((pm) => pm.medication_id);

  // Get the actual medication details
  const medications: Medication[] = [];
  for (const medId of medicationIds) {
    const med = await getMedicationById(medId);
    if (med) medications.push(med);
  }

  return {
    pack,
    patient,
    medications,
  };
};
