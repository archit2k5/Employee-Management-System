import Department from '../../models/Department.js';
import User from '../../models/User.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/hr/departments
export const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find().populate('leadId', 'name avatarUrl title');
  res.json(departments);
});

// POST /api/hr/departments
export const createDepartment = asyncHandler(async (req, res) => {
  const { name, leadId } = req.body;

  const department = await Department.create({ name, leadId, headcount: 0 });
  res.status(201).json(department);
});

// PUT /api/hr/departments/:id
export const updateDepartment = asyncHandler(async (req, res) => {
  const { name, leadId } = req.body;

  const department = await Department.findByIdAndUpdate(
    req.params.id,
    { $set: { name, leadId } },
    { new: true, runValidators: true }
  );

  if (!department) return res.status(404).json({ message: 'Department not found' });

  // Keep headcount accurate based on actual assigned users, rather than trusting client input.
  department.headcount = await User.countDocuments({ department: department._id, isActive: true });
  await department.save();

  res.json(department);
});