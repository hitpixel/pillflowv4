import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Pill, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface LoginPageProps {
  onLogin?: (email: string, password: string) => Promise<boolean>;
}

const LoginPage: React.FC<LoginPageProps> = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Attempting to login with:", email);
      const success = await login(email, password);
      console.log("Login result:", success);

      if (success) {
        navigate("/");
      } else {
        setError(
          "Invalid email or password. If you just registered, you may need to confirm your email first.",
        );
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error("Login error:", err);
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
            Welcome to WebsterTrack
          </h1>
          <p className="text-lg text-gray-300">
            Streamline your healthcare webster packing workflow with our modern
            solution.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full lg:w-1/2">
        <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Pill className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-white">WebsterTrack</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-500">
              Please enter your details to sign in to your account
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
                placeholder="Enter your password"
                required
                className="bg-gray-900/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-300">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
