
// Mock users data
export const users = [
  { id: 1, name: "Admin User", role: "Administrator", email: "admin@sentinel.ai" },
  { id: 2, name: "Security Analyst", role: "Analyst", email: "analyst@sentinel.ai" },
  { id: 3, name: "SOC Manager", role: "Manager", email: "manager@sentinel.ai" }
];

// Mock attack data
export const attacks = [
  { id: 1, attackerIp: "192.168.1.100", timestamp: "2023-06-12T08:23:15", severity: 87, type: "SQL Injection" },
  { id: 2, attackerIp: "45.33.22.11", timestamp: "2023-06-12T09:45:32", severity: 65, type: "XSS Attack" },
  { id: 3, attackerIp: "198.51.100.23", timestamp: "2023-06-12T10:12:08", severity: 92, type: "Brute Force" },
  { id: 4, attackerIp: "203.0.113.42", timestamp: "2023-06-12T11:30:45", severity: 45, type: "Port Scan" },
  { id: 5, attackerIp: "172.16.254.1", timestamp: "2023-06-12T12:15:22", severity: 78, type: "DDoS" },
  { id: 6, attackerIp: "169.254.169.254", timestamp: "2023-06-12T13:05:18", severity: 55, type: "Credential Stuffing" },
  { id: 7, attackerIp: "10.10.10.10", timestamp: "2023-06-12T14:22:37", severity: 83, type: "RCE Attempt" },
  { id: 8, attackerIp: "8.8.8.8", timestamp: "2023-06-12T15:18:54", severity: 72, type: "CSRF Attack" }
];

// Mock logs data
export const logs = [
  { id: 1, attackId: 1, actionTaken: "IP Blocked", timestamp: "2023-06-12T08:23:18" },
  { id: 2, attackId: 1, actionTaken: "Alert Generated", timestamp: "2023-06-12T08:23:20" },
  { id: 3, attackId: 2, actionTaken: "Request Sanitized", timestamp: "2023-06-12T09:45:35" },
  { id: 4, attackId: 3, actionTaken: "Account Locked", timestamp: "2023-06-12T10:12:10" },
  { id: 5, attackId: 3, actionTaken: "Alert Generated", timestamp: "2023-06-12T10:12:12" },
  { id: 6, attackId: 4, actionTaken: "Firewall Rule Updated", timestamp: "2023-06-12T11:30:50" },
  { id: 7, attackId: 5, actionTaken: "Traffic Throttled", timestamp: "2023-06-12T12:15:25" },
  { id: 8, attackId: 6, actionTaken: "Session Terminated", timestamp: "2023-06-12T13:05:22" }
];

// Mock threat metrics data
export const threatMetrics = {
  currentThreatLevel: 63,
  averageSeverity: 72,
  activeThreats: 3,
  blockedAttacks: 142,
  detectionRatio: 0.95
};

// Mock activity data for charts
export const weeklyAttackData = [
  { day: "Mon", attacks: 24 },
  { day: "Tue", attacks: 32 },
  { day: "Wed", attacks: 18 },
  { day: "Thu", attacks: 45 },
  { day: "Fri", attacks: 38 },
  { day: "Sat", attacks: 13 },
  { day: "Sun", attacks: 22 }
];

export const monthlyAttackData = [
  { month: "Jan", attacks: 120 },
  { month: "Feb", attacks: 145 },
  { month: "Mar", attacks: 132 },
  { month: "Apr", attacks: 168 },
  { month: "May", attacks: 190 },
  { month: "Jun", attacks: 223 },
  { month: "Jul", attacks: 215 },
  { month: "Aug", attacks: 186 },
  { month: "Sep", attacks: 205 },
  { month: "Oct", attacks: 178 },
  { month: "Nov", attacks: 198 },
  { month: "Dec", attacks: 210 }
];

// Hexagon chart data (for visualizing attack vectors)
export const hexagonData = [
  { axis: "Network", value: 0.8 },
  { axis: "Application", value: 0.65 },
  { axis: "Database", value: 0.45 },
  { axis: "Authentication", value: 0.9 },
  { axis: "Browser", value: 0.7 },
  { axis: "API", value: 0.5 }
];

// Security settings
export const securitySettings = [
  { id: 1, name: "Honeypot Visibility", value: 65, max: 100 },
  { id: 2, name: "Detection Sensitivity", value: 80, max: 100 },
  { id: 3, name: "Auto-Response Level", value: 50, max: 100 },
  { id: 4, name: "Logging Verbosity", value: 75, max: 100 }
];

// Alert levels data
export const alertLevels = [
  { level: "Critical", count: 3, color: "#FF6B6B" },
  { level: "High", count: 8, color: "#FF9F40" },
  { level: "Medium", count: 15, color: "#FFCC5C" },
  { level: "Low", count: 22, color: "#88D498" }
];

// Threat source locations
export const threatSources = [
  { country: "United States", percentage: 22 },
  { country: "China", percentage: 18 },
  { country: "Russia", percentage: 16 },
  { country: "Iran", percentage: 10 },
  { country: "North Korea", percentage: 8 },
  { country: "Other", percentage: 26 }
];
