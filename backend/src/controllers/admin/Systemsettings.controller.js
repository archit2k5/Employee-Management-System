import User from '../../models/User.js';
import Attendance from '../../models/Attendance.js';
import Payslip from '../../models/Payslip.js';
import Department from '../../models/Department.js';
import asyncHandler from '../../utils/asyncHandler.js';

const getHeadcountReport = async () => {
  const departments = await Department.find();
  return departments.map((d) => ({ department: d.name, headcount: d.headcount }));
};

const getAttritionReport = async () => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

  const deactivated = await User.find({
    isActive: false,
    updatedAt: { $gte: twelveMonthsAgo },
  }).select('updatedAt');

  const byMonth = {};
  deactivated.forEach((u) => {
    const key = u.updatedAt.toISOString().slice(0, 7);
    byMonth[key] = (byMonth[key] || 0) + 1;
  });

  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => ({ month, count }));
};

const getPayrollReport = async () => {
  const payslips = await Payslip.find();
  const byMonth = {};
  payslips.forEach((p) => {
    byMonth[p.period] = (byMonth[p.period] || 0) + p.netPay;
  });

  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([period, total]) => ({ period, total }));
};

const getAttendanceReport = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const records = await Attendance.find({ date: { $gte: sixMonthsAgo } });
  const byMonth = {};
  records.forEach((r) => {
    const key = r.date.toISOString().slice(0, 7);
    byMonth[key] = byMonth[key] || { present: 0, total: 0 };
    byMonth[key].total += 1;
    if (r.status === 'present') byMonth[key].present += 1;
  });

  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { present, total }]) => ({
      month,
      attendancePercent: total ? Math.round((present / total) * 1000) / 10 : 0,
    }));
};

// Diversity reporting needs demographic fields not in the current User model (e.g. gender,
// age band) — these are sensitive fields that should be opt-in and access-controlled
// separately. Stubbed until that data collection is designed.
const getDiversityReport = async () => {
  return { message: 'Diversity reporting requires additional demographic fields on User.' };
};

// GET /api/admin/reports?tab=headcount|attrition|payroll|attendance|diversity
export const getReport = asyncHandler(async (req, res) => {
  const { tab = 'headcount' } = req.query;

  const reportMap = {
    headcount: getHeadcountReport,
    attrition: getAttritionReport,
    payroll: getPayrollReport,
    attendance: getAttendanceReport,
    diversity: getDiversityReport,
  };

  const handler = reportMap[tab];
  if (!handler) {
    return res.status(400).json({ message: `Unknown report tab: ${tab}` });
  }

  const data = await handler();
  res.json({ tab, data });
});