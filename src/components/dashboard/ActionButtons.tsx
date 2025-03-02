import React from "react";
import { Button } from "../ui/button";
import { Scan, Search, History, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  to: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  to,
  onClick = () => {},
}) => {
  return (
    <Link to={to} className="block w-full">
      <Button
        variant="outline"
        className="w-full h-full p-6 flex flex-col items-center justify-center gap-3 bg-[#0d121f] hover:bg-[#1e2738] border-[#1e2738] text-white transition-all"
        onClick={onClick}
      >
        <div className="rounded-full bg-blue-500/20 p-3">{icon}</div>
        <div className="text-center">
          <h3 className="font-semibold text-lg text-white">{label}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </Button>
    </Link>
  );
};

interface ActionButtonsProps {
  buttons?: Array<{
    icon: React.ReactNode;
    label: string;
    description: string;
    to: string;
    onClick?: () => void;
  }>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  buttons = [
    {
      icon: <Scan className="h-6 w-6 text-blue-600" />,
      label: "Scan Webster Pack",
      description: "Scan and process medication packs",
      to: "/scan",
    },
    {
      icon: <Search className="h-6 w-6 text-blue-600" />,
      label: "Search Customer",
      description: "Find customer profiles and medications",
      to: "/customers",
    },
    {
      icon: <History className="h-6 w-6 text-blue-600" />,
      label: "View History",
      description: "Access historical pack records",
      to: "/history",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      label: "Manage Patients",
      description: "Add and edit patient information",
      to: "/patients",
    },
  ],
}) => {
  return (
    <div className="w-full bg-[#0a0e17] p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {buttons.map((button, index) => (
          <ActionButton
            key={index}
            icon={button.icon}
            label={button.label}
            description={button.description}
            to={button.to}
            onClick={button.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
