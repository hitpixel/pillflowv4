import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Pill, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface RegisterPageProps {
  onRegister?: (
    email: string,
    password: string,
    name: string,
  ) => Promise<boolean>;
}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting to register with:", { email, name });
      const success = await register(email, password, name);
      console.log("Registration result:", success);

      if (success) {
        // Redirect to login page after successful registration
        navigate("/login", {
          state: {
            message:
              "Registration successful! Please check your email for confirmation link and then log in.",
          },
        });
      } else {
        setError(
          "Registration successful! Please check your email for a confirmation link before logging in.",
        );

        // Even though registration technically succeeded, we'll still redirect to login
        setTimeout(() => {
          navigate("/login", {
            state: {
              message:
                "Please check your email for a confirmation link before logging in.",
            },
          });
        }, 3000);
      }
    } catch (err) {
      setError("An error occurred during registration");
      console.error("Registration error:", err);
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
            Create an account to start managing your pharmacy workflow
            efficiently.
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
            <p className="mt-2 text-gray-500">
              Fill in your details to register for WebsterTrack
            </p>
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="bg-red-900/20 text-red-400 border-red-900"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
                className="bg-gray-900/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="bg-gray-900/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                className="bg-gray-900/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
                className="bg-gray-900/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm text-gray-300">
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  terms and conditions
                </a>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
