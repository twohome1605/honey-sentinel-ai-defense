
import React, { useState } from "react";
import { Shield, Settings, Lock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { securitySettings } from "@/lib/mockData";
import { toast } from "@/hooks/use-toast";

const AdaptiveSecurity: React.FC = () => {
  const [settings, setSettings] = useState(securitySettings);

  const handleSettingChange = (id: number, value: number[]) => {
    const newSettings = settings.map(setting => 
      setting.id === id ? { ...setting, value: value[0] } : setting
    );
    setSettings(newSettings);
    
    // Show toast when settings are changed
    const changedSetting = settings.find(s => s.id === id);
    if (changedSetting) {
      toast({
        title: "Security Setting Updated",
        description: `${changedSetting.name} set to ${value[0]}%`,
      });
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-slide-up">
      <h2 className="text-xl font-semibold flex items-center mb-6">
        <Settings className="w-5 h-5 mr-2 text-honeypot-accent-pink" />
        Adaptive Securities
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {settings.slice(0, 2).map((setting) => (
            <div key={setting.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{setting.name}</label>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">{setting.value}%</span>
              </div>
              <Slider
                value={[setting.value]}
                max={setting.max}
                step={1}
                onValueChange={(value) => handleSettingChange(setting.id, value)}
                className="py-1"
              />
            </div>
          ))}
        </div>
        
        <div className="space-y-6">
          {settings.slice(2, 4).map((setting) => (
            <div key={setting.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">{setting.name}</label>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">{setting.value}%</span>
              </div>
              <Slider
                value={[setting.value]}
                max={setting.max}
                step={1}
                onValueChange={(value) => handleSettingChange(setting.id, value)}
                className="py-1"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-lg flex items-center space-x-4">
          <div className="bg-honeypot-accent-pink/20 p-3 rounded-full">
            <Shield className="h-6 w-6 text-honeypot-accent-pink" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Honeypot Status</h3>
            <p className="text-xs text-honeypot-text-secondary mt-1">Active & Monitoring</p>
          </div>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg flex items-center space-x-4">
          <div className="bg-honeypot-accent-blue/20 p-3 rounded-full">
            <Lock className="h-6 w-6 text-honeypot-accent-blue" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Security Protocol</h3>
            <p className="text-xs text-honeypot-text-secondary mt-1">Enhanced Defense</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="bg-white/5 hover:bg-white/10 text-honeypot-text-primary border border-white/10 px-4 py-2 rounded-lg text-sm transition-colors">
          Reset Defaults
        </button>
        <button className="bg-honeypot-accent-pink/20 hover:bg-honeypot-accent-pink/30 text-honeypot-accent-pink border border-honeypot-accent-pink/30 px-4 py-2 rounded-lg text-sm transition-colors">
          Apply Changes
        </button>
      </div>
    </div>
  );
};

export default AdaptiveSecurity;
