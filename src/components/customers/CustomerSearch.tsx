import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Search,
  Filter,
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  X,
  Edit,
  Pill,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerSearchProps {
  onSelectCustomer?: (customerId: string) => void;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  lastVisit: string;
  activePacks: number;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  onSelectCustomer = (id) => console.log(`Selected customer: ${id}`),
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<string>("details");
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockCustomers: Customer[] = [
    {
      id: "C001",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(02) 9876 5432",
      address: "123 Main St, Sydney NSW 2000",
      dateOfBirth: "1975-05-15",
      lastVisit: "2023-06-10",
      activePacks: 2,
    },
    {
      id: "C002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(02) 8765 4321",
      address: "45 Park Ave, Melbourne VIC 3000",
      dateOfBirth: "1982-11-23",
      lastVisit: "2023-06-15",
      activePacks: 1,
    },
    {
      id: "C003",
      name: "Robert Williams",
      email: "rob.williams@example.com",
      phone: "(02) 7654 3210",
      address: "78 Beach Rd, Brisbane QLD 4000",
      dateOfBirth: "1968-03-30",
      lastVisit: "2023-06-05",
      activePacks: 3,
    },
    {
      id: "C004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(02) 6543 2109",
      address: "92 Hill St, Perth WA 6000",
      dateOfBirth: "1990-08-12",
      lastVisit: "2023-06-12",
      activePacks: 0,
    },
    {
      id: "C005",
      name: "Michael Brown",
      email: "michael.b@example.com",
      phone: "(02) 5432 1098",
      address: "15 River Rd, Adelaide SA 5000",
      dateOfBirth: "1955-12-05",
      lastVisit: "2023-06-08",
      activePacks: 2,
    },
  ];

  // Filter customers based on search query and active filter
  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    if (activeFilter === "all") return matchesSearch;
    if (activeFilter === "active")
      return matchesSearch && customer.activePacks > 0;
    if (activeFilter === "inactive")
      return matchesSearch && customer.activePacks === 0;

    return matchesSearch;
  });

  const handleCustomerSelect = (customer: Customer) => {
    console.log("Customer selected:", customer);
    setSelectedCustomer(customer);
    // If using the prop callback as well
    onSelectCustomer(customer.id);
  };

  const handleBackToSearch = () => {
    setSelectedCustomer(null);
  };

  // Mock data for medications
  const mockMedications = [
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
  ];

  // Mock data for webster packs
  const mockWebsterPacks = [
    {
      id: "wp1",
      status: "completed" as const,
      timestamp: "15/06/2023 09:30 AM",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
    },
    {
      id: "wp2",
      status: "pending" as const,
      timestamp: "22/06/2023 09:30 AM",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
    },
  ];

  // If a customer is selected, show their profile
  if (selectedCustomer) {
    return (
      <div className="w-full h-full bg-[#0a0e17] p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2"
              onClick={handleBackToSearch}
            >
              ← Back to Search
            </Button>
            <h1 className="text-2xl font-bold text-white">
              {selectedCustomer.name}'s Profile
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Customer Information Card */}
            <div className="md:col-span-1">
              <Card className="bg-[#0d121f] text-white border-[#1e2738]">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Customer Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#1e2738] bg-[#0d121f] text-gray-300 hover:bg-[#1e2738] hover:text-white"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl font-semibold mb-4">
                      {selectedCustomer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      {selectedCustomer.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      ID: {selectedCustomer.id}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {selectedCustomer.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {selectedCustomer.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {selectedCustomer.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        DOB: {selectedCustomer.dateOfBirth}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        Last Visit: {selectedCustomer.lastVisit}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for Details, Medications and Webster Packs */}
            <div className="md:col-span-2">
              <Card className="bg-[#0d121f] text-white border-[#1e2738]">
                <CardHeader className="pb-2">
                  <Tabs
                    defaultValue="details"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3 bg-[#1a2133]">
                      <TabsTrigger
                        value="details"
                        className="data-[state=active]:bg-[#0d121f]"
                      >
                        Details
                      </TabsTrigger>
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

                    <TabsContent value="details" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-md font-medium mb-2">Notes</h3>
                          <div className="bg-[#1a2133] border border-[#1e2738] rounded-md p-4">
                            <p className="text-sm text-gray-300">
                              Patient prefers Webster packs to be delivered on
                              Monday mornings. Has difficulty with child-proof
                              caps.
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-md font-medium mb-2">
                            Allergies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded-full text-xs">
                              Penicillin
                            </span>
                            <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1 rounded-full text-xs">
                              Sulfa drugs
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs"
                            >
                              + Add
                            </Button>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-md font-medium mb-2">
                            Emergency Contact
                          </h3>
                          <div className="bg-[#1a2133] border border-[#1e2738] rounded-md p-4">
                            <p className="text-sm font-medium">
                              Mary Smith (Daughter)
                            </p>
                            <p className="text-sm text-gray-300 mt-1">
                              (02) 1234 5678
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="medications" className="mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-medium">
                          Current Medications
                        </h3>
                        <Button size="sm">+ Add Medication</Button>
                      </div>

                      <div className="space-y-3">
                        {mockMedications.map((med) => (
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
                                  <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full text-xs">
                                    Active
                                  </span>
                                  <p className="text-xs text-gray-400 mt-1">
                                    Since: {med.startDate}
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                >
                                  Edit
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="websterPacks" className="mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-medium">
                          Webster Pack History
                        </h3>
                        <Button size="sm">+ Create New Pack</Button>
                      </div>

                      <div className="space-y-3">
                        {mockWebsterPacks.map((pack) => (
                          <Card
                            key={pack.id}
                            className="bg-[#1a2133] border-[#1e2738]"
                          >
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-white">
                                    Webster Pack #{pack.id}
                                  </h4>
                                  <p className="text-sm text-gray-400 mt-1">
                                    {pack.timestamp}
                                  </p>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-300">
                                      <FileText className="h-4 w-4 inline mr-1" />
                                      {pack.medications.join(", ")}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${pack.status === "completed" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"}`}
                                  >
                                    {pack.status === "completed"
                                      ? "Completed"
                                      : "Pending"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs"
                                >
                                  View Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0e17] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Customer Search</h1>

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-2.5"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
          </div>

          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveFilter}
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="active">With Active Packs</TabsTrigger>
              <TabsTrigger value="inactive">No Active Packs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            {filteredCustomers.length} customers found
          </p>

          {filteredCustomers.length === 0 ? (
            <Card className="bg-[#0d121f] text-white border-[#1e2738]">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <User className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-300">
                  No customers found
                </p>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCustomers.map((customer) => (
              <Card
                key={customer.id}
                className="bg-[#0d121f] hover:bg-[#1e2738] transition-colors cursor-pointer border-[#1e2738]"
                onClick={() => {
                  console.log("Card clicked for customer:", customer);
                  handleCustomerSelect(customer);
                }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-white">
                          {customer.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          ({customer.id})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {customer.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {customer.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {customer.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            DOB: {customer.dateOfBirth}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          Last visit: {customer.lastVisit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${customer.activePacks > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {customer.activePacks} Active Webster{" "}
                          {customer.activePacks === 1 ? "Pack" : "Packs"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-[#0a0e17] border-t border-[#1e2738] px-6 py-3 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        "View Profile button clicked for customer:",
                        customer,
                      );
                      handleCustomerSelect(customer);
                    }}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSearch;
