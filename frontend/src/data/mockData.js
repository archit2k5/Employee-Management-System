export const currentAdmin = {
  name: "James Rodriguez",
  role: "System Admin",
  initials: "JR",
};

export const analyticsStats = [
  { label: "TOTAL HEADCOUNT", value: "108", sub: "+6 this month", icon: "users", color: "blue" },
  { label: "MONTHLY PAYROLL", value: "$1.08M", sub: "+$20k vs May", icon: "dollar", color: "green" },
  { label: "AVG TENURE", value: "2.4 yrs", sub: "Across company", icon: "clock", color: "purple" },
  { label: "RETENTION RATE", value: "94.4%", sub: "Last 12 months", icon: "trend", color: "blue" },
];

export const employeeGrowth = [
  {
    label: "Feb",
    headcount: 100,
    hires: 4,
    exits: 2,
  },
  {
    label: "Mar",
    headcount: 102,
    hires: 5,
    exits: 3,
  },
  {
    label: "Apr",
    headcount: 104,
    hires: 6,
    exits: 4,
  },
  {
    label: "May",
    headcount: 106,
    hires: 4,
    exits: 2,
  },
  {
    label: "Jun",
    headcount: 108,
    hires: 5,
    exits: 3,
  },
  {
    label: "Jul",
    headcount: 110,
    hires: 6,
    exits: 4,
  },
];
export const payrollCostTrend = [
  {
    label: "Feb",
    payroll: 9.8,
    benefits: 2.9,
  },
  {
    label: "Mar",
    payroll: 10.1,
    benefits: 3.0,
  },
  {
    label: "Apr",
    payroll: 10.2,
    benefits: 3.1,
  },
  {
    label: "May",
    payroll: 10.4,
    benefits: 3.2,
  },
  {
    label: "Jun",
    payroll: 10.6,
    benefits: 3.2,
  },
  {
    label: "Jul",
    payroll: 10.8,
    benefits: 3.3,
  },
];

export const systemHealth = [
  { name: "API Server", uptime: "99.98%", latency: "45ms", status: "healthy" },
  { name: "Database", uptime: "99.99%", latency: "12ms", status: "healthy" },
  { name: "Auth Service", uptime: "98.5%", latency: "230ms", status: "degraded" },
  { name: "Storage", uptime: "100%", latency: "8ms", status: "healthy" },
];

export const users = [
  { id: "u1", name: "Alex Chen", initials: "AC", role: "Employee", dept: "Engineering", lastLogin: "Today 09:04", mfa: true, status: "Active", color: "blue" },
  { id: "u2", name: "Sarah Mitchell", initials: "SM", role: "HR Manager", dept: "HR", lastLogin: "Today 08:45", mfa: true, status: "Active", color: "teal" },
  { id: "u3", name: "James Rodriguez", initials: "JR", role: "Admin", dept: "IT", lastLogin: "Today 08:12", mfa: true, status: "Active", color: "amber" },
  { id: "u4", name: "Maria Santos", initials: "MS", role: "Employee", dept: "Design", lastLogin: "Yesterday", mfa: false, status: "Active", color: "purple" },
  { id: "u5", name: "Tom Walker", initials: "TW", role: "Employee", dept: "Sales", lastLogin: "2 days ago", mfa: false, status: "Inactive", color: "red" },
];

export const rolePermissions = {
  Employee: ["View Profile", "Check-in/out", "Apply Leave", "View Payslip", "Use Chat"],
  "HR Manager": ["Manage Employees", "Approve Leave", "Manage Recruitment", "View Reports", "Manage Departments"],
  Admin: ["Full System Access", "Manage Roles", "System Settings", "Audit Logs", "Payroll Processing"],
};

