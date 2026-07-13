import User from '../../models/User.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/admin/users?search=&role=
export const getUsers = asyncHandler(async (req, res) => {
  const { search, role, page = 1, limit = 20 } = req.query;

  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(filter)
      .populate('department', 'name')
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  res.json({ users, total, page: Number(page), limit: Number(limit) });
});

// POST /api/admin/users
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, title, department } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'A user with this email already exists' });
  }

  const user = await User.create({
    name,
    email,
    passwordHash: password, // hashed automatically by the User model's pre-save hook
    role,
    title,
    department,
  });

  res.status(201).json(user);
});

// PUT /api/admin/users/:id
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, title, department, role, isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { name, email, title, department, role, isActive } },
    { new: true, runValidators: true }
  );

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// PUT /api/admin/users/:id/permissions
// Assumes a `permissions` array/object field exists on User for fine-grained access control
// beyond the coarse `role` field. Add to the User schema if you need this level of granularity.
export const updatePermissions = asyncHandler(async (req, res) => {
  const { permissions } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { permissions } },
    { new: true, runValidators: true }
  );

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// DELETE /api/admin/users/:id
// Soft delete — deactivate rather than remove, to preserve historical records
// (attendance, payslips, reviews, etc. reference this user).
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { isActive: false } },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(204).send();
});