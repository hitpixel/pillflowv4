import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import {
  Camera,
  Barcode,
  CheckCircle,
  XCircle,
  RefreshCw,
  List,
  Clock,
} from "lucide-react";

interface WebsterPackDetails {
  id: string;
  patientName: string;
  patientId: string;
  medications: string[];
  status: "completed" | "pending";
  timestamp: string;
}

interface BarcodeScannerProps {
  onScan?: (barcode: string) => void;
  recentScans?: WebsterPackDetails[];
  isScanning?: boolean;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan = (barcode) => console.log(`Scanned barcode: ${barcode}`),
  recentScans = [
    {
      id: "WP12345",
      patientName: "John Smith",
      patientId: "PT001",
      medications: ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
      status: "completed",
      timestamp: "2023-06-15 09:30 AM",
    },
    {
      id: "WP12346",
      patientName: "Sarah Johnson",
      patientId: "PT002",
      medications: ["Lisinopril 10mg", "Simvastatin 40mg"],
      status: "pending",
      timestamp: "2023-06-15 10:15 AM",
    },
  ],
  isScanning = false,
}) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [manualBarcode, setManualBarcode] = useState("");
  const [scanResult, setScanResult] = useState<WebsterPackDetails | null>(null);
  const [scanStatus, setScanStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [checklist, setChecklist] = useState<
    { id: number; task: string; completed: boolean }[]
  >([
    { id: 1, task: "Verify patient name and ID", completed: false },
    {
      id: 2,
      task: "Check medication list against prescription",
      completed: false,
    },
    { id: 3, task: "Verify medication count and dosage", completed: false },
    { id: 4, task: "Confirm packaging integrity", completed: false },
    { id: 5, task: "Update patient record", completed: false },
  ]);

  const handleManualScan = () => {
    if (!manualBarcode.trim()) return;

    // Simulate scanning process
    setScanStatus("idle");
    setTimeout(() => {
      // For demo purposes, we'll pretend WP12345 is a valid barcode
      if (manualBarcode === "WP12345") {
        setScanStatus("success");
        setScanResult(recentScans[0]);
        onScan(manualBarcode);
      } else {
        setScanStatus("error");
        setScanResult(null);
      }
    }, 1000);
  };

  const resetScan = () => {
    setScanStatus("idle");
    setScanResult(null);
    setManualBarcode("");
    setChecklist(checklist.map((item) => ({ ...item, completed: false })));
  };

  const toggleChecklistItem = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const allTasksCompleted = checklist.every((item) => item.completed);

  return (
    <div className="w-full h-full bg-[#0a0e17] p-6">
      <Card className="w-full max-w-5xl mx-auto bg-[#0d121f] text-white border-[#1e2738]">
        <CardHeader>
          <CardTitle className="text-2xl">Webster Pack Scanner</CardTitle>
          <CardDescription>
            Scan Webster Pack barcodes or enter the barcode manually to track
            and update status
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#1a2133]">
              <TabsTrigger
                value="manual"
                className="flex items-center gap-2 data-[state=active]:bg-[#0d121f]"
              >
                <Barcode className="h-4 w-4" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger
                value="camera"
                className="flex items-center gap-2 data-[state=active]:bg-[#0d121f]"
              >
                <Camera className="h-4 w-4" />
                Camera Scanner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                {isScanning ? (
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                ) : (
                  <div className="text-white text-center p-4">
                    <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Camera preview unavailable in demo mode</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Position the Webster Pack barcode within the frame
                    </p>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-1/4 border-t-2 border-l-2 border-r-2 border-blue-500 border-opacity-50 rounded-t-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 border-b-2 border-l-2 border-r-2 border-blue-500 border-opacity-50 rounded-b-lg"></div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="gap-2"
                  onClick={() => {
                    // Simulate a successful scan for demo purposes
                    setScanStatus("success");
                    setScanResult(recentScans[0]);
                    onScan("WP12345");
                  }}
                >
                  <Camera className="h-4 w-4" />
                  Start Scanning
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Search Patient
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Search by patient name or ID"
                      className="flex-1"
                    />
                    <Button>Search</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Pharmacist Initials
                  </label>
                  <Input type="text" placeholder="Enter your initials" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Number of Weeks Supplied
                  </label>
                  <select className="w-full h-10 rounded-md border border-[#1e2738] bg-[#0d121f] px-3 py-2 text-sm text-white">
                    <option value="1">1 Week</option>
                    <option value="2">2 Weeks</option>
                    <option value="3">3 Weeks</option>
                    <option value="4">4 Weeks</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Webster Pack Barcode
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter Webster Pack barcode"
                      value={manualBarcode}
                      onChange={(e) => setManualBarcode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleManualScan}>
                      <Barcode className="h-4 w-4 mr-2" />
                      Scan
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Enter the barcode printed on the Webster Pack
                  </p>
                </div>

                <Button className="w-full mt-4">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Webster Pack
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {scanStatus === "error" && (
            <Alert variant="destructive" className="mt-6">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Scan Error</AlertTitle>
              <AlertDescription>
                The barcode could not be recognized. Please try again or enter
                the barcode manually.
              </AlertDescription>
            </Alert>
          )}

          {scanStatus === "success" && scanResult && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-medium">Webster Pack Found</h3>
              </div>

              <Card className="bg-[#1a2133] border-[#1e2738]">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">
                        Pack ID
                      </h4>
                      <p className="font-medium text-white">{scanResult.id}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">
                        Patient
                      </h4>
                      <p className="font-medium text-white">
                        {scanResult.patientName}
                      </p>
                      <p className="text-sm text-gray-400">
                        ID: {scanResult.patientId}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">
                        Medications
                      </h4>
                      <ul className="text-sm text-white">
                        {scanResult.medications.map((med, index) => (
                          <li key={index}>{med}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">
                        Status
                      </h4>
                      <Badge
                        variant={
                          scanResult.status === "completed"
                            ? "secondary"
                            : "outline"
                        }
                        className={`mt-1 ${scanResult.status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                      >
                        <div className="flex items-center gap-1">
                          {scanResult.status === "completed" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                          <span className="capitalize">
                            {scanResult.status}
                          </span>
                        </div>
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">
                  Verification Checklist
                </h3>
                <Card className="bg-[#1a2133] border-[#1e2738]">
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {checklist.map((item) => (
                        <li key={item.id} className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className={`rounded-full p-1 h-6 w-6 ${item.completed ? "bg-green-500/20 text-green-400 border-green-500/30" : "border-[#1e2738] bg-[#0d121f]"}`}
                            onClick={() => toggleChecklistItem(item.id)}
                          >
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-500"></div>
                            )}
                          </Button>
                          <span
                            className={
                              item.completed
                                ? "line-through text-gray-400"
                                : "text-white"
                            }
                          >
                            {item.task}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={resetScan}
                  className="border-[#1e2738] bg-[#0d121f] text-gray-300 hover:bg-[#1e2738] hover:text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  disabled={!allTasksCompleted}
                  className={
                    !allTasksCompleted ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Verification
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex-col items-start border-t p-6">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <List className="h-5 w-5" />
            Recently Scanned
          </h3>
          <div className="w-full space-y-3">
            {recentScans.map((scan) => (
              <Card
                key={scan.id}
                className="w-full bg-[#1a2133] hover:bg-[#1e2738] transition-colors cursor-pointer border-[#1e2738]"
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-white">
                        {scan.patientName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>ID: {scan.id}</span>
                        <span>•</span>
                        <span>{scan.timestamp}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        scan.status === "completed" ? "secondary" : "outline"
                      }
                      className={`${scan.status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                    >
                      <div className="flex items-center gap-1">
                        {scan.status === "completed" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span className="capitalize">{scan.status}</span>
                      </div>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BarcodeScanner;
