// Dev-friendly in-memory OTP store, keyed by "email:role".
// Swap this for Redis (with TTL) once you move past local dev / single-instance deploys.
const store = new Map();

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const setOtp = (key, otp) => {
  store.set(key, { otp, expiresAt: Date.now() + OTP_TTL_MS });
};

export const verifyOtp = (key, otp) => {
  const entry = store.get(key);
  if (!entry) return false;
  const isValid = entry.otp === otp && entry.expiresAt > Date.now();
  if (isValid) store.delete(key); // one-time use
  return isValid;
};

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits