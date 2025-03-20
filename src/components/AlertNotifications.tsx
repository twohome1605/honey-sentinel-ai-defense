
import React from "react";
import { Bell, ShieldAlert, Shield } from "lucide-react";
import CircularProgress from "./CircularProgress";
import { alertLevels } from "@/lib/mockData";
import { toast } from "sonner";

const AlertNotifications: React.FC = () => {
  const totalAlerts = alertLevels.reduce((sum, level) => sum + level.count, 0);
  
  const handleViewAll = () => {
    toast.info("Navigating to all security alerts");
  };

  const handleAcknowledgeAll = () => {
    toast.success("All alerts have been acknowledged");
  };

  const handleInvestigate = () => {
    toast.info("Investigating brute force attack...", {
      description: "Threat details displayed in security console"
    });
  };

  const handleBlockIP = () => {
    toast.success("IP 198.51.100.23 has been blocked", {
      description: "Added to firewall block list"
    });
  };
  
  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <ShieldAlert className="w-5 h-5 mr-2 text-honeypot-accent-pink" />
          Security Alerts
        </h2>
        <button 
          onClick={handleViewAll}
          className="bg-honeypot-accent-blue/20 text-honeypot-accent-blue text-xs px-3 py-1.5 rounded-full border border-honeypot-accent-blue/30 flex items-center"
        >
          <Bell className="w-3.5 h-3.5 mr-1.5" />
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Alert Status</h3>
              <div className="bg-honeypot-accent-pink/20 text-honeypot-accent-pink text-xs px-2 py-1 rounded">
                {totalAlerts} Active
              </div>
            </div>
            
            <ul className="space-y-3">
              {alertLevels.map((level) => (
                <li key={level.level} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: level.color }}
                    ></div>
                    <span className="text-sm">{level.level}</span>
                  </div>
                  <span className="text-sm font-medium">{level.count}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={handleAcknowledgeAll}
              className="w-full mt-4 bg-white/10 hover:bg-white/15 text-honeypot-text-primary py-2 rounded-lg text-sm transition-colors"
            >
              Acknowledge All
            </button>
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 h-full">
            <h3 className="text-lg font-semibold mb-4">Critical Alert</h3>
            
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="bg-red-500/20 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-medium text-red-300">Brute Force Attack Detected</h4>
                  <p className="text-xs text-honeypot-text-secondary mt-1">
                    Multiple failed login attempts from IP: 198.51.100.23
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs text-honeypot-text-secondary">
                <span>Severity: High</span>
                <span>2 minutes ago</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleInvestigate}
                className="bg-white/10 hover:bg-white/15 text-honeypot-text-primary py-2 rounded-lg text-sm transition-colors"
              >
                Investigate
              </button>
              <button 
                onClick={handleBlockIP}
                className="bg-honeypot-accent-pink/20 hover:bg-honeypot-accent-pink/30 text-honeypot-accent-pink border border-honeypot-accent-pink/30 py-2 rounded-lg text-sm transition-colors"
              >
                Block IP
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Adaptive Security Response</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <CircularProgress
              value={48}
              max={100}
              size={60}
              strokeWidth={6}
              color="var(--accent-color, #FFC0CB)"
              className="mr-3"
              label={<span className="text-xs font-bold">48%</span>}
            />
            <div>
              <h4 className="text-sm font-medium">Auto-Response</h4>
              <p className="text-xs text-honeypot-text-secondary">Partially Engaged</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <CircularProgress
              value={72}
              max={100}
              size={60}
              strokeWidth={6}
              color="var(--accent-color, #BBDEFB)"
              className="mr-3"
              label={<span className="text-xs font-bold">72%</span>}
            />
            <div>
              <h4 className="text-sm font-medium">System Defense</h4>
              <p className="text-xs text-honeypot-text-secondary">Active Protection</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <CircularProgress
              value={93}
              max={100}
              size={60}
              strokeWidth={6}
              color="var(--accent-color, #C8E6C9)"
              className="mr-3"
              label={<span className="text-xs font-bold">93%</span>}
            />
            <div>
              <h4 className="text-sm font-medium">Monitoring</h4>
              <p className="text-xs text-honeypot-text-secondary">Enhanced Mode</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertNotifications;
