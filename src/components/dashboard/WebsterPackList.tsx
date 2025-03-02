import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Search, Filter, RefreshCw } from "lucide-react";
import WebsterPackCard from "./WebsterPackCard";

interface WebsterPack {
  id: string;
  patientName: string;
  patientId: string;
  medications: string[];
  status: "completed" | "pending";
  timestamp: string;
}

interface WebsterPackListProps {
  packs?: WebsterPack[];
  onPackClick?: (packId: string) => void;
  onRefresh?: () => void;
}

const WebsterPackList: React.FC<WebsterPackListProps> = ({
  packs = [
    {
      id: "wp1",
      patientName: "John Smith",
      patientId: "WP12345",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
      status: "completed",
      timestamp: "2023-06-15 09:30 AM",
    },
    {
      id: "wp2",
      patientName: "Sarah Johnson",
      patientId: "WP12346",
      medications: ["Lisinopril 10mg", "Simvastatin 40mg"],
      status: "pending",
      timestamp: "2023-06-15 02:00 PM",
    },
    {
      id: "wp3",
      patientName: "Michael Brown",
      patientId: "WP12347",
      medications: ["Amlodipine 5mg", "Metoprolol 50mg", "Furosemide 20mg"],
      status: "pending",
      timestamp: "2023-06-16 10:15 AM",
    },
    {
      id: "wp4",
      patientName: "Emily Davis",
      patientId: "WP12348",
      medications: ["Levothyroxine 75mcg", "Omeprazole 20mg"],
      status: "completed",
      timestamp: "2023-06-14 11:45 AM",
    },
    {
      id: "wp5",
      patientName: "Robert Wilson",
      patientId: "WP12349",
      medications: [
        "Gabapentin 300mg",
        "Sertraline 50mg",
        "Hydrochlorothiazide 25mg",
      ],
      status: "pending",
      timestamp: "2023-06-16 03:30 PM",
    },
  ],
  onPackClick = (packId: string) => console.log(`Pack ${packId} clicked`),
  onRefresh = () => console.log("Refreshing pack list"),
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter packs based on active tab and search query
  const filteredPacks = packs.filter((pack) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "completed" && pack.status === "completed") ||
      (activeTab === "pending" && pack.status === "pending");

    const matchesSearch =
      searchQuery === "" ||
      pack.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.patientId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Count packs by status
  const completedCount = packs.filter(
    (pack) => pack.status === "completed",
  ).length;
  const pendingCount = packs.filter((pack) => pack.status === "pending").length;

  return (
    <Card className="w-full bg-[#0d121f] text-white border-[#1e2738]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-white">
              Webster Packs
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage and track medication packs
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="border-[#1e2738] bg-[#0d121f] text-gray-300 hover:bg-[#1e2738] hover:text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by patient name or ID"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-[#1e2738] bg-[#0d121f] text-gray-300 hover:bg-[#1e2738] hover:text-white"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6 bg-[#1a2133]">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-[#0d121f]"
            >
              All ({packs.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#0d121f]"
            >
              Completed ({completedCount})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-[#0d121f]"
            >
              Pending ({pendingCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredPacks.length > 0 ? (
              filteredPacks.map((pack) => (
                <WebsterPackCard
                  key={pack.id}
                  patientName={pack.patientName}
                  patientId={pack.patientId}
                  medications={pack.medications}
                  status={pack.status}
                  timestamp={pack.timestamp}
                  onClick={() => onPackClick(pack.id)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 bg-[#1a2133] rounded-md">
                <p>No Webster packs found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filteredPacks.length > 0 ? (
              filteredPacks.map((pack) => (
                <WebsterPackCard
                  key={pack.id}
                  patientName={pack.patientName}
                  patientId={pack.patientId}
                  medications={pack.medications}
                  status={pack.status}
                  timestamp={pack.timestamp}
                  onClick={() => onPackClick(pack.id)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 bg-[#1a2133] rounded-md">
                <p>No completed Webster packs found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filteredPacks.length > 0 ? (
              filteredPacks.map((pack) => (
                <WebsterPackCard
                  key={pack.id}
                  patientName={pack.patientName}
                  patientId={pack.patientId}
                  medications={pack.medications}
                  status={pack.status}
                  timestamp={pack.timestamp}
                  onClick={() => onPackClick(pack.id)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 bg-[#1a2133] rounded-md">
                <p>No pending Webster packs found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WebsterPackList;
