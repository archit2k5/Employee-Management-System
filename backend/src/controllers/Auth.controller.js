import crypto from 'crypto';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/generateToken.js';
import { setOtp, verifyOtp as checkOtp, generateOtp } from '../utils/otpStore.js';

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email, role, isActive: true }).select('+passwordHash');
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials or role' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials or role' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken, user });
});

// POST /api/auth/login/otp/request
export const requestOtp = asyncHandler(async (req, res) => {
  const { email, role } = req.body;

  const user = await User.findOne({ email, role, isActive: true });
  if (!user) {
    return res.status(404).json({ message: 'No account found for this email/role' });
  }

  const otp = generateOtp();
  setOtp(`${email}:${role}`, otp);

  // TODO: wire up real email/SMS delivery. Logging for dev visibility only.
  console.log(`[OTP] ${email} (${role}): ${otp}`);

  res.json({ message: 'OTP sent' });
});

// POST /api/auth/login/otp/verify
export const verifyOtpAndLogin = asyncHandler(async (req, res) => {
  const { email, otp, role } = req.body;

  const isValid = checkOtp(`${email}:${role}`, otp);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  const user = await User.findOne({ email, role, isActive: true });
  if (!user) {
    return res.status(404).json({ message: 'No account found for this email/role' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({ accessToken, refreshToken, user });
});

// POST /api/auth/refresh
export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'refreshToken is required' });
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }

  const user = await User.findById(payload.id);
  if (!user || !user.isActive) {
    return res.status(401).json({ message: 'User not found or inactive' });
  }

  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
});

// POST /api/auth/logout
export const logout = asyncHandler(async (_req, res) => {
  // Stateless JWT: logout is handled client-side by discarding tokens.
  // If you maintain a refresh-token allowlist/blocklist, revoke it here.
  res.json({ message: 'Logged out' });
});

// POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  // Always respond 200 regardless of whether the user exists, to avoid email enumeration.
  if (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    // TODO: persist a hashed version of resetToken + expiry on the user, and email the link.
    console.log(`[Password reset] ${email}: ${resetToken}`);
  }

  res.json({ message: 'If that email exists, a reset link has been sent' });
});

// POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  // TODO: look up the user by the hashed reset token and check expiry.
  // Left as a stub — wire up once the reset-token field is added to the User model.
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'token and newPassword are required' });
  }

  res.json({ message: 'Password reset successful' });
});

// GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});