import User from '../../models/User.js';
import Payslip from '../../models/Payslip.js';
import AuditLog from '../../models/AuditLog.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/admin/payroll/runs
// A "run" here is represented as a distinct `period` across all payslips.
export const getPayrollRuns = asyncHandler(async (req, res) => {
  const runs = await Payslip.aggregate([
    {
      $group: {
        _id: '$period',
        totalNetPay: { $sum: '$netPay' },
        employeeCount: { $sum: 1 },
        generatedAt: { $max: '$generatedAt' },
      },
    },
    { $sort: { _id: -1 } },
  ]);

  res.json(runs.map((r) => ({ period: r._id, ...r, _id: undefined })));
});

// POST /api/admin/payroll/runs  (trigger payroll processing)
// Simplified: generates a flat payslip per active employee for the given period,
// using a placeholder base salary. Replace with real compensation data once available.
export const runPayroll = asyncHandler(async (req, res) => {
  const { period } = req.body; // "YYYY-MM"

  if (!period) {
    return res.status(400).json({ message: 'period is required, e.g. "2024-07"' });
  }

  const existing = await Payslip.findOne({ period });
  if (existing) {
    return res.status(409).json({ message: `Payroll for ${period} has already been run` });
  }

  const employees = await User.find({ role: 'employee', isActive: true });

  const payslips = await Payslip.insertMany(
    employees.map((emp) => ({
      userId: emp._id,
      period,
      earnings: [{ label: 'Base Salary', amount: 5000 }], // TODO: pull real compensation
      deductions: [{ label: 'Tax', amount: 500 }],
      netPay: 4500,
      generatedAt: new Date(),
    }))
  );

  await AuditLog.create({
    actorId: req.user.id,
    action: 'payroll.run',
    severity: 'info',
    meta: { period, employeeCount: payslips.length },
  });

  res.status(201).json({ period, employeeCount: payslips.length });
});

// GET /api/admin/payroll/runs/:id
// :id is the period string (e.g. "2024-07").
export const getPayrollRunById = asyncHandler(async (req, res) => {
  const { id: period } = req.params;

  const payslips = await Payslip.find({ period }).populate('userId', 'name email title');
  if (!payslips.length) return res.status(404).json({ message: 'Payroll run not found' });

  res.json({
    period,
    totalNetPay: payslips.reduce((sum, p) => sum + p.netPay, 0),
    payslips,
  });
});