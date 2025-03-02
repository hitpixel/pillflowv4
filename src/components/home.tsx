import React from "react";
import {
  ArrowUp,
  Calendar,
  ChevronDown,
  Clock,
  Home as HomeIcon,
  LineChart,
  Package,
  Pill,
  Settings,
  Users,
  ScanLine,
  Search,
  History,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./layout/Navbar";
import ActionButtons from "./dashboard/ActionButtons";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      <Navbar />
      <main className="flex-1 pt-6 pb-10 px-4">
        <div className="bg-[#0d121f] text-white border-[#1e2738] p-6 rounded-lg mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, Jane Doe</h1>
          <p className="text-gray-400">
            It's{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - Have a great day!
          </p>
        </div>
        <div className="space-y-6 mb-8">
          <ActionButtons
            buttons={[
              {
                icon: <ScanLine className="h-6 w-6 text-blue-400" />,
                label: "Scan Webster Pack",
                description: "Scan and process medication packs",
                to: "/scan",
                onClick: () => {},
              },
              {
                icon: <Search className="h-6 w-6 text-blue-400" />,
                label: "Search Customer",
                description: "Find customer profiles and medications",
                to: "/patients",
                onClick: () => {},
              },
              {
                icon: <History className="h-6 w-6 text-blue-400" />,
                label: "View History",
                description: "Access historical pack records",
                to: "/history",
                onClick: () => {},
              },
              {
                icon: <Users className="h-6 w-6 text-blue-400" />,
                label: "Manage Patients",
                description: "Add and edit patient information",
                to: "/patients",
                onClick: () => {},
              },
            ]}
          />
        </div>

        {/* Dashboard content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Collections
              </CardTitle>
              <Package className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                12% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Active Customers
              </CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                <span className="text-gray-400">No change from last month</span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Due This Week
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-xs text-gray-400 flex items-center mt-1">
                <span className="text-gray-400">
                  All collections up to date
                </span>
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Collection Rate
              </CardTitle>
              <LineChart className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">100%</div>
              <p className="text-xs text-green-400 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader>
              <CardTitle>Collections Over Time</CardTitle>
              <CardDescription className="text-gray-400">
                Last 6 months of collection data
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <CollectionsChart />
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader>
              <CardTitle>Customer Collection Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Recent collection activity by customer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        JD
                      </div>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-xs text-gray-400">
                          Last collection: 3 days ago
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                      Active
                    </Badge>
                  </div>
                  <Progress
                    value={75}
                    className="h-2 bg-[#1e2738]"
                    indicatorClassName="bg-blue-400"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>6 collections</span>
                    <span>8 total</span>
                  </div>
                </div>
                <Separator className="bg-[#1e2738]" />
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                        MS
                      </div>
                      <div>
                        <div className="font-medium">Mary Smith</div>
                        <div className="text-xs text-gray-400">
                          Last collection: 1 week ago
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                      Active
                    </Badge>
                  </div>
                  <Progress
                    value={25}
                    className="h-2 bg-[#1e2738]"
                    indicatorClassName="bg-purple-400"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>2 collections</span>
                    <span>8 total</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader>
              <CardTitle>Upcoming Collections</CardTitle>
              <CardDescription className="text-gray-400">
                Next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-[#1e2738] bg-[#0a0e17] p-4 text-center">
                <Calendar className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">
                  No upcoming collections this week
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader>
              <CardTitle>Medication Status</CardTitle>
              <CardDescription className="text-gray-400">
                Current inventory status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div>Blister Packs</div>
                    <div className="text-green-400">In Stock</div>
                  </div>
                  <Progress
                    value={80}
                    className="h-2 bg-[#1e2738]"
                    indicatorClassName="bg-green-500"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div>Sachets</div>
                    <div className="text-yellow-400">Low Stock</div>
                  </div>
                  <Progress
                    value={20}
                    className="h-2 bg-[#1e2738]"
                    indicatorClassName="bg-yellow-500"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <div>Webster Packs</div>
                    <div className="text-green-400">In Stock</div>
                  </div>
                  <Progress
                    value={65}
                    className="h-2 bg-[#1e2738]"
                    indicatorClassName="bg-green-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#0d121f] text-white border-[#1e2738]">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Latest system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-500/20 p-1">
                    <Package className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Collection completed
                    </p>
                    <p className="text-xs text-gray-400">
                      John Doe • 3 days ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-500/20 p-1">
                    <Package className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Collection completed
                    </p>
                    <p className="text-xs text-gray-400">
                      Mary Smith • 1 week ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-green-500/20 p-1">
                    <Users className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      New customer added
                    </p>
                    <p className="text-xs text-gray-400">
                      System • 2 weeks ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;

function CollectionsChart() {
  return (
    <div className="h-[240px] w-full">
      <svg viewBox="0 0 600 240" className="h-full w-full">
        {/* Grid lines */}
        <line
          x1="0"
          y1="240"
          x2="600"
          y2="240"
          stroke="#1e2738"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="200"
          x2="600"
          y2="200"
          stroke="#1e2738"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="160"
          x2="600"
          y2="160"
          stroke="#1e2738"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="120"
          x2="600"
          y2="120"
          stroke="#1e2738"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="80"
          x2="600"
          y2="80"
          stroke="#1e2738"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="40"
          x2="600"
          y2="40"
          stroke="#1e2738"
          strokeWidth="1"
        />
        <line x1="0" y1="0" x2="600" y2="0" stroke="#1e2738" strokeWidth="1" />

        {/* Month labels */}
        <text x="50" y="260" fill="#6b7280" fontSize="12" textAnchor="middle">
          Jan
        </text>
        <text x="150" y="260" fill="#6b7280" fontSize="12" textAnchor="middle">
          Feb
        </text>
        <text x="250" y="260" fill="#6b7280" fontSize="12" textAnchor="middle">
          Mar
        </text>
        <text x="350" y="260" fill="#6b7280" fontSize="12" textAnchor="middle">
          Apr
        </text>
        <text x="450" y="260" fill="#6b7280" fontSize="12" textAnchor="middle">
          May
        </text>
        <text x="550" y="260" fill="#6b7280" fontSize="12" textAnchor="middle">
          Jun
        </text>

        {/* Area chart */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d="M0,240 L0,180 C50,160 100,200 150,170 C200,140 250,120 300,140 C350,160 400,120 450,100 C500,80 550,100 600,80 L600,240 Z"
          fill="url(#gradient)"
        />

        {/* Line */}
        <path
          d="M0,180 C50,160 100,200 150,170 C200,140 250,120 300,140 C350,160 400,120 450,100 C500,80 550,100 600,80"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        <circle
          cx="0"
          cy="180"
          r="4"
          fill="#0d121f"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <circle
          cx="150"
          cy="170"
          r="4"
          fill="#0d121f"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <circle
          cx="300"
          cy="140"
          r="4"
          fill="#0d121f"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <circle
          cx="450"
          cy="100"
          r="4"
          fill="#0d121f"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <circle
          cx="600"
          cy="80"
          r="4"
          fill="#0d121f"
          stroke="#3b82f6"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
