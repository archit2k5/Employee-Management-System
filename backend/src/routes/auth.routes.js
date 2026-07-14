import { Router } from "express";
import {
  login,
  requestOtp,
  verifyOtpAndLogin,
  refresh,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
} from "../controllers/Auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/login/otp/request", requestOtp);
router.post("/login/otp/verify", verifyOtpAndLogin);
router.post("/refresh", refresh);
router.post("/logout", verifyJWT, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", verifyJWT, getMe);

export default router;
