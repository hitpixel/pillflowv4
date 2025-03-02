import React, { useState, useEffect } from "react";
import { usePatients } from "@/hooks/usePatients";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Search,
  Plus,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";

interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  notes: string;
}

const PatientsList: React.FC = () => {
  const { patients, loading, error, fetchPatients, addPatient } = usePatients();
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    notes: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [directPatients, setDirectPatients] = useState<any[]>([]);
  const [directLoading, setDirectLoading] = useState(true);

  // Fetch patients directly from Supabase
  useEffect(() => {
    const fetchDirectPatients = async () => {
      setDirectLoading(true);
      try {
        const { data, error } = await supabase
          .from("patients")
          .select("*")
          .order("name");

        if (error) {
          console.error("Error fetching patients directly:", error);
        } else {
          console.log("Patients fetched directly from Supabase:", data);
          setDirectPatients(data || []);
        }
      } catch (err) {
        console.error("Exception fetching patients:", err);
      } finally {
        setDirectLoading(false);
      }
    };

    fetchDirectPatients();
    fetchPatients();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addPatient(formData);
    if (result) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        date_of_birth: "",
        notes: "",
      });
      setIsDialogOpen(false);
    }
  };

  // Combine both patient sources, prioritizing direct Supabase data
  const combinedPatients = [
    ...directPatients,
    ...patients.filter((p) => !directPatients.some((dp) => dp.id === p.id)),
  ];

  const filteredPatients = combinedPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.email &&
        patient.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (patient.phone && patient.phone.includes(searchQuery)),
  );

  return (
    <div className="w-full h-full bg-[#0a0e17] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Patients</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0d121f] text-white border-[#1e2738]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter patient name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-900/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth" className="text-gray-300">
                        Date of Birth
                      </Label>
                      <Input
                        id="date_of_birth"
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className="bg-gray-900/50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-gray-900/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-900/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-300">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter full address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-gray-900/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-300">
                      Notes
                    </Label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="w-full min-h-[100px] rounded-md border border-[#1e2738] bg-gray-900/50 px-3 py-2 text-sm text-white"
                      placeholder="Enter any notes or special instructions"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Patient</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients by name, email or phone..."
              className="pl-10 bg-[#0d121f] border-[#1e2738] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading || directLoading ? (
          <div className="text-center py-8 text-gray-400 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            Loading patients...
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">{error}</div>
        ) : filteredPatients.length === 0 ? (
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="h-12 w-12 text-gray-300 mb-4" />
              {searchQuery ? (
                <p className="text-lg font-medium text-gray-300">
                  No patients found matching your search
                </p>
              ) : (
                <>
                  <p className="text-lg font-medium text-gray-300">
                    No patients found
                  </p>
                  <p className="text-gray-400 mt-1">
                    Add your first patient to get started
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Patient
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => (
              <Card
                key={patient.id}
                className="bg-[#0d121f] hover:bg-[#1e2738] transition-colors cursor-pointer border-[#1e2738]"
                onClick={() => {
                  // Use the parent component's handler instead of changing location
                  if (typeof window !== "undefined" && window.parent) {
                    try {
                      // Try to access parent component's handleCustomerSelect
                      const event = new CustomEvent("selectPatient", {
                        detail: { id: patient.id },
                      });
                      window.dispatchEvent(event);
                    } catch (e) {
                      console.error("Failed to communicate with parent:", e);
                    }
                  }
                }}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">
                    {patient.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {patient.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{patient.phone}</span>
                      </div>
                    )}
                    {patient.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{patient.email}</span>
                      </div>
                    )}
                    {patient.address && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{patient.address}</span>
                      </div>
                    )}
                    {patient.date_of_birth && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">
                          {format(new Date(patient.date_of_birth), "PPP")}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;
