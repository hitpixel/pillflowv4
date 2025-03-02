import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Package,
  History,
  Users,
  ScanLine,
  Home,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

interface NavbarProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  userName = "Jane Doe",
  userAvatar = "",
  notificationCount = 3,
  onLogout = () => console.log("Logout clicked"),
}) => {
  return (
    <nav className="w-64 bg-[#0d121f] border-r border-[#1e2738] text-white flex flex-col h-screen">
      <div className="flex h-16 items-center border-b border-[#1e2738] px-4">
        <Link to="/" className="flex items-center gap-2">
          <Package className="h-6 w-6 text-blue-400" />
          <span className="font-bold text-xl text-white">WebsterTrack</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-6 px-2">
        <div className="grid items-start gap-2 text-sm font-medium">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-left"
            asChild
          >
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-blue-400 hover:bg-[#1e2738] transition-all"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-left"
            asChild
          >
            <Link
              to="/scan"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-[#1e2738] hover:text-gray-100 transition-all"
            >
              <ScanLine className="h-4 w-4" />
              <span>Scan</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-left"
            asChild
          >
            <Link
              to="/history"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-[#1e2738] hover:text-gray-100 transition-all"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start text-left"
            asChild
          >
            <Link
              to="/patients"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-[#1e2738] hover:text-gray-100 transition-all"
            >
              <Users className="h-4 w-4" />
              <span>Patients</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-auto border-t border-[#1e2738] p-4">
        <div className="flex items-center gap-3 rounded-lg bg-[#1a2133] p-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-blue-500 text-white">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-xs text-gray-400">Pharmacist</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 text-gray-400"
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#1a2133] border-[#1e2738] text-white"
            >
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1e2738]" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-[#232d42]">
                <span>No new notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
