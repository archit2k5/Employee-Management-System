import { Router } from "express";
import { verifyJWT, requireRole } from "../middleware/auth.middleware.js";

import { getOverview } from "../controllers/hr/Overview.controller.js";
import {
  getEmployees,
  getEmployeeById,
} from "../controllers/hr/Employees.controller.js";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
} from "../controllers/hr/Departments.controller.js";
import {
  getLeaveRequests,
  approveLeaveRequest,
  rejectLeaveRequest,
} from "../controllers/hr/Leaveapproval.controller.js";
import {
  getReviews,
  createReview,
} from "../controllers/hr/Performance.controller.js";
import {
  getOpenings,
  createOpening,
  getCandidates,
  updateCandidateStage,
} from "../controllers/hr/Recruitment.controller.js";

const router = Router();

// Every HR route requires a valid token AND the 'hr' (or 'admin') role
router.use(verifyJWT, requireRole("hr", "admin"));

router.get("/overview", getOverview);

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);

router.get("/departments", getDepartments);
router.post("/departments", createDepartment);
router.patch("/departments/:id", updateDepartment);

router.get("/leave-requests", getLeaveRequests);
router.patch("/leave-requests/:id/approve", approveLeaveRequest);
router.patch("/leave-requests/:id/reject", rejectLeaveRequest);

router.get("/performance/reviews", getReviews);
router.post("/performance/reviews", createReview);

router.get("/recruitment/openings", getOpenings);
router.post("/recruitment/openings", createOpening);
router.get("/recruitment/candidates", getCandidates);
router.patch("/recruitment/candidates/:id/stage", updateCandidateStage);

export default router;
