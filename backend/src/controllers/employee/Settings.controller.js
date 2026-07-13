import User from '../../models/User.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/settings/account
export const getAccountSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('name email avatarUrl');
  res.json(user);
});

// PUT /api/employee/settings/account
export const updateAccountSettings = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name, email } },
    { new: true, runValidators: true }
  );

  res.json(user);
});

// PUT /api/employee/settings/security  (2FA toggle)
export const updateSecurity = asyncHandler(async (req, res) => {
  const { twoFactorEnabled } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { twoFactorEnabled } },
    { new: true }
  );

  res.json({ twoFactorEnabled: user.twoFactorEnabled });
});

// GET /api/employee/settings/sessions
// Requires a Session model/refresh-token allowlist to list real active sessions.
// Stubbed here — wire up once session tracking is added.
export const getSessions = asyncHandler(async (_req, res) => {
  res.json([]);
});

// DELETE /api/employee/settings/sessions/:id
export const revokeSession = asyncHandler(async (req, res) => {
  // TODO: remove the session/refresh token matching req.params.id from the store.
  res.json({ message: `Session ${req.params.id} revoked` });
});

// PUT /api/employee/settings/notifications
// Assumes a `notificationPreferences` object field on User (add to schema if not present).
export const updateNotificationSettings = asyncHandler(async (req, res) => {
  const preferences = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { notificationPreferences: preferences } },
    { new: true }
  );

  res.json(user.notificationPreferences ?? preferences);
});

// PUT /api/employee/settings/appearance
export const updateAppearance = asyncHandler(async (req, res) => {
  const { theme } = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, { $set: { theme } }, { new: true });
  res.json({ theme: user.theme });
});

// PUT /api/employee/settings/language
export const updateLanguage = asyncHandler(async (req, res) => {
  const { language } = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, { $set: { language } }, { new: true });
  res.json({ language: user.language });
});