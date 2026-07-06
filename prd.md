# PRD — Admin Module
## Nexus HR — Employee Management System

**Owner:** Admin Portal
**Scope:** Admin-facing module only (Employee and HR/Manager flows are separate modules built by other owners, but share the same DB and design system)
**Stack:** Vite + React (frontend) · Express.js (backend) · MongoDB + Mongoose (database)

---

## 1. Product Summary

Nexus HR is a role-based HR platform with three portals: **Employee**, **HR/Manager**, and **Admin**. The Admin module gives the Admin/HR Manager a company-wide operational view and control surface — workforce stats, employee records, leave approvals, recruitment pipeline, department structure, and performance reviews.

This doc covers only the **Admin module**, its 6 screens, the data it needs, the APIs it calls, and a build order.

---

## 2. Tech Stack & Conventions

| Layer | Choice |
|---|---|
| Frontend | Vite + React 18, React Router, Recharts (charts), Tailwind CSS |
| State/data | React Query (TanStack Query) for server state, local `useState` for UI state |
| Backend | Express.js, REST API, `/api/admin/*` namespace |
| DB | MongoDB with Mongoose ODM |
| Auth | JWT-based, role field (`admin`, `hr_manager`, `employee`) gates routes |
| Validation | Joi or Zod on backend request bodies |

**Folder structure (frontend)**
```
src/
  pages/admin/
    Overview.jsx
    Employees.jsx
    LeaveApproval.jsx
    Recruitment.jsx
    Departments.jsx
    Performance.jsx
  components/admin/
    StatCard.jsx
    DeptBarChart.jsx
    HeadcountDonut.jsx
    EmployeeTable.jsx
    EmployeeProfileModal.jsx
    LeaveRequestCard.jsx
    JobOpeningCard.jsx
    PipelineFunnel.jsx
    DepartmentCard.jsx
    ReviewTable.jsx
  api/
    adminApi.js       // axios/fetch wrapper, one function per endpoint
```

**Folder structure (backend)**
```
server/
  models/
    Employee.js
    Department.js
    LeaveRequest.js
    JobOpening.js
    Candidate.js
    PerformanceReview.js
    AttendanceRecord.js
  routes/
    admin.overview.routes.js
    admin.employees.routes.js
    admin.leave.routes.js
    admin.recruitment.routes.js
    admin.departments.routes.js
    admin.performance.routes.js
  controllers/
    (mirrors routes, one controller file per resource)
  seed/
    seed.js          // populates dummy data for dev
```

---

## 3. Data Models (Mongoose — dummy/dev schemas)

These are intentionally simple for now; extend later with real validation, indexes, and refs as needed.

```js
// models/Department.js
const departmentSchema = new Schema({
  name: String,                 // "Engineering"
  headEmployeeId: { type: Schema.Types.ObjectId, ref: "Employee" },
  headName: String,             // denormalized for quick display
  employeeCount: { type: Number, default: 0 },
  budget: Number,               // in absolute currency units, e.g. 5200000
  openRoles: { type: Number, default: 0 },
}, { timestamps: true });
```

```js
// models/Employee.js
const employeeSchema = new Schema({
  name: String,
  email: String,
  employeeCode: String,          // "EMP-001"
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  role: String,                  // job title, e.g. "Senior Engineer"
  status: { type: String, enum: ["active", "on_leave", "terminated"], default: "active" },
  salary: Number,
  avatarInitials: String,        // "AC"
  joinedAt: Date,
  phone: String,
  address: String,
  reportsTo: { type: Schema.Types.ObjectId, ref: "Employee" },
}, { timestamps: true });
```

```js
// models/LeaveRequest.js
const leaveRequestSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
  type: { type: String, enum: ["annual", "sick", "personal", "unpaid"] },
  startDate: Date,
  endDate: Date,
  days: Number,
  reason: String,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  actionedBy: { type: Schema.Types.ObjectId, ref: "Employee" }, // who approved/rejected
  actionedAt: Date,
}, { timestamps: true });
```

```js
// models/JobOpening.js
const jobOpeningSchema = new Schema({
  title: String,                 // "Senior Frontend Engineer"
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  status: { type: String, enum: ["applied", "screening", "interviewing", "offer", "closed"], default: "applied" },
  postedAt: Date,
  candidateCount: { type: Number, default: 0 },
}, { timestamps: true });
```

```js
// models/Candidate.js
const candidateSchema = new Schema({
  name: String,
  jobOpening: { type: Schema.Types.ObjectId, ref: "JobOpening" },
  stage: { type: String, enum: ["applied", "screening", "interviewing", "offer", "rejected", "hired"] },
  appliedAt: Date,
}, { timestamps: true });
```

```js
// models/PerformanceReview.js
const performanceReviewSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "Employee" },
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  reviewer: { type: Schema.Types.ObjectId, ref: "Employee" },
  rating: Number,                 // e.g. 4.3, out of 5
  period: String,                 // "Q2 2024"
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
}, { timestamps: true });
```

```js
// models/AttendanceRecord.js
const attendanceRecordSchema = new Schema({
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  month: String,                  // "2024-06"
  avgAttendancePct: Number,       // 94.2
}, { timestamps: true });
```

