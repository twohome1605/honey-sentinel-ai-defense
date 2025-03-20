
import React, { useState } from "react";
import { AlertTriangle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { attacks } from "@/lib/mockData";

const AttackLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredAttacks = attacks.filter(attack => {
    const matchesSearch = 
      attack.attackerIp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attack.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === "all" ||
      (filter === "high" && attack.severity >= 75) ||
      (filter === "medium" && attack.severity >= 50 && attack.severity < 75) ||
      (filter === "low" && attack.severity < 50);
    
    return matchesSearch && matchesFilter;
  });

  // Function to get severity class based on severity value
  const getSeverityClass = (severity: number) => {
    if (severity >= 75) return "bg-red-500/20 text-red-300 border-red-500/30";
    if (severity >= 50) return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    return "bg-green-500/20 text-green-300 border-green-500/30";
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-honeypot-accent-pink" />
          Attack Logs
        </h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-honeypot-text-secondary" />
            <Input
              type="text"
              placeholder="Search attacks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-9 bg-honeypot-bg-dark/50 border-white/10 rounded-lg text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-honeypot-text-secondary" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 pl-9 pr-7 bg-honeypot-bg-dark/50 border border-white/10 rounded-lg text-sm appearance-none cursor-pointer text-honeypot-text-primary focus:outline-none focus:ring-1 focus:ring-honeypot-accent-blue/50"
            >
              <option value="all">All Severities</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="low">Low Severity</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="w-full min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-honeypot-text-secondary uppercase tracking-wider bg-honeypot-bg-dark/80 backdrop-blur-sm">ID</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-honeypot-text-secondary uppercase tracking-wider bg-honeypot-bg-dark/80 backdrop-blur-sm">Attack Type</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-honeypot-text-secondary uppercase tracking-wider bg-honeypot-bg-dark/80 backdrop-blur-sm">Attacker IP</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-honeypot-text-secondary uppercase tracking-wider bg-honeypot-bg-dark/80 backdrop-blur-sm">Timestamp</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-honeypot-text-secondary uppercase tracking-wider bg-honeypot-bg-dark/80 backdrop-blur-sm">Severity</th>
              <th className="sticky top-0 px-6 py-3 text-left text-xs font-medium text-honeypot-text-secondary uppercase tracking-wider bg-honeypot-bg-dark/80 backdrop-blur-sm">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredAttacks.map((attack) => (
              <tr key={attack.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm">#{attack.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{attack.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{attack.attackerIp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-honeypot-text-secondary">{formatTimestamp(attack.timestamp)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityClass(attack.severity)}`}>
                    {attack.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs border-white/10 hover:bg-white/10 hover:text-honeypot-text-primary">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttackLogs;
