import Attendance from '../../models/Attendance.js';
import Task from '../../models/Task.js';
import LeaveRequest from '../../models/LeaveRequest.js';
import Payslip from '../../models/Payslip.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/dashboard
export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [attendanceRecords, tasks, latestPayslip, leaveRequests] = await Promise.all([
    Attendance.find({ userId, date: { $gte: sixMonthsAgo } }).sort({ date: 1 }),
    Task.find({ userId }),
    Payslip.findOne({ userId }).sort({ period: -1 }),
    LeaveRequest.find({ userId, status: 'approved' }),
  ]);

  const presentDays = attendanceRecords.filter((a) => a.status === 'present').length;
  const attendancePercent = attendanceRecords.length
    ? Math.round((presentDays / attendanceRecords.length) * 100)
    : 0;

  const tasksDone = tasks.filter((t) => t.status === 'done').length;
  const daysUsed = leaveRequests.reduce((sum, l) => sum + l.days, 0);
  const annualLeaveAllowance = 24; // TODO: move to a company policy config
  const leaveBalance = annualLeaveAllowance - daysUsed;

  // Group attendance into monthly buckets for the chart
  const monthlyBuckets = {};
  attendanceRecords.forEach((record) => {
    const key = record.date.toISOString().slice(0, 7); // "YYYY-MM"
    monthlyBuckets[key] = (monthlyBuckets[key] || 0) + (record.status === 'present' ? 1 : 0);
  });

  res.json({
    stats: {
      attendancePercent,
      tasksDone: { done: tasksDone, total: tasks.length },
      leaveBalance,
      netSalary: latestPayslip?.netPay ?? null,
    },
    attendanceChart: Object.entries(monthlyBuckets).map(([month, count]) => ({ month, count })),
    quickActions: [
      { label: 'Apply for Leave', href: '/employee/leave' },
      { label: 'Download Payslip', href: '/employee/payroll' },
      { label: 'View Tasks', href: '/employee/tasks' },
      { label: 'Update Profile', href: '/employee/profile' },
      { label: 'Open Chat', href: '/employee/chat' },
    ],
  });
});