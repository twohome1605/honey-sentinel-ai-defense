
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { Shield, Bell, AlertTriangle, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { alertLevels } from "@/lib/mockData";

const Alerts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  
  // Mock alerts data
  const alerts = [
    { 
      id: 1, 
      title: "Brute Force Attack Detected", 
      description: "Multiple failed login attempts from IP 192.168.1.105", 
      timestamp: "2023-06-12T08:23:15", 
      severity: "Critical",
      isNew: true
    },
    { 
      id: 2, 
      title: "SQL Injection Attempt", 
      description: "Malicious SQL query detected in login form", 
      timestamp: "2023-06-12T10:45:22", 
      severity: "High",
      isNew: true
    },
    { 
      id: 3, 
      title: "Suspicious File Upload", 
      description: "Potentially malicious file attempted to be uploaded", 
      timestamp: "2023-06-11T14:12:57", 
      severity: "Medium",
      isNew: false
    },
    { 
      id: 4, 
      title: "Unusual Admin Activity", 
      description: "Admin account active from unknown location", 
      timestamp: "2023-06-10T22:05:33", 
      severity: "High",
      isNew: false
    },
    { 
      id: 5, 
      title: "Port Scan Detected", 
      description: "Sequential port scan from IP 203.0.113.42", 
      timestamp: "2023-06-09T17:38:11", 
      severity: "Low",
      isNew: false
    }
  ];

  // Filter alerts by search query
  const filteredAlerts = alerts.filter(alert => 
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Alerts refreshed");
    }, 1000);
  };

  const toggleAlerts = () => {
    const newValue = !alertsEnabled;
    setAlertsEnabled(newValue);
    toast.success(newValue ? "Alerts enabled" : "Alerts disabled");
  };

  const getSeverityClass = (severity: string) => {
    switch(severity) {
      case "Critical": return "bg-red-500/20 text-red-300 border-red-500/30";
      case "High": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Low": return "bg-green-500/20 text-green-300 border-green-500/30";
      default: return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-honeypot-bg-dark pb-24 lg:pb-6 lg:pt-16">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-honeypot-accent-blue/20 p-3 rounded-full mr-3">
              <Bell className="h-6 w-6 text-honeypot-accent-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Security Alerts</h1>
              <p className="text-honeypot-text-secondary text-sm">
                Real-time intrusion notifications
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={alertsEnabled} 
                onCheckedChange={toggleAlerts} 
                id="alerts-mode"
              />
              <label 
                htmlFor="alerts-mode" 
                className="text-sm cursor-pointer select-none"
              >
                {alertsEnabled ? "Alerts On" : "Alerts Off"}
              </label>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 bg-honeypot-bg-card"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {alertLevels.map((level) => (
            <div 
              key={level.level}
              className="glass-card rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-honeypot-text-secondary">
                  {level.level} Alerts
                </p>
                <p className="text-2xl font-bold">{level.count}</p>
              </div>
              <div 
                className="h-10 w-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${level.color}20`, color: level.color }}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">Recent Alerts</h2>
            <div className="relative w-full sm:w-64">
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-honeypot-text-secondary" />
              <Input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-honeypot-bg-dark/50 border-white/10 rounded-lg text-sm w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3 ${getSeverityClass(alert.severity)}`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{alert.title}</h3>
                          {alert.isNew && (
                            <span className="ml-2 text-xs bg-honeypot-accent-blue/20 text-honeypot-accent-blue px-1.5 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-honeypot-text-secondary mt-1">
                          {alert.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityClass(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-honeypot-text-secondary mt-2">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-7 border-white/10 hover:bg-white/10"
                      onClick={() => toast.info(`Alert ${alert.id} details would be shown here`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-7 ml-2 border-white/10 hover:bg-white/10"
                      onClick={() => toast.success(`Alert ${alert.id} marked as resolved`)}
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-honeypot-text-secondary">
                No alerts matching your search criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