export const payrollStats = [
  { label: "MONTHLY TOTAL", value: "$1.08M", sub: "July 2024", icon: "dollar", color: "green" },
  { label: "EMPLOYEES PAID", value: "108", sub: "All processed", icon: "users", color: "blue" },
  { label: "AVG SALARY", value: "$97.5k", sub: "Per employee/year", icon: "trend", color: "purple" },
  { label: "NEXT RUN", value: "Aug 1", sub: "Scheduled", icon: "calendar", color: "amber" },
];

export const salaryByDept = [
  { dept: "Engineering", avg: "$118,500", min: "$85,000", max: "$195,000", headcount: 42, cost: "$415k" },
  { dept: "Design", avg: "$94,200", min: "$72,000", max: "$135,000", headcount: 15, cost: "$118k" },
  { dept: "Marketing", avg: "$86,400", min: "$65,000", max: "$120,000", headcount: 18, cost: "$130k" },
  { dept: "Sales", avg: "$105,600", min: "$75,000", max: "$180,000", headcount: 25, cost: "$220k" },
  { dept: "HR", avg: "$78,300", min: "$62,000", max: "$110,000", headcount: 8, cost: "$52k" },
  { dept: "Finance", avg: "$99,100", min: "$78,000", max: "$145,000", headcount: 10, cost: "$83k" },
];

export const payrollHistory = [
  { period: "June 2024", employees: 108, processedOn: "Processed Jul 1", amount: "$1,058,400", status: "processed" },
  { period: "May 2024", employees: 106, processedOn: "Processed Jun 1", amount: "$1,042,100", status: "processed" },
  { period: "April 2024", employees: 104, processedOn: "Processed May 1", amount: "$1,035,800", status: "processed" },
];

export const reportTabs = ["Headcount", "Payroll", "Attendance", "Leave", "Performance"];

export const headcountGrowth = [
  { label: "Feb", value: 96 },
  { label: "Mar", value: 99 },
  { label: "Apr", value: 101 },
  { label: "May", value: 106, highlight: true, tooltip: "Total : 106" },
  { label: "Jun", value: 105 },
  { label: "Jul", value: 108 },
];

export const headcountByDept = [
  { dept: "Engineering", value: 42, color: "#4f7dfb" },
  { dept: "Design", value: 15, color: "#22c9c9" },
  { dept: "Marketing", value: 18, color: "#a78bfa" },
  { dept: "Sales", value: 25, color: "#22c55e" },
  { dept: "HR", value: 8, color: "#f59e0b" },
  { dept: "Finance", value: 10, color: "#f472b6" },
];

export const companyConfig = {
  companyName: "Nexus Technologies",
  industry: "Technology",
  headquarters: "San Francisco, CA",
  fiscalYearStart: "January",
  defaultCurrency: "USD",
  workWeek: "Mon–Fri",
};

export const systemToggles = [
  { key: "maintenanceMode", label: "Maintenance Mode", value: true },
  { key: "emailNotifications", label: "Email Notifications", value: true },
  { key: "twoFactorRequired", label: "Two-Factor Required", value: true },
  { key: "auditLogging", label: "Audit Logging", value: true },
  { key: "apiAccess", label: "API Access", value: true },
];

export const auditLogs = [
  { severity: "info", user: "Sarah Mitchell", action: "Approved leave request", target: "Alex Chen", timestamp: "2024-07-02 14:23" },
  { severity: "warning", user: "James Rodriguez", action: "Updated payroll structure", target: "Engineering dept", timestamp: "2024-07-02 11:15" },
  { severity: "info", user: "Lisa Kim", action: "Added new employee", target: "EMP-007", timestamp: "2024-07-02 09:30" },
  { severity: "info", user: "System", action: "Backup completed", target: "Main database", timestamp: "2024-07-02 03:00" },
  { severity: "info", user: "Tom Walker", action: "Exported payroll report", target: "June 2024", timestamp: "2024-07-01 16:45" },
  { severity: "critical", user: "James Rodriguez", action: "Modified role permissions", target: "HR Manager role", timestamp: "2024-07-01 14:00" },
];