---

## 4. Module Breakdown

### 4.1 Overview (`/admin/overview`)

**Purpose:** One-glance company health snapshot.

**Contains:**
1. 4 stat cards: Total Employees, Avg Attendance, Open Positions, Pending Leaves
2. Two charts side by side:
   - **Attendance by Department** — bar chart, one bar per department, hover tooltip shows exact %
   - **Headcount by Department** — donut chart, legend lists dept name + count
3. **Pending Leave Requests** list — each row: avatar, name, leave type, date range, days, reason, quick **Approve (✓)** / **Reject (✗)** icon buttons (same action as the full Leave Approval screen, just a fast path)

**API endpoints:**
```
GET /api/admin/overview/stats          → { totalEmployees, avgAttendancePct, openPositions, pendingLeaves }
GET /api/admin/overview/attendance     → [{ department, avgAttendancePct }]
GET /api/admin/overview/headcount      → [{ department, count }]
GET /api/admin/overview/pending-leaves → [{ id, employeeName, avatarInitials, type, startDate, endDate, days, reason }]
PATCH /api/admin/leave/:id/approve
PATCH /api/admin/leave/:id/reject
```

**Build steps:**
1. Build 4 `StatCard` components, fetch `/overview/stats`, render in a responsive 4-col grid.
2. Build `DeptBarChart` using Recharts `<BarChart>`, feed `/overview/attendance`.
3. Build `HeadcountDonut` using Recharts `<PieChart innerRadius>`, feed `/overview/headcount`, render legend below/beside.
4. Build `PendingLeaveRow` list, wire Approve/Reject buttons to PATCH endpoints, then invalidate/refetch stats + list on success (use React Query `invalidateQueries`).
5. Add loading skeletons for each card/chart while fetching.

---

### 4.2 Employees (`/admin/employees`)

**Purpose:** Full employee directory with search, filter, export, and profile management.

**Contains:**
- Search bar + **Filter** button (filter by department, status, role) + **Export** button (CSV/Excel of current filtered view)
- Table columns: Employee (avatar+name+email), ID, Department, Role, Status (active/on leave), Salary, Actions (view 👁, edit ✏, delete 🗑)
- **View** opens a read-only profile modal; **Edit** opens the same modal in edit mode
- "Add Employee" button (top right) opens a create form modal

**API endpoints:**
```
GET    /api/admin/employees?search=&department=&status=&page=&limit=
GET    /api/admin/employees/:id
POST   /api/admin/employees
PUT    /api/admin/employees/:id
DELETE /api/admin/employees/:id
GET    /api/admin/employees/export?format=csv&search=&department=&status=
```

**Build steps:**
1. Build `EmployeeTable` — fetch with query params bound to search input, filter dropdown, and pagination.
2. Debounce the search input (300ms) before firing the query.
3. Build `EmployeeProfileModal` — a single component with a `mode` prop (`"view" | "edit" | "create"`); view mode renders read-only fields, edit/create render a form (reuse form fields, gate with `mode`).
4. Wire delete with a confirm dialog before calling DELETE.
5. Export button triggers a `GET .../export` call, backend streams a CSV (use a lib like `json2csv`), frontend triggers file download via blob.
6. Status pill styling: green dot = Active, yellow dot = On Leave.

---

### 4.3 Leave Approval (`/admin/leave-approval`)

**Purpose:** Dedicated workflow to review, approve, or reject all leave requests, plus history.

**Contains:**
- 3 stat cards: Pending, Approved This Month, Rejected
- **Pending Requests** list — same card pattern as Overview but full detail (name, leave-type tag, date range, day count, reason, Approve/Reject buttons)
- **Recently Processed** table — Employee, Type, Dates, Days, Action (who actioned it), Status (approved/rejected pill)

**API endpoints:**
```
GET   /api/admin/leave/stats                  → { pending, approvedThisMonth, rejected }
GET   /api/admin/leave?status=pending
GET   /api/admin/leave?status=processed&limit=10
PATCH /api/admin/leave/:id/approve
PATCH /api/admin/leave/:id/reject
```

**Build steps:**
1. Build stat cards fetching `/leave/stats`.
2. Build `LeaveRequestCard` list for pending requests; on Approve/Reject, call PATCH, then optimistically remove the card from the pending list and refetch stats + processed table.
3. Build `Recently Processed` table sorted by `actionedAt desc`.
4. Store `actionedBy` on approve/reject (current logged-in admin) so the "Action" column shows who processed it (e.g. "S. Mitchell").

---

### 4.4 Recruitment (`/admin/recruitment`)

**Purpose:** Track open roles and candidate pipeline.

**Contains:**
- 4 stat cards: Open Roles, Total Candidates, Interviews This Week, Offers Extended
- **Active Job Openings** list — title, department · posted date, candidate count, status pill (Applied/Screening/Interviewing/Offer), **View** button
- **Candidate Pipeline** funnel — 4 stage counts: Applied, Screening, Interviewing, Offer
- "Post Job" button (top right) opens create-job-opening modal

