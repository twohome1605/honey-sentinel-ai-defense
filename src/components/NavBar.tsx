
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Shield, BarChart3, Database, Bell, Settings } from "lucide-react";

const NavBar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/dashboard", icon: <Shield size={20} />, label: "Threats" },
    { to: "/logs", icon: <Database size={20} />, label: "Logs" },
    { to: "/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
    { to: "/alerts", icon: <Bell size={20} />, label: "Alerts" },
    { to: "/settings", icon: <Settings size={20} />, label: "Settings" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-honeypot-bg-card border-t border-white/5 lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-start">
          <div className="py-3 lg:pr-8 hidden lg:block">
            <NavLink to="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <span className="text-honeypot-accent-blue">Sentinel</span>
                <span className="text-honeypot-accent-pink">AI</span>
              </span>
            </NavLink>
          </div>
          
          <ul className="flex items-center justify-around w-full lg:w-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={`flex flex-col lg:flex-row items-center px-3 py-3 lg:py-4 transition-colors duration-200 ${
                      isActive 
                        ? "text-honeypot-accent-pink" 
                        : "text-honeypot-text-secondary hover:text-honeypot-text-primary"
                    }`}
                  >
                    <span className="lg:mr-2">{item.icon}</span>
                    <span className="text-xs mt-1 lg:mt-0 lg:text-sm">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
