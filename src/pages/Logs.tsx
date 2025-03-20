
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import LoggingActivities from "@/components/LoggingActivities";
import { Shield, Filter, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logs } from "@/lib/mockData";

const Logs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLogs = logs.filter(log => {
    if (searchQuery) {
      return log.actionTaken.toLowerCase().includes(searchQuery.toLowerCase()) ||
             log.attackId.toString().includes(searchQuery);
    }
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    alert("Logs exported successfully!");
  };

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
              <h1 className="text-2xl font-bold">System Logs</h1>
              <p className="text-honeypot-text-secondary text-sm">
                Monitor and analyze system events
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 bg-honeypot-bg-card"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
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

        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0">Log Analysis</h2>
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Filter className="absolute left-3 top-2.5 h-4 w-4 text-honeypot-text-secondary" />
                <Input
                  type="text"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-9 bg-honeypot-bg-dark/50 border-white/10 rounded-lg text-sm w-full"
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All Logs</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="overflow-y-auto max-h-[500px]">
                <ul className="space-y-3">
                  {filteredLogs.map((log) => (
                    <li 
                      key={log.id} 
                      className="bg-white/5 p-3 rounded-lg text-sm border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{log.actionTaken}</p>
                          <p className="text-xs text-honeypot-text-secondary mt-1">
                            Attack ID: #{log.attackId}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-honeypot-text-secondary">
                            {new Date(log.timestamp).toLocaleString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs mt-1 hover:text-honeypot-accent-blue"
                            onClick={() => alert(`Details for log #${log.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <div className="p-8 text-center text-honeypot-text-secondary">
                <p>Security logs will be displayed here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              <div className="p-8 text-center text-honeypot-text-secondary">
                <p>System logs will be displayed here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="network" className="space-y-4">
              <div className="p-8 text-center text-honeypot-text-secondary">
                <p>Network logs will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <LoggingActivities />
      </div>
    </div>
  );
};

export default Logs;
