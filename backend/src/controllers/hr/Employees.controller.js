import User from '../../models/User.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/hr/employees?search=&department=&page=
export const getEmployees = asyncHandler(async (req, res) => {
  const { search, department, page = 1, limit = 20 } = req.query;

  const filter = { role: 'employee' };
  if (department) filter.department = department;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const [employees, total] = await Promise.all([
    User.find(filter)
      .populate('department', 'name')
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  res.json({ employees, total, page: Number(page), limit: Number(limit) });
});

// GET /api/hr/employees/:id
export const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await User.findOne({ _id: req.params.id, role: 'employee' }).populate(
    'department',
    'name'
  );

  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
});