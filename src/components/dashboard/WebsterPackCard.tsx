import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Clock, User, Pill, CheckCircle, AlertCircle } from "lucide-react";

interface WebsterPackCardProps {
  patientName?: string;
  patientId?: string;
  medications?: string[];
  status?: "completed" | "pending";
  timestamp?: string;
  onClick?: () => void;
}

const WebsterPackCard: React.FC<WebsterPackCardProps> = ({
  patientName = "John Smith",
  patientId = "WP12345",
  medications = ["Aspirin 100mg", "Metformin 500mg", "Atorvastatin 20mg"],
  status = "pending",
  timestamp = "2023-06-15 09:30 AM",
  onClick = () => console.log("Webster pack card clicked"),
}) => {
  return (
    <Card
      className="w-full bg-[#0d121f] hover:bg-[#1e2738] cursor-pointer transition-colors border-[#1e2738] text-white"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-gray-400" />
              <h3 className="font-medium text-lg text-white">{patientName}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-2">ID: {patientId}</p>

            <div className="flex items-center gap-2 mb-2">
              <Pill className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-300">
                {medications.length > 0
                  ? medications.slice(0, 2).join(", ") +
                    (medications.length > 2
                      ? ` +${medications.length - 2} more`
                      : "")
                  : "No medications"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <p className="text-sm text-gray-300">{timestamp}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <Badge
              variant={status === "completed" ? "secondary" : "outline"}
              className={`${status === "completed" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}`}
            >
              <div className="flex items-center gap-1">
                {status === "completed" ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                <span className="capitalize">{status}</span>
              </div>
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 border-t border-[#1e2738] flex justify-between bg-[#0a0e17]">
        <p className="text-xs text-gray-400">
          {status === "completed" ? "Completed on" : "Due by"}: {timestamp}
        </p>
        <p className="text-xs text-blue-400 hover:underline">View details</p>
      </CardFooter>
    </Card>
  );
};

export default WebsterPackCard;
