import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Pill } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`,
          },
        },
      });

      if (error) throw error;

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error: any) {
      setError(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0e17]">
      {/* Left side - Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1920&auto=format&fit=crop"
          alt="Medical Technology"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        <div className="absolute bottom-0 left-0 right-0 p-20">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white">
            Join WebsterTrack
          </h1>
          <p className="text-lg text-gray-300">
            Create an account to start managing your webster packs efficiently.
          </p>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex w-full lg:w-1/2">
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Pill className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-white">WebsterTrack</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Create an account
            </h2>
            <p className="mt-2 text-gray-400">
              Please enter your details to register
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  required
                  className="bg-[#1a2133] border-[#1e2738] text-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  required
                  className="bg-[#1a2133] border-[#1e2738] text-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-[#1a2133] border-[#1e2738] text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                className="bg-[#1a2133] border-[#1e2738] text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                className="bg-[#1a2133] border-[#1e2738] text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-gray-300">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {error && (
              <div className="p-3 text-sm bg-red-500/20 border border-red-500/50 text-red-400 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
