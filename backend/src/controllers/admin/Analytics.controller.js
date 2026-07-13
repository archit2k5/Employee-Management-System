import User from '../../models/User.js';
import Payslip from '../../models/Payslip.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/admin/analytics
export const getAnalytics = asyncHandler(async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const currentPeriod = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  const [totalHeadcount, newThisMonth, activeUsers, monthlyPayslips] = await Promise.all([
    User.countDocuments({ isActive: true }),
    User.countDocuments({ createdAt: { $gte: startOfMonth } }),
    User.find({ isActive: true }).select('createdAt'),
    Payslip.find({ period: currentPeriod }),
  ]);

  const monthlyPayroll = monthlyPayslips.reduce((sum, p) => sum + p.netPay, 0);

  const now = Date.now();
  const avgTenureYears = activeUsers.length
    ? activeUsers.reduce((sum, u) => sum + (now - u.createdAt.getTime()), 0) /
      activeUsers.length /
      (1000 * 60 * 60 * 24 * 365)
    : 0;

  // Retention: active users / (active + deactivated in last 12 months) — simplified placeholder.
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
  const deactivatedLastYear = await User.countDocuments({
    isActive: false,
    updatedAt: { $gte: twelveMonthsAgo },
  });
  const retentionRate = totalHeadcount
    ? Math.round((totalHeadcount / (totalHeadcount + deactivatedLastYear)) * 1000) / 10
    : 0;

  res.json({
    totalHeadcount: { count: totalHeadcount, newThisMonth },
    monthlyPayroll,
    avgTenureYears: Math.round(avgTenureYears * 10) / 10,
    retentionRate,
  });
});

// GET /api/admin/analytics/employee-growth
export const getEmployeeGrowth = asyncHandler(async (req, res) => {
  const { year = new Date().getFullYear() } = req.query;

  const start = new Date(Number(year), 0, 1);
  const end = new Date(Number(year) + 1, 0, 1);

  const users = await User.find({ createdAt: { $gte: start, $lt: end } }).select('createdAt');

  const monthlyNewHires = Array(12).fill(0);
  users.forEach((u) => {
    monthlyNewHires[u.createdAt.getMonth()] += 1;
  });

  // Running total headcount by month, seeded from users created before this year
  const priorHeadcount = await User.countDocuments({ createdAt: { $lt: start } });
  let runningTotal = priorHeadcount;
  const cumulative = monthlyNewHires.map((count) => {
    runningTotal += count;
    return runningTotal;
  });

  res.json({
    months: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    newHires: monthlyNewHires,
    cumulativeHeadcount: cumulative,
  });
});

// GET /api/admin/analytics/payroll-cost
export const getPayrollCost = asyncHandler(async (req, res) => {
  const { year = new Date().getFullYear() } = req.query;

  const payslips = await Payslip.find({ period: { $regex: `^${year}` } });

  const byMonth = {};
  payslips.forEach((p) => {
    byMonth[p.period] = (byMonth[p.period] || 0) + p.netPay;
  });

  res.json(
    Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([period, cost]) => ({ period, cost }))
  );
});

// GET /api/admin/analytics/system-health
// Wire this up to real health checks (DB ping, external service pings, uptime tracking).
// Stubbed with a representative shape for now.
export const getSystemHealth = asyncHandler(async (req, res) => {
  const mongoose = (await import('mongoose')).default;
  const dbState = mongoose.connection.readyState; // 1 = connected

  res.json([
    { service: 'API Server', status: 'healthy', uptime: '99.98%', latencyMs: 45 },
    {
      service: 'Database',
      status: dbState === 1 ? 'healthy' : 'degraded',
      uptime: '99.99%',
      latencyMs: 12,
    },
    { service: 'Auth Service', status: 'healthy', uptime: '99.9%', latencyMs: 60 },
    { service: 'Storage', status: 'healthy', uptime: '99.95%', latencyMs: 30 },
  ]);
});