import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  count,
  icon,
  color,
  bgColor,
}) => {
  return (
    <Card className={`${bgColor} border-none shadow-md`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold">{count}</span>
          <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface StatusSummaryProps {
  totalPacks?: number;
  completedPacks?: number;
  pendingPacks?: number;
}

const StatusSummary: React.FC<StatusSummaryProps> = ({
  totalPacks = 24,
  completedPacks = 16,
  pendingPacks = 8,
}) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Webster Pack Status
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard
          title="Total Webster Packs"
          count={totalPacks}
          icon={<Clock className="h-6 w-6 text-blue-600" />}
          color="bg-blue-100"
          bgColor="bg-white"
        />
        <StatusCard
          title="Completed Packs"
          count={completedPacks}
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          color="bg-green-100"
          bgColor="bg-white"
        />
        <StatusCard
          title="Pending Packs"
          count={pendingPacks}
          icon={<AlertCircle className="h-6 w-6 text-amber-600" />}
          color="bg-amber-100"
          bgColor="bg-white"
        />
      </div>
      <div className="mt-4 w-full bg-gray-100 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${(completedPacks / totalPacks) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>{Math.round((completedPacks / totalPacks) * 100)}% Complete</span>
        <span>{pendingPacks} Remaining</span>
      </div>
    </div>
  );
};

export default StatusSummary;
