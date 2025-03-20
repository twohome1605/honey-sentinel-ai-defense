
import React from "react";
import NavBar from "@/components/NavBar";
import { Shield, BarChart3, Network, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import BarChart from "@/components/BarChart";
import { monthlyAttackData, weeklyAttackData } from "@/lib/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Analytics: React.FC = () => {
  // Transform weekly and monthly data for charts
  const weeklyChartData = weeklyAttackData.map(item => ({
    label: item.day,
    value: item.attacks
  }));

  const monthlyChartData = monthlyAttackData.map(item => ({
    label: item.month,
    value: item.attacks
  }));

  const handleExportData = () => {
    toast.success("Analytics data exported successfully");
  };

  const analyticsSections = [
    {
      title: "Network Traffic Analysis",
      description: "Using Snort and Suricata for intrusion detection",
      icon: <Network className="h-6 w-6 text-honeypot-accent-blue" />,
      technologies: ["Snort", "Suricata"],
      metrics: [
        { name: "Packets Analyzed", value: "1.2M" },
        { name: "Suspicious Packets", value: "3,421" },
        { name: "Traffic Patterns", value: "17" }
      ]
    },
    {
      title: "Machine Learning Models",
      description: "Using TensorFlow and Scikit-learn for pattern recognition",
      icon: <Activity className="h-6 w-6 text-honeypot-accent-pink" />,
      technologies: ["TensorFlow", "Scikit-learn"],
      metrics: [
        { name: "Model Accuracy", value: "94.7%" },
        { name: "Patterns Detected", value: "56" },
        { name: "False Positives", value: "0.3%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-honeypot-bg-dark pb-24 lg:pb-6 lg:pt-16">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-honeypot-accent-blue/20 p-3 rounded-full mr-3">
              <BarChart3 className="h-6 w-6 text-honeypot-accent-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-honeypot-text-secondary text-sm">
                Advanced attack pattern analysis
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 bg-honeypot-bg-card"
              onClick={handleExportData}
            >
              Export Data
            </Button>
          </div>
        </header>

        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Attack Trend Analysis</h2>
          
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="weekly">Weekly Data</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly" className="space-y-4">
              <div className="h-64">
                <BarChart 
                  data={weeklyChartData} 
                  height={220} 
                  barColor="var(--accent-color, #BBDEFB)"
                  className="mt-4 mx-auto" 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="space-y-4">
              <div className="h-64">
                <BarChart 
                  data={monthlyChartData} 
                  height={220} 
                  barColor="var(--accent-color, #FF9ED8)"
                  className="mt-4 mx-auto" 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analyticsSections.map((section, index) => (
            <div key={index} className="glass-card rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-honeypot-bg-dark/50 p-3 rounded-full mr-3">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="text-honeypot-text-secondary text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {section.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="bg-honeypot-accent-blue/20 text-honeypot-accent-blue text-xs px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {section.metrics.map((metric, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold">{metric.value}</p>
                    <p className="text-xs text-honeypot-text-secondary">{metric.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
