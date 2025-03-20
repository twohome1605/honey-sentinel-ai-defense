
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Lock, User, Mail, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration (in a real app, this would call an API)
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Welcome to Sentinel AI Defense System",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-honeypot-accent-blue/10 p-4 rounded-full mb-4">
            <Shield className="h-12 w-12 text-honeypot-accent-blue animate-pulse-slow" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="text-honeypot-accent-blue">Sentinel</span>
            <span className="text-honeypot-accent-pink">AI</span>
          </h1>
          <p className="text-honeypot-text-secondary mt-2">Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-honeypot-text-secondary" />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-honeypot-bg-dark/50 border-white/10 h-12"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-honeypot-text-secondary" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-honeypot-bg-dark/50 border-white/10 h-12"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-honeypot-text-secondary" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-honeypot-bg-dark/50 border-white/10 h-12"
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-honeypot-text-secondary" />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-honeypot-bg-dark/50 border-white/10 h-12"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-honeypot-accent-pink hover:bg-honeypot-accent-pink/80 text-black font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-dots flex">
                <div className="h-2 w-2 rounded-full bg-black mx-1"></div>
                <div className="h-2 w-2 rounded-full bg-black mx-1"></div>
                <div className="h-2 w-2 rounded-full bg-black mx-1"></div>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-honeypot-text-secondary">
              Already have an account?{" "}
              <Link to="/" className="text-honeypot-accent-blue hover:underline">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
