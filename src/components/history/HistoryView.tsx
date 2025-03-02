import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Download,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import WebsterPackCard from "../dashboard/WebsterPackCard";

interface HistoryViewProps {
  initialDateRange?: { from: Date; to: Date };
  initialCustomer?: string;
  initialStatus?: "all" | "completed" | "pending";
}

const HistoryView: React.FC<HistoryViewProps> = ({
  initialDateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  },
  initialCustomer = "",
  initialStatus = "all",
}) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(
    initialDateRange,
  );
  const [customer, setCustomer] = useState<string>(initialCustomer);
  const [status, setStatus] = useState<"all" | "completed" | "pending">(
    initialStatus,
  );
  const [view, setView] = useState<"table" | "cards">("table");

  // Mock data for the history view
  const mockHistoryData = [
    {
      id: "WP001",
      patientName: "Alice Johnson",
      patientId: "P12345",
      medications: ["Lisinopril 10mg", "Metformin 500mg", "Atorvastatin 20mg"],
      status: "completed",
      timestamp: "2023-06-10 08:45 AM",
    },
    {
      id: "WP002",
      patientName: "Bob Williams",
      patientId: "P23456",
      medications: ["Aspirin 100mg", "Simvastatin 40mg"],
      status: "completed",
      timestamp: "2023-06-12 10:30 AM",
    },
    {
      id: "WP003",
      patientName: "Carol Davis",
      patientId: "P34567",
      medications: ["Metoprolol 50mg", "Furosemide 20mg", "Potassium Cl 10mEq"],
      status: "pending",
      timestamp: "2023-06-15 02:15 PM",
    },
    {
      id: "WP004",
      patientName: "David Miller",
      patientId: "P45678",
      medications: ["Levothyroxine 75mcg", "Amlodipine 5mg"],
      status: "completed",
      timestamp: "2023-06-18 09:20 AM",
    },
    {
      id: "WP005",
      patientName: "Emma Wilson",
      patientId: "P56789",
      medications: ["Gabapentin 300mg", "Sertraline 50mg", "Trazodone 100mg"],
      status: "pending",
      timestamp: "2023-06-20 11:45 AM",
    },
  ];

  // Filter the data based on the selected filters
  const filteredData = mockHistoryData.filter((item) => {
    const itemDate = new Date(item.timestamp);
    const dateInRange = itemDate >= dateRange.from && itemDate <= dateRange.to;
    const customerMatch = customer
      ? item.patientName.toLowerCase().includes(customer.toLowerCase())
      : true;
    const statusMatch = status === "all" ? true : item.status === status;

    return dateInRange && customerMatch && statusMatch;
  });

  return (
    <div className="w-full h-full bg-[#0a0e17] p-6">
      <Card className="w-full bg-[#0d121f] text-white border-[#1e2738]">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">
            Webster Pack History
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Filters Section */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Date Range Picker */}
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  Date Range
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "PPP")} -{" "}
                            {format(dateRange.to, "PPP")}
                          </>
                        ) : (
                          format(dateRange.from, "PPP")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{
                        from: dateRange.from,
                        to: dateRange.to,
                      }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Customer Search */}
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  Customer
                </label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by customer name"
                    className="pl-8"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="w-full md:w-1/4">
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as "all" | "completed" | "pending")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setDateRange({
                      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                      to: new Date(),
                    });
                    setCustomer("");
                    setStatus("all");
                  }}
                >
                  Reset Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <div className="border rounded-md flex">
                  <Button
                    variant={view === "table" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setView("table")}
                  >
                    Table
                  </Button>
                  <Button
                    variant={view === "cards" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setView("cards")}
                  >
                    Cards
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Showing {filteredData.length} results
            </p>
          </div>

          {/* Table View */}
          {view === "table" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pack ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Medications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {item.patientName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.patientId}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {item.medications.slice(0, 2).join(", ")}
                            {item.medications.length > 2 && (
                              <span className="text-gray-500">
                                {" "}
                                +{item.medications.length - 2} more
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "completed"
                                ? "secondary"
                                : "outline"
                            }
                            className={`${item.status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                          >
                            <div className="flex items-center gap-1">
                              {item.status === "completed" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <AlertCircle className="h-3 w-3" />
                              )}
                              <span className="capitalize">{item.status}</span>
                            </div>
                          </Badge>
                        </TableCell>
                        <TableCell>{item.timestamp}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No results found. Try adjusting your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Cards View */}
          {view === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <WebsterPackCard
                    key={item.id}
                    patientName={item.patientName}
                    patientId={item.patientId}
                    medications={item.medications}
                    status={item.status as "completed" | "pending"}
                    timestamp={item.timestamp}
                    onClick={() =>
                      console.log(`Viewing details for ${item.id}`)
                    }
                  />
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-gray-500 border rounded-md">
                  No results found. Try adjusting your filters.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryView;
