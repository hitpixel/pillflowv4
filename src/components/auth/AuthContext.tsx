import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  email: string;
  name: string;
  role: string;
  id?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Local storage keys
const USER_KEY = "webstertrack_user";
const AUTH_KEY = "webstertrack_auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load authentication state from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedAuth = localStorage.getItem(AUTH_KEY);

    if (storedUser && storedAuth === "true") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        // Clear invalid storage
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function for development
  const login = async (email: string, password: string): Promise<boolean> => {
    // For development, accept any credentials
    const mockUser = {
      id: "mock-user-id",
      email: email,
      name: email.split("@")[0],
      role: "Pharmacist",
    };

    // Save to localStorage
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    localStorage.setItem(AUTH_KEY, "true");

    setUser(mockUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    // Clear from localStorage
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(AUTH_KEY);

    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<boolean> => {
    // Mock registration always succeeds
    return true;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0e17]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
