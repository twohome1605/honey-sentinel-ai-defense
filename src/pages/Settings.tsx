
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { Shield, Settings as SettingsIcon, Save, Lock, Database, Bell, Shield as ShieldIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { securitySettings } from "@/lib/mockData";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Settings: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [securityLevels, setSecurityLevels] = useState(
    securitySettings.reduce((acc, setting) => {
      acc[setting.id] = setting.value;
      return acc;
    }, {} as Record<number, number>)
  );

  const form = useForm({
    defaultValues: {
      enableNotifications: true,
      enableAutoUpdates: true,
      enableAdvancedAI: true,
      enableIPBlocking: true,
      logRetentionDays: "30",
      apiEndpoint: "https://api.sentinel.ai",
      maxConcurrentScans: "5"
    }
  });

  const handleSliderChange = (id: number, value: number[]) => {
    setSecurityLevels(prev => ({
      ...prev,
      [id]: value[0]
    }));
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  const toolConfigurations = [
    {
      name: "Snort",
      description: "Network traffic analysis and packet logging tool",
      enabled: true
    },
    {
      name: "Suricata",
      description: "High performance network IDS, IPS and security monitoring",
      enabled: true
    },
    {
      name: "Fail2ban",
      description: "Scans log files and bans IPs that show malicious signs",
      enabled: true
    },
    {
      name: "Ossec",
      description: "Host-based Intrusion Detection System",
      enabled: false
    },
    {
      name: "ELK Stack",
      description: "Log management and visualization platform",
      enabled: true
    },
    {
      name: "TensorFlow",
      description: "AI-based intrusion detection models",
      enabled: true
    }
  ];

  const onSubmit = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      toast.success("System settings updated successfully");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-honeypot-bg-dark pb-24 lg:pb-6 lg:pt-16">
      <NavBar />
      
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="bg-honeypot-accent-blue/20 p-3 rounded-full mr-3">
              <SettingsIcon className="h-6 w-6 text-honeypot-accent-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">System Settings</h1>
              <p className="text-honeypot-text-secondary text-sm">
                Configure Sentinel AI defense parameters
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="default" 
              className="bg-honeypot-accent-pink hover:bg-honeypot-accent-pink/80 text-black"
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="loading-dots flex">
                    <div className="h-1.5 w-1.5 rounded-full bg-black mx-0.5"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-black mx-0.5"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-black mx-0.5"></div>
                  </div>
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>
        </header>

        <div className="glass-card rounded-xl p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="apiEndpoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Endpoint</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-honeypot-bg-dark/50 border-white/10" />
                            </FormControl>
                            <FormDescription className="text-honeypot-text-secondary">
                              Primary API connection endpoint
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="logRetentionDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Log Retention (Days)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="bg-honeypot-bg-dark/50 border-white/10" />
                            </FormControl>
                            <FormDescription className="text-honeypot-text-secondary">
                              Number of days to retain system logs
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="maxConcurrentScans"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Concurrent Scans</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} className="bg-honeypot-bg-dark/50 border-white/10" />
                            </FormControl>
                            <FormDescription className="text-honeypot-text-secondary">
                              Maximum parallel scanning processes
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="enableNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Notifications
                                </FormLabel>
                                <FormDescription>
                                  Enable email and push notifications
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="enableAutoUpdates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Auto Updates
                                </FormLabel>
                                <FormDescription>
                                  Automatically update security rules
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="enableAdvancedAI"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Advanced AI Detection
                                </FormLabel>
                                <FormDescription>
                                  Use machine learning for attack prediction
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-honeypot-accent-blue hover:bg-honeypot-accent-blue/80"
                  >
                    Save General Settings
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-8">
              <div>
                <h2 className="text-lg font-medium mb-4">Security Levels</h2>
                <div className="space-y-6">
                  {securitySettings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <div className="flex justify-between">
                        <Label>{setting.name}</Label>
                        <span className="text-sm font-medium">{securityLevels[setting.id]}/{setting.max}</span>
                      </div>
                      <Slider
                        defaultValue={[setting.value]}
                        max={setting.max}
                        step={1}
                        onValueChange={(value) => handleSliderChange(setting.id, value)}
                        className="py-2"
                      />
                      <p className="text-xs text-honeypot-text-secondary">
                        {securityLevels[setting.id] < 33 ? "Low" : 
                         securityLevels[setting.id] < 66 ? "Medium" : "High"} protection level
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-4">Security Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center">
                      <ShieldIcon className="h-5 w-5 mr-2 text-honeypot-accent-blue" />
                      <h3 className="font-medium">Intrusion Prevention</h3>
                    </div>
                    <p className="text-sm text-honeypot-text-secondary mt-1">
                      Using Fail2ban and Ossec to block malicious IPs
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto mt-2 text-honeypot-accent-blue text-xs"
                      onClick={() => toast.info("Intrusion Prevention configuration would be shown here")}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-honeypot-accent-pink" />
                      <h3 className="font-medium">Access Control</h3>
                    </div>
                    <p className="text-sm text-honeypot-text-secondary mt-1">
                      Manage user roles and permissions
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto mt-2 text-honeypot-accent-pink text-xs"
                      onClick={() => toast.info("Access Control configuration would be shown here")}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-honeypot-accent-blue" />
                      <h3 className="font-medium">Data Encryption</h3>
                    </div>
                    <p className="text-sm text-honeypot-text-secondary mt-1">
                      Configure encryption settings for stored data
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto mt-2 text-honeypot-accent-blue text-xs"
                      onClick={() => toast.info("Data Encryption configuration would be shown here")}
                    >
                      Configure
                    </Button>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-honeypot-accent-pink" />
                      <h3 className="font-medium">Alert Configuration</h3>
                    </div>
                    <p className="text-sm text-honeypot-text-secondary mt-1">
                      Set up alert thresholds and notification rules
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="p-0 h-auto mt-2 text-honeypot-accent-pink text-xs"
                      onClick={() => toast.info("Alert Configuration would be shown here")}
                    >
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="tools" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-lg font-medium">Tool Configurations</h2>
                <p className="text-sm text-honeypot-text-secondary">
                  Enable or disable integrated security tools
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {toolConfigurations.map((tool, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{tool.name}</h3>
                          <p className="text-xs text-honeypot-text-secondary mt-0.5">
                            {tool.description}
                          </p>
                        </div>
                        <Switch 
                          defaultChecked={tool.enabled}
                          onCheckedChange={() => toast.success(`${tool.name} ${tool.enabled ? 'disabled' : 'enabled'}`)}
                        />
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs border-white/10 hover:bg-white/10"
                          onClick={() => toast.info(`${tool.name} configuration would be shown here`)}
                        >
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
