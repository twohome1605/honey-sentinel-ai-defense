
import React from "react";
import NavBar from "@/components/NavBar";
import AttackLogs from "@/components/AttackLogs";
import ThreatDetection from "@/components/ThreatDetection";
import AdaptiveSecurity from "@/components/AdaptiveSecurity";
import LoggingActivities from "@/components/LoggingActivities";
import AlertNotifications from "@/components/AlertNotifications";
import { Shield } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-honeypot-bg-dark pb-24 lg:pb-6 lg:pt-16">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-honeypot-accent-blue/20 p-3 rounded-full mr-3">
              <Shield className="h-6 w-6 text-honeypot-accent-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Honeypot Defense Dashboard</h1>
              <p className="text-honeypot-text-secondary text-sm">
                Honeypot Monitoring System
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-honeypot-accent-pink/20 text-honeypot-accent-pink text-sm px-3 py-1.5 rounded-full border border-honeypot-accent-pink/30">
              83 Threats Detected
            </div>
          </div>
        </header>

        <div className="space-y-8">
          <ThreatDetection />
          <AttackLogs />
          <LoggingActivities />
          <AdaptiveSecurity />
          <AlertNotifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