**API endpoints:**
```
GET  /api/admin/recruitment/stats        → { openRoles, totalCandidates, interviewsThisWeek, offersExtended }
GET  /api/admin/recruitment/jobs         → [{ id, title, department, postedAt, candidateCount, status }]
GET  /api/admin/recruitment/jobs/:id     → job detail + candidate list
POST /api/admin/recruitment/jobs         → create job opening
GET  /api/admin/recruitment/pipeline     → { applied, screening, interviewing, offer }
```

**Build steps:**
1. Build stat cards.
2. Build `JobOpeningCard` list, status pill color-coded (blue=Interviewing, yellow=Screening, purple=Offer, gray=Applied).
3. Build "View" → navigates to a job detail view or opens a drawer/modal listing candidates for that job with stage-change controls (drag or dropdown to move candidate stage).
4. Build `PipelineFunnel` as 4 simple stat blocks (can upgrade to an actual funnel chart later).
5. "Post Job" modal → POST to `/recruitment/jobs`, refetch job list + stats.

---

### 4.5 Departments (`/admin/departments`)

**Purpose:** Org structure — teams, headcount, budget, open roles.

**Contains:**
- Grid of department cards (2 per row): dept icon, "N open" pill, name, "Head: <name>", 2 mini-stats (Employees count, Budget), **View Team** button, edit (pencil) icon
- "New Department" button (top right)

**API endpoints:**
```
GET    /api/admin/departments
GET    /api/admin/departments/:id/team    → list of employees in that dept
POST   /api/admin/departments
PUT    /api/admin/departments/:id
```

**Build steps:**
1. Build `DepartmentCard`, map over `/departments` response into a responsive 2-col grid.
2. "View Team" → navigates to Employees table pre-filtered by that department (reuse `EmployeeTable` with a `defaultFilter` prop), or opens a modal listing team members.
3. Edit icon opens an edit modal (name, head, budget) → PUT.
4. "New Department" opens create modal → POST, refetch list.

---

### 4.6 Performance (`/admin/performance`)

**Purpose:** Review cycle tracking and department rating trends.

**Contains:**
- 4 stat cards: Reviews Pending, Completed, Team Avg Rating, Next Cycle (date)
- **Department Average Ratings** bar chart (one bar per department, hover tooltip shows exact rating)
- **Recent Reviews** table — Employee, Department, Reviewer, Rating (star + number), Period, Status (completed/pending pill)

**API endpoints:**
```
GET /api/admin/performance/stats           → { reviewsPending, completed, teamAvgRating, nextCycleDate }
GET /api/admin/performance/dept-ratings    → [{ department, avgRating }]
GET /api/admin/performance/reviews?limit=  → [{ employee, department, reviewer, rating, period, status }]
```

**Build steps:**
1. Build stat cards.
2. Build bar chart (same `DeptBarChart` component reused from Overview, just different data/axis scale 3–5 instead of 0–100%).
3. Build `ReviewTable` with star-rating display (render ★ + numeric value) and status pill.
4. (Optional v2) Add a "Start Review Cycle" action that bulk-creates pending `PerformanceReview` docs for all employees.

---

## 5. Shared Components Reused Across Screens

| Component | Used in |
|---|---|
| `StatCard` | Overview, Leave Approval, Recruitment, Performance |
| `DeptBarChart` | Overview, Performance |
| Status/type pill (`<Pill color status />`) | Employees, Leave Approval, Recruitment, Performance |
| `EmployeeTable` (filterable) | Employees, Departments ("View Team") |
| Modal shell (`<Modal>`) | Employee profile, job creation, department creation, review detail |

Build the pill and modal shell **first** — nearly every screen depends on them.

---

## 6. Suggested Build Order

1. **Foundation:** Express server setup, Mongoose models, seed script with dummy data, base API response shape (`{ data, meta }`), auth middleware gating `/api/admin/*` to `role === "admin"` or `"hr_manager"`.
2. **Shared UI kit:** StatCard, Pill, Modal shell, Table shell, layout/sidebar nav.
3. **Overview** — simplest data shapes, sets the chart pattern you'll reuse everywhere.
4. **Departments** — small dataset, no modals with complex forms yet.
5. **Employees** — the heaviest screen (search, filter, export, modal, CRUD); build once, patterns reused elsewhere.
6. **Leave Approval** — reuses the leave-approval logic already stubbed in Overview.
7. **Recruitment** — introduces the pipeline/funnel visualization.
8. **Performance** — last, reuses the bar chart + table + pill patterns from everything before it.

---

## 7. Non-Functional Notes

- All list endpoints should support pagination (`page`, `limit`) even if the UI doesn't paginate yet — cheap to add now, expensive to retrofit.
- Keep chart data endpoints separate from stat-card endpoints (as shown above) so charts can be cached/refetched independently of fast-changing counts.
- Use optimistic UI updates for Approve/Reject actions (leave, candidate stage moves) so the interface feels instant; roll back on error.
- Seed script (`seed/seed.js`) should generate at least: 6 departments, ~100 employees, ~10 leave requests (mixed statuses), ~4 job openings with candidates across all pipeline stages, ~20 performance reviews — enough to make every chart and empty-state look realistic.