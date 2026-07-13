import Payslip from '../../models/Payslip.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/payroll/payslips
export const getPayslips = asyncHandler(async (req, res) => {
  const payslips = await Payslip.find({ userId: req.user.id }).sort({ period: -1 });
  res.json(payslips);
});

// GET /api/employee/payroll/payslips/:id
export const getPayslipById = asyncHandler(async (req, res) => {
  const payslip = await Payslip.findOne({ _id: req.params.id, userId: req.user.id });
  if (!payslip) return res.status(404).json({ message: 'Payslip not found' });
  res.json(payslip);
});

// GET /api/employee/payroll/ytd-summary
export const getYtdSummary = asyncHandler(async (req, res) => {
  const currentYear = new Date().getFullYear().toString();

  const payslips = await Payslip.find({
    userId: req.user.id,
    period: { $regex: `^${currentYear}` },
  }).sort({ period: 1 });

  const totalNetPay = payslips.reduce((sum, p) => sum + p.netPay, 0);
  const totalEarnings = payslips.reduce(
    (sum, p) => sum + p.earnings.reduce((s, e) => s + e.amount, 0),
    0
  );
  const totalDeductions = payslips.reduce(
    (sum, p) => sum + p.deductions.reduce((s, d) => s + d.amount, 0),
    0
  );

  res.json({
    year: currentYear,
    totalNetPay,
    totalEarnings,
    totalDeductions,
    trend: payslips.map((p) => ({ period: p.period, netPay: p.netPay })),
  });
});