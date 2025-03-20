
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate authentication (in a real app, this would call an API)
    setTimeout(() => {
      // Mock successful authentication
      if (username === "admin" && password === "password") {
        toast({
          title: "Authentication Successful",
          description: "Welcome to Honeypot Defense System",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
        setIsLoading(false);
      }
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
            <span className="text-honeypot-accent-blue">Honey</span>
            <span className="text-honeypot-accent-pink">pot</span>
          </h1>
          <p className="text-honeypot-text-secondary mt-2">Honeypot Defense System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              <Lock className="absolute left-3 top-3 h-5 w-5 text-honeypot-text-secondary" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              "Login to System"
            )}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-honeypot-text-secondary">
              Don't have an account?{" "}
              <Link to="/register" className="text-honeypot-accent-blue hover:underline">
                Register
              </Link>
            </span>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-honeypot-text-secondary">
          <p>Use demo credentials: admin / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
