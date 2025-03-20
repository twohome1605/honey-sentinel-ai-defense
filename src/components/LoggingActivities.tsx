
import React from "react";
import { Database, BarChart } from "lucide-react";
import BarChart from "./BarChart";
import { weeklyAttackData, logs } from "@/lib/mockData";

const LoggingActivities: React.FC = () => {
  // Transform weekly data to the format expected by BarChart
  const chartData = weeklyAttackData.map(item => ({
    label: item.day,
    value: item.attacks
  }));

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold flex items-center mb-6">
          <BarChart className="w-5 h-5 mr-2 text-honeypot-accent-blue" />
          Activity Trends
        </h2>

        <div className="h-64">
          <BarChart 
            data={chartData} 
            height={220} 
            barColor="var(--accent-color, #BBDEFB)"
            className="mt-4 mx-auto" 
          />
          <div className="text-center mt-2 text-xs text-honeypot-text-secondary">
            Weekly Attack Frequency
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold flex items-center mb-6">
          <Database className="w-5 h-5 mr-2 text-honeypot-accent-pink" />
          Recent Activity Logs
        </h2>

        <div className="overflow-y-auto h-64">
          <ul className="space-y-3">
            {logs.map((log) => (
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
                  <span className="text-xs text-honeypot-text-secondary">
                    {formatTimestamp(log.timestamp)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoggingActivities;
