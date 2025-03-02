import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  medicationNotes: string;
  websterPacks: number;
}

const PatientManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Mock data for patients
  const defaultPatients: Patient[] = [
    {
      id: "P001",
      name: "John Smith",
      dob: "1965-05-12",
      phone: "(02) 9876 5432",
      email: "john.smith@example.com",
      address: "123 Main Street, Sydney NSW 2000",
      medicationNotes:
        "Allergic to penicillin. Takes medication in the morning.",
      websterPacks: 3,
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      dob: "1978-11-23",
      phone: "(02) 8765 4321",
      email: "sarah.j@example.com",
      address: "45 Park Avenue, Melbourne VIC 3000",
      medicationNotes:
        "Requires low sodium medications. Prefers evening dosage.",
      websterPacks: 2,
    },
    {
      id: "P003",
      name: "Robert Williams",
      dob: "1952-08-30",
      phone: "(02) 7654 3210",
      email: "rwilliams@example.com",
      address: "78 Beach Road, Brisbane QLD 4000",
      medicationNotes:
        "Has difficulty swallowing large pills. Needs liquid alternatives when possible.",
      websterPacks: 4,
    },
    {
      id: "P004",
      name: "Emily Chen",
      dob: "1985-03-17",
      phone: "(02) 6543 2109",
      email: "emily.chen@example.com",
      address: "92 River View, Perth WA 6000",
      medicationNotes:
        "No known allergies. Prefers morning medication routine.",
      websterPacks: 1,
    },
    {
      id: "P005",
      name: "Michael Taylor",
      dob: "1970-12-05",
      phone: "(02) 5432 1098",
      email: "mtaylor@example.com",
      address: "15 Mountain Drive, Adelaide SA 5000",
      medicationNotes:
        "Requires medication reminder calls. History of missing doses.",
      websterPacks: 2,
    },
  ];

  const [patients, setPatients] = useState<Patient[]>(defaultPatients);

  // Filter patients based on search query
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="w-full h-full p-6 bg-[#0a0e17]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input id="name" placeholder="Enter patient name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dob" className="text-sm font-medium">
                      Date of Birth
                    </label>
                    <Input id="dob" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address
                  </label>
                  <Input id="address" placeholder="Enter full address" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Medication Notes
                  </label>
                  <textarea
                    id="notes"
                    className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                    placeholder="Enter any medication notes, allergies, or special instructions"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Patient</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left panel - Patient search and list */}
          <div className="md:col-span-1">
            <Card className="h-full bg-[#0d121f] text-white border-[#1e2738]">
              <CardHeader>
                <CardTitle>Patient Directory</CardTitle>
                <CardDescription>Search and select patients</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or ID"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className={`p-3 rounded-md cursor-pointer transition-colors ${selectedPatient?.id === patient.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100 border border-transparent"}`}
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{patient.name}</h3>
                            <p className="text-sm text-gray-500">
                              ID: {patient.id}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {patient.websterPacks} packs
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No patients found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right panel - Patient details */}
          <div className="md:col-span-2">
            {selectedPatient ? (
              <Card className="bg-[#0d121f] text-white border-[#1e2738]">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedPatient.name}</CardTitle>
                      <CardDescription>
                        Patient ID: {selectedPatient.id}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="details">
                    <TabsList className="w-full">
                      <TabsTrigger value="details" className="flex-1">
                        Patient Details
                      </TabsTrigger>
                      <TabsTrigger value="medications" className="flex-1">
                        Medications
                      </TabsTrigger>
                      <TabsTrigger value="webster" className="flex-1">
                        Webster Packs
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <User className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Full Name
                              </p>
                              <p>{selectedPatient.name}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Date of Birth
                              </p>
                              <p>
                                {new Date(
                                  selectedPatient.dob,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Phone Number
                              </p>
                              <p>{selectedPatient.phone}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Email Address
                              </p>
                              <p>{selectedPatient.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-500">
                                Address
                              </p>
                              <p>{selectedPatient.address}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="medications" className="mt-4">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              Medication Notes
                            </p>
                            <p className="mt-1">
                              {selectedPatient.medicationNotes}
                            </p>
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-4">
                          <h4 className="font-medium text-amber-800 mb-2">
                            Current Medications
                          </h4>
                          <p className="text-sm text-amber-700">
                            This is a placeholder for the medication list. In a
                            real implementation, this would display the
                            patient's current medications from the database.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="webster" className="mt-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Active Webster Packs</h3>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Add Pack
                          </Button>
                        </div>

                        {selectedPatient.websterPacks > 0 ? (
                          <div className="space-y-3">
                            {Array.from({
                              length: selectedPatient.websterPacks,
                            }).map((_, index) => (
                              <Card key={index} className="bg-white">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium">
                                        Webster Pack #{index + 1}
                                      </h4>
                                      <p className="text-sm text-gray-500">
                                        Last updated:{" "}
                                        {new Date().toLocaleDateString()}
                                      </p>
                                    </div>
                                    <Badge
                                      variant={
                                        index % 2 === 0
                                          ? "default"
                                          : "secondary"
                                      }
                                    >
                                      {index % 2 === 0 ? "Active" : "Pending"}
                                    </Badge>
                                  </div>
                                  <div className="mt-2 text-sm">
                                    <p>
                                      Contains medications for: Morning, Noon,
                                      Evening
                                    </p>
                                    <p className="mt-1">
                                      Next refill due:{" "}
                                      {new Date(
                                        Date.now() + 7 * 24 * 60 * 60 * 1000,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-md">
                            <p>No active Webster packs for this patient</p>
                            <Button variant="outline" className="mt-2">
                              <Plus className="h-4 w-4 mr-1" />
                              Create First Pack
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center bg-[#0d121f] text-white border-[#1e2738]">
                <CardContent className="text-center py-12">
                  <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No Patient Selected
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Select a patient from the list to view their details, or add
                    a new patient to get started.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Patient
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Patient</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        {/* Same form fields as in the top dialog */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="name2"
                              className="text-sm font-medium"
                            >
                              Full Name
                            </label>
                            <Input
                              id="name2"
                              placeholder="Enter patient name"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="dob2"
                              className="text-sm font-medium"
                            >
                              Date of Birth
                            </label>
                            <Input id="dob2" type="date" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="phone2"
                              className="text-sm font-medium"
                            >
                              Phone Number
                            </label>
                            <Input
                              id="phone2"
                              placeholder="Enter phone number"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="email2"
                              className="text-sm font-medium"
                            >
                              Email Address
                            </label>
                            <Input
                              id="email2"
                              type="email"
                              placeholder="Enter email address"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="address2"
                            className="text-sm font-medium"
                          >
                            Address
                          </label>
                          <Input
                            id="address2"
                            placeholder="Enter full address"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="notes2"
                            className="text-sm font-medium"
                          >
                            Medication Notes
                          </label>
                          <textarea
                            id="notes2"
                            className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                            placeholder="Enter any medication notes, allergies, or special instructions"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Patient</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;
