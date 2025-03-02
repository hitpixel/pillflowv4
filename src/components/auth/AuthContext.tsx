import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

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

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in (from Supabase session)
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          // Get user profile from database
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          const userData = {
            id: session.user.id,
            email: session.user.email || "",
            name: profile?.full_name || session.user.email?.split("@")[0] || "",
            role: profile?.role || "Pharmacist",
          };

          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      },
    );

    // Initial session check
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        // Get user profile from database
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        const userData = {
          id: session.user.id,
          email: session.user.email || "",
          name: profile?.full_name || session.user.email?.split("@")[0] || "",
          role: profile?.role || "Pharmacist",
        };

        setUser(userData);
        setIsAuthenticated(true);
      }
    };

    checkSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return false;
      }

      console.log("Login response:", data);

      // Check if we have a user and session
      if (data.user && data.session) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login exception:", error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (
    email: string,
    password: string,
    name: string,
  ): Promise<boolean> => {
    try {
      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error("Registration error:", error.message);
        return false;
      }

      // For debugging
      console.log("Registration response:", data);

      if (data.user) {
        // We don't need to manually create a profile record anymore
        // The trigger we created in SQL will handle this automatically

        // If email confirmation is required, show a message
        if (data.user && !data.session) {
          console.log("Please check your email for confirmation link");
        }

        return true;
      }

      return false;
    } catch (error) {
      console.error("Registration exception:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
