import { verifyAccessToken } from '../utils/generateToken.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/Api-error.js';

// Verifies the Bearer access token and attaches the user to req.user
export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    throw new ApiError(401, 'Access token missing');
  }

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, 'Invalid or expired access token');
  }

  const user = await User.findById(payload.id);
  if (!user || !user.isActive) {
    throw new ApiError(401, 'User not found or inactive');
  }

  req.user = user;
  next();
});

// Usage: router.get('/admin/x', verifyJWT, requireRole('admin'), handler)
export const requireRole = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, 'You do not have permission to perform this action');
  }
  next();
};