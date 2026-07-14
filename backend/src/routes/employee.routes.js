import { Router } from "express";
import { verifyJWT, requireRole } from "../middleware/auth.middleware.js";

import { getDashboard } from "../controllers/employee/Dashboard.controller.js";
import {
  getAttendance,
  checkIn,
  checkOut,
  getCalendar,
  getHistory as getAttendanceHistory,
} from "../controllers/employee/Attendance.controller.js";
import {
  getBalance,
  getHistory as getLeaveHistory,
  applyForLeave,
  getUsageChart,
} from "../controllers/employee/Leave.controller.js";
import {
  getPayslips,
  getPayslipById,
  getYtdSummary,
} from "../controllers/employee/Payroll.controller.js";
import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../controllers/employee/Task.controller.js";
import {
  getReviews,
  getGoals,
  updateGoal,
} from "../controllers/employee/Performance.controller.js";
import {
  getProfile,
  updatePersonal,
  updateEmployment,
  getSkills,
  updateSkills,
  getProfileDocuments,
  updateEmergencyContact,
} from "../controllers/employee/Profile.controller.js";
import {
  getAccountSettings,
  updateAccountSettings,
  updateSecurity,
  getSessions,
  revokeSession,
  updateNotificationSettings,
  updateAppearance,
  updateLanguage,
} from "../controllers/employee/Settings.controller.js";
import {
  getThreads,
  getMessages,
  sendMessage,
} from "../controllers/employee/Chat.controller.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/employee/Notification.controller.js";
import {
  getCourses,
  updateCourseProgress,
} from "../controllers/employee/Training.controller.js";
import {
  getDocuments,
  uploadDocument,
  downloadDocument,
} from "../controllers/employee/Document.controller.js";

const router = Router();

// Every employee route requires a valid token; 'employee' role (adjust if you
// want admins/HR to also access their own employee-style views)
router.use(verifyJWT, requireRole("employee", "hr", "admin"));

router.get("/dashboard", getDashboard);

router.get("/attendance", getAttendance);
router.post("/attendance/check-in", checkIn);
router.post("/attendance/check-out", checkOut);
router.get("/attendance/calendar", getCalendar);
router.get("/attendance/history", getAttendanceHistory);

router.get("/leave/balance", getBalance);
router.get("/leave/history", getLeaveHistory);
router.post("/leave/apply", applyForLeave);
router.get("/leave/usage-chart", getUsageChart);

router.get("/payroll/payslips", getPayslips);
router.get("/payroll/payslips/:id", getPayslipById);
router.get("/payroll/ytd-summary", getYtdSummary);

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.patch("/tasks/:id/status", updateTaskStatus);
router.delete("/tasks/:id", deleteTask);

router.get("/performance/reviews", getReviews);
router.get("/performance/goals", getGoals);
router.patch("/performance/goals/:id", updateGoal);

router.get("/profile", getProfile);
router.patch("/profile/personal", updatePersonal);
router.patch("/profile/employment", updateEmployment);
router.get("/profile/skills", getSkills);
router.patch("/profile/skills", updateSkills);
router.get("/profile/documents", getProfileDocuments);
router.patch("/profile/emergency-contact", updateEmergencyContact);

router.get("/settings/account", getAccountSettings);
router.patch("/settings/account", updateAccountSettings);
router.patch("/settings/security", updateSecurity);
router.get("/settings/sessions", getSessions);
router.delete("/settings/sessions/:id", revokeSession);
router.patch("/settings/notifications", updateNotificationSettings);
router.patch("/settings/appearance", updateAppearance);
router.patch("/settings/language", updateLanguage);

router.get("/chat/threads", getThreads);
router.get("/chat/threads/:id/messages", getMessages);
router.post("/chat/threads/:id/messages", sendMessage);

router.get("/notifications", getNotifications);
router.patch("/notifications/:id/read", markAsRead);
router.patch("/notifications/read-all", markAllAsRead);

router.get("/training/courses", getCourses);
router.patch("/training/courses/:id/progress", updateCourseProgress);

router.get("/documents", getDocuments);
router.post("/documents", uploadDocument);
router.get("/documents/:id/download", downloadDocument);

export default router;
