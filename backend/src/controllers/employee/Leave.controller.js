import LeaveRequest from '../../models/LeaveRequest.js';
import asyncHandler from '../../utils/asyncHandler.js';

const ANNUAL_LEAVE_ALLOWANCE = 24; // TODO: move to a company policy config / per-user override

// GET /api/employee/leave/balance
export const getBalance = asyncHandler(async (req, res) => {
  const approved = await LeaveRequest.find({ userId: req.user.id, status: 'approved' });

  const usedByType = approved.reduce((acc, l) => {
    acc[l.type] = (acc[l.type] || 0) + l.days;
    return acc;
  }, {});

  const totalUsed = Object.values(usedByType).reduce((sum, d) => sum + d, 0);

  res.json({
    annualAllowance: ANNUAL_LEAVE_ALLOWANCE,
    used: totalUsed,
    remaining: ANNUAL_LEAVE_ALLOWANCE - totalUsed,
    byType: usedByType,
  });
});

// GET /api/employee/leave/history
export const getHistory = asyncHandler(async (req, res) => {
  const requests = await LeaveRequest.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(requests);
});

// POST /api/employee/leave/apply
export const applyForLeave = asyncHandler(async (req, res) => {
  const { type, startDate, endDate, reason } = req.body;

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (end < start) {
    return res.status(400).json({ message: 'endDate must be on or after startDate' });
  }
  const days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

  const request = await LeaveRequest.create({
    userId: req.user.id,
    type,
    startDate: start,
    endDate: end,
    days,
    reason,
    status: 'pending',
  });

  res.status(201).json(request);
});

// GET /api/employee/leave/usage-chart
export const getUsageChart = asyncHandler(async (req, res) => {
  const approved = await LeaveRequest.find({ userId: req.user.id, status: 'approved' });

  const byMonth = {};
  approved.forEach((l) => {
    const key = l.startDate.toISOString().slice(0, 7); // "YYYY-MM"
    byMonth[key] = (byMonth[key] || 0) + l.days;
  });

  res.json(Object.entries(byMonth).map(([month, days]) => ({ month, days })));
});