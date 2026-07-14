import { Router } from "express";
import { verifyJWT, requireRole } from "../middleware/auth.middleware.js";

import {
  getAnalytics,
  getEmployeeGrowth,
  getPayrollCost,
  getSystemHealth,
} from "../controllers/admin/Analytics.controller.js";
import { getAuditLogs } from "../controllers/admin/Auditlogs.controller.js";
import {
  getPayrollRuns,
  runPayroll,
  getPayrollRunById,
} from "../controllers/admin/Payroll.controller.js";
import { getReport } from "../controllers/admin/Reports.controller.js";
import {
  getUsers,
  createUser,
  updateUser,
  updatePermissions,
  deleteUser,
} from "../controllers/admin/Usermanagement.controller.js";

const router = Router();

// Every admin route requires a valid token AND the 'admin' role
router.use(verifyJWT, requireRole("admin"));

router.get("/analytics", getAnalytics);
router.get("/analytics/employee-growth", getEmployeeGrowth);
router.get("/analytics/payroll-cost", getPayrollCost);
router.get("/analytics/system-health", getSystemHealth);

router.get("/audit-logs", getAuditLogs);

router.get("/payroll/runs", getPayrollRuns);
router.post("/payroll/runs", runPayroll);
router.get("/payroll/runs/:id", getPayrollRunById);

router.get("/reports", getReport);

router.get("/users", getUsers);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.patch("/users/:id/permissions", updatePermissions);
router.delete("/users/:id", deleteUser);

// NOTE: admin/Systemsettings.controller.js currently duplicates Reports.controller.js
// (exports getReport, not real settings logic) — needs to be rewritten before a
// /settings route can be added here.

export default router;
