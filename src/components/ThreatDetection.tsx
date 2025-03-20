
import React from "react";
import { AlertOctagon, AlertTriangle, Shield } from "lucide-react";
import CircularProgress from "./CircularProgress";
import HexagonChart from "./HexagonChart";
import { threatMetrics, hexagonData } from "@/lib/mockData";

const ThreatDetection: React.FC = () => {
  const { currentThreatLevel, averageSeverity, activeThreats, blockedAttacks } = threatMetrics;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold flex items-center mb-6">
          <AlertOctagon className="w-5 h-5 mr-2 text-honeypot-accent-pink" />
          Detecting Threats
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Current Threat Level */}
          <div className="flex flex-col items-center">
            <CircularProgress
              value={currentThreatLevel}
              max={100}
              size={140}
              strokeWidth={12}
              color="var(--accent-color, #FFC0CB)"
              trackColor="rgba(255, 192, 203, 0.1)"
              className="mb-4"
              label={
                <div className="text-center">
                  <span className="text-3xl font-bold">{currentThreatLevel}</span>
                </div>
              }
            />
            <span className="text-sm text-honeypot-text-secondary">Current Threat Level</span>
          </div>

          {/* Average Severity */}
          <div className="flex flex-col items-center">
            <CircularProgress
              value={averageSeverity}
              max={100}
              size={140}
              strokeWidth={12}
              color="var(--accent-color, #BBDEFB)"
              trackColor="rgba(187, 222, 251, 0.1)"
              className="mb-4"
              label={
                <div className="text-center">
                  <span className="text-3xl font-bold">{averageSeverity}</span>
                </div>
              }
            />
            <span className="text-sm text-honeypot-text-secondary">Average Severity</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="bg-honeypot-accent-mint/20 hover:bg-honeypot-accent-mint/30 text-honeypot-accent-mint border border-honeypot-accent-mint/30 rounded-lg py-2 transition-colors">
            Analyze
          </button>
          <button className="bg-honeypot-accent-pink/20 hover:bg-honeypot-accent-pink/30 text-honeypot-accent-pink border border-honeypot-accent-pink/30 rounded-lg py-2 transition-colors">
            Respond
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-honeypot-text-primary border border-white/10 rounded-lg py-2 transition-colors">
            Mitigate
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-honeypot-text-primary border border-white/10 rounded-lg py-2 transition-colors">
            Report
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-semibold flex items-center mb-6">
          <Shield className="w-5 h-5 mr-2 text-honeypot-accent-blue" />
          Attack Vectors
        </h2>

        <div className="flex justify-center items-center h-[280px]">
          <HexagonChart
            data={hexagonData}
            size={240}
            color="var(--accent-color, #BBDEFB)"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-honeypot-accent-pink mb-1">{activeThreats}</div>
            <div className="text-xs text-honeypot-text-secondary text-center">Active Threats</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center">
            <div className="text-2xl font-bold text-honeypot-accent-blue mb-1">{blockedAttacks}</div>
            <div className="text-xs text-honeypot-text-secondary text-center">Blocked Attacks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;
