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
} from "lucide-react";

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

  return (
    <div className="w-full h-full bg-[#0a0e17] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Customer Search</h1>

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
                <p className="text-lg font-medium text-gray-700">
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
                onClick={() => onSelectCustomer(customer.id)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium">{customer.name}</h3>
                        <span className="text-sm text-gray-500">
                          ({customer.id})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            DOB: {customer.dateOfBirth}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
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
