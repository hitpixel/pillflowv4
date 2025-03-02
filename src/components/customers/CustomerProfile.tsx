import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import WebsterPackCard from "../dashboard/WebsterPackCard";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Pill,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Printer,
  Edit,
} from "lucide-react";

interface CustomerProfileProps {
  customerId?: string;
  customerData?: {
    name: string;
    id: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    notes: string;
    allergies: string[];
  };
  medicationHistory?: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    active: boolean;
  }>;
  websterPacks?: Array<{
    id: string;
    patientName: string;
    patientId: string;
    medications: string[];
    status: "completed" | "pending";
    timestamp: string;
  }>;
  onBack?: () => void;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({
  customerId = "WP12345",
  customerData = {
    name: "John Smith",
    id: "WP12345",
    email: "john.smith@example.com",
    phone: "(02) 9876 5432",
    address: "123 Main Street, Sydney NSW 2000",
    dateOfBirth: "15/05/1965",
    notes: "Patient prefers Webster packs to be delivered on Monday mornings.",
    allergies: ["Penicillin", "Sulfa drugs"],
  },
  medicationHistory = [
    {
      id: "med1",
      name: "Aspirin",
      dosage: "100mg",
      frequency: "Once daily",
      startDate: "01/01/2023",
      active: true,
    },
    {
      id: "med2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "15/02/2023",
      active: true,
    },
    {
      id: "med3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at night",
      startDate: "10/03/2023",
      active: true,
    },
    {
      id: "med4",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "05/01/2022",
      endDate: "15/12/2022",
      active: false,
    },
  ],
  websterPacks = [
    {
      id: "wp1",
      patientName: "John Smith",
      patientId: "WP12345",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
      status: "completed" as const,
      timestamp: "15/06/2023 09:30 AM",
    },
    {
      id: "wp2",
      patientName: "John Smith",
      patientId: "WP12345",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
      status: "pending" as const,
      timestamp: "22/06/2023 09:30 AM",
    },
    {
      id: "wp3",
      patientName: "John Smith",
      patientId: "WP12345",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
      status: "completed" as const,
      timestamp: "08/06/2023 09:30 AM",
    },
  ],
  onBack = () => console.log("Back button clicked"),
}) => {
  const [activeTab, setActiveTab] = useState("profile");

  const activeMedications = medicationHistory.filter((med) => med.active);
  const inactiveMedications = medicationHistory.filter((med) => !med.active);

  const completedPacks = websterPacks.filter(
    (pack) => pack.status === "completed",
  );
  const pendingPacks = websterPacks.filter((pack) => pack.status === "pending");

  return (
    <div className="w-full h-full bg-[#0a0e17] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" onClick={onBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">Customer Profile</h1>
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-[#1e2738] bg-[#0d121f] text-gray-300 hover:bg-[#1e2738] hover:text-white"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#1e2738] bg-[#0d121f] text-gray-300 hover:bg-[#1e2738] hover:text-white"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Information Card */}
          <Card className="bg-[#0d121f] text-white border-[#1e2738] col-span-1">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Customer Information</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-blue-500/20 text-blue-400 border-blue-500/30"
                >
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <div className="bg-blue-500/20 h-full w-full flex items-center justify-center text-blue-400 text-2xl font-semibold">
                    {customerData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </Avatar>
                <h2 className="text-xl font-semibold text-white">
                  {customerData.name}
                </h2>
                <p className="text-sm text-gray-400">ID: {customerData.id}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-300">
                    {customerData.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-300">
                    {customerData.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-300">
                    {customerData.address}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-300">
                    DOB: {customerData.dateOfBirth}
                  </span>
                </div>
              </div>

              <Separator className="my-4 bg-[#1e2738]" />

              <div>
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
                  <h3 className="text-sm font-medium text-white">Allergies</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {customerData.allergies.length > 0 ? (
                    customerData.allergies.map((allergy, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-red-500/20 text-red-400 border-red-500/30"
                      >
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No known allergies</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <h3 className="text-sm font-medium text-white">Notes</h3>
                </div>
                <p className="text-sm text-gray-300">{customerData.notes}</p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Medications and Webster Packs */}
          <div className="col-span-1 md:col-span-2">
            <Tabs
              defaultValue="medications"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 bg-[#1a2133]">
                <TabsTrigger
                  value="medications"
                  className="data-[state=active]:bg-[#0d121f]"
                >
                  Medications
                </TabsTrigger>
                <TabsTrigger
                  value="websterPacks"
                  className="data-[state=active]:bg-[#0d121f]"
                >
                  Webster Packs
                </TabsTrigger>
              </TabsList>

              {/* Medications Tab */}
              <TabsContent value="medications" className="mt-4">
                <Card className="bg-[#0d121f] text-white border-[#1e2738]">
                  <CardHeader>
                    <CardTitle>Medication History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-md font-medium flex items-center mb-3 text-white">
                            <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                            Active Medications ({activeMedications.length})
                          </h3>
                          <div className="space-y-3">
                            {activeMedications.map((med) => (
                              <Card
                                key={med.id}
                                className="bg-[#1a2133] border-[#1e2738]"
                              >
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="flex items-center">
                                        <Pill className="h-4 w-4 text-blue-400 mr-2" />
                                        <h4 className="font-medium text-white">
                                          {med.name} ({med.dosage})
                                        </h4>
                                      </div>
                                      <p className="text-sm text-gray-400 mt-1">
                                        {med.frequency}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <Badge
                                        variant="outline"
                                        className="bg-green-500/20 text-green-400 border-green-500/30"
                                      >
                                        Active
                                      </Badge>
                                      <p className="text-xs text-gray-400 mt-1">
                                        Since: {med.startDate}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {inactiveMedications.length > 0 && (
                          <div>
                            <h3 className="text-md font-medium flex items-center mb-3 text-white">
                              <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                              Discontinued Medications (
                              {inactiveMedications.length})
                            </h3>
                            <div className="space-y-3">
                              {inactiveMedications.map((med) => (
                                <Card
                                  key={med.id}
                                  className="bg-[#1a2133] border-[#1e2738] opacity-70"
                                >
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <div className="flex items-center">
                                          <Pill className="h-4 w-4 text-gray-400 mr-2" />
                                          <h4 className="font-medium text-gray-300">
                                            {med.name} ({med.dosage})
                                          </h4>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-1">
                                          {med.frequency}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <Badge
                                          variant="outline"
                                          className="bg-gray-500/20 text-gray-400 border-gray-500/30"
                                        >
                                          Discontinued
                                        </Badge>
                                        <p className="text-xs text-gray-400 mt-1">
                                          {med.startDate} - {med.endDate}
                                        </p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Webster Packs Tab */}
              <TabsContent value="websterPacks" className="mt-4">
                <Card className="bg-[#0d121f] text-white border-[#1e2738]">
                  <CardHeader>
                    <CardTitle>Webster Pack History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="pending" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#1a2133]">
                        <TabsTrigger
                          value="pending"
                          className="data-[state=active]:bg-[#0d121f]"
                        >
                          Pending ({pendingPacks.length})
                        </TabsTrigger>
                        <TabsTrigger
                          value="completed"
                          className="data-[state=active]:bg-[#0d121f]"
                        >
                          Completed ({completedPacks.length})
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="pending">
                        <ScrollArea className="h-[500px] pr-4">
                          <div className="space-y-4">
                            {pendingPacks.map((pack) => (
                              <WebsterPackCard
                                key={pack.id}
                                patientName={pack.patientName}
                                patientId={pack.patientId}
                                medications={pack.medications}
                                status={pack.status}
                                timestamp={pack.timestamp}
                                onClick={() =>
                                  console.log(`Clicked on pack ${pack.id}`)
                                }
                              />
                            ))}
                            {pendingPacks.length === 0 && (
                              <div className="text-center py-8 text-gray-400 bg-[#1a2133] rounded-md">
                                No pending Webster packs
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </TabsContent>

                      <TabsContent value="completed">
                        <ScrollArea className="h-[500px] pr-4">
                          <div className="space-y-4">
                            {completedPacks.map((pack) => (
                              <WebsterPackCard
                                key={pack.id}
                                patientName={pack.patientName}
                                patientId={pack.patientId}
                                medications={pack.medications}
                                status={pack.status}
                                timestamp={pack.timestamp}
                                onClick={() =>
                                  console.log(`Clicked on pack ${pack.id}`)
                                }
                              />
                            ))}
                            {completedPacks.length === 0 && (
                              <div className="text-center py-8 text-gray-400 bg-[#1a2133] rounded-md">
                                No completed Webster packs
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
