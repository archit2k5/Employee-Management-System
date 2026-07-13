import User from '../../models/User.js';
import Document from '../../models/Document.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('department', 'name');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// PUT /api/employee/profile/personal
export const updatePersonal = asyncHandler(async (req, res) => {
  const { name, avatarUrl } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name, avatarUrl } },
    { new: true, runValidators: true }
  );
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// PUT /api/employee/profile/employment
// Employment/compensation fields are admin/HR-controlled — employees can view but not self-edit
// most of this, so this endpoint only allows non-sensitive fields (extend as needed).
export const updateEmployment = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { title } },
    { new: true, runValidators: true }
  );
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// GET /api/employee/profile/skills
// Skills/certifications aren't in the core User schema yet — this assumes a `skills` array
// field has been added to User (see note in models). Returns [] gracefully until then.
export const getSkills = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('skills');
  res.json(user?.skills ?? []);
});

// PUT /api/employee/profile/skills
export const updateSkills = asyncHandler(async (req, res) => {
  const { skills } = req.body; // [{ name, progress, certifications: [] }]

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { skills } },
    { new: true, runValidators: true }
  );
  res.json(user?.skills ?? []);
});

// GET /api/employee/profile/documents
export const getProfileDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ ownerId: req.user.id }).sort({ uploadedAt: -1 });
  res.json(documents);
});

// PUT /api/employee/profile/emergency-contact
// Assumes an `emergencyContact` sub-object field has been added to User.
export const updateEmergencyContact = asyncHandler(async (req, res) => {
  const { name, relationship, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { emergencyContact: { name, relationship, phone } } },
    { new: true, runValidators: true }
  );
  res.json(user);
});