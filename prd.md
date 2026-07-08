# Nexus HR — Employee Management System
## Product Requirements Document (PRD)

**Version:** 1.0
**Status:** Draft
**Source:** Figma design — "Employee Management System" (Nexus Technologies)

---

## 1. Overview

Nexus HR is a role-based workforce management platform with three portals — **Employee**, **HR**, and **Admin** — sharing a single design system and authentication layer. Users sign in through one login screen and are routed into the portal that matches their role.

### 1.1 Goals
- Give employees self-service access to attendance, leave, payroll, tasks, and performance data.
- Give HR a single place to manage the workforce: approvals, recruitment, departments, reviews.
- Give Admins system-level control: analytics, user/permission management, payroll processing, audit logs.
- One shared UI kit (dark theme, card-based dashboards, consistent charts) across all three portals.

### 1.2 Non-goals (v1)
- Native mobile apps (web-responsive only).
- Multi-tenant / multi-company support (single organization: "Nexus Technologies").
- Payroll tax computation engine (payroll data is entered/imported, not calculated from scratch).

---

## 2. Users & Roles

| Role | Portal | Example user (from design) |
|---|---|---|
| Employee | Employee Portal | Alex Chen, Senior Engineer |
| HR Manager | HR Portal | Sarah Mitchell, HR Manager |
| System Admin | Admin Portal | James Rodriguez, System Admin |

Role is selected at login (Employee / HR / Admin toggle) and determines the sidebar, dashboard, and permitted routes. Role changes should be admin-assignable, not self-service.

---

## 3. Auth Flow

- **Login screen:** split layout — left branding panel ("People-first workforce platform" + live stat cards: Employees, Departments, Open Roles, Uptime), right form panel.
- **Role selector:** segmented control — Employee / HR / Admin.
- **Auth method tabs:** Password / OTP.
  - Password: email + password field, show/hide toggle, "Forgot password?" link.
  - OTP: digit-input boxes, resend timer.
- **Session timeout screen:** shown when a session expires; re-auth without losing return-to route.
- **Post-login routing:** role → default portal dashboard.

**Acceptance criteria**
- Wrong role/credential combo shows inline error, not a silent redirect.
- OTP inputs auto-advance focus and support paste-to-fill.
- Session timeout preserves the last route in a `redirect` param.

---

## 4. Employee Portal (12 modules)

1. **Dashboard** — greeting banner with date, "Check In" / "My Tasks" CTAs, 4 stat cards (Attendance %, Tasks Done, Leave Balance, Net Salary), 6-month attendance bar chart, Quick Actions list (Apply for Leave, Download Payslip, View Tasks, Update Profile, Open Chat).
2. **Profile** — 5 tabs: Personal (editable form), Employment (role/comp details), Skills (progress bars + certifications), Documents, Emergency Contact.
3. **Attendance** — animated check-in card with toggle, monthly calendar grid, history table.
4. **Leave** — balance cards with progress bars, history table, usage bar chart, apply modal with date pickers.
5. **Payroll** — payslip detail (earnings/deductions), net pay, YTD summary, area trend chart.
6. **Tasks** — List view (filterable) ↔ Kanban board (draggable columns) toggle.
7. **Performance** — rating cards, score progress bars, goals tracker with completion states, review history table.
8. **Chat** — contacts/thread split layout, typing indicator, message bubbles.
9. **Notifications** — type-filter tabs, unread indicators, left-border accent for unread.
10. **Training** — course cards with progress bars and status badges.
11. **Documents** — file list with preview/download actions.
12. **Settings** — 5 tabs: Account, Security (2FA, active sessions), Notifications (toggles), Appearance (theme toggle), Language.

---

## 5. HR Portal (6 modules)

1. **Overview** — 4 stat cards (Total Employees, Avg Attendance, Open Positions, Pending Leaves), Attendance-by-Department bar chart, Headcount-by-Department donut chart, Pending Leave Requests list with approve/reject actions.
2. **Employees** — searchable/filterable table, profile modal on row click.
3. **Leave Approval** — request queue / workflow with approve, reject, and comment.
4. **Recruitment** — pipeline board (stages: e.g. Applied → Interview → Offer → Hired).
5. **Departments** — department cards (headcount, lead, open roles).
6. **Performance** — review cycles, aggregate scores.

---

## 6. Admin Portal (6 modules)

1. **Analytics** — 4 stat cards (Total Headcount, Monthly Payroll, Avg Tenure, Retention Rate), Employee Growth combo chart (bars + trend line), Payroll Cost area chart, System Health panel (API Server, Database, Auth Service, Storage — status badges: healthy / degraded).
2. **User Management** — user list + permissions matrix (role-based access control).
3. **Payroll** — processing/run payroll workflow, adjustments.
4. **Reports** — 5 chart tabs (e.g. Headcount, Attrition, Payroll, Attendance, Diversity).
5. **System Settings** — org-level configuration.
6. **Audit Logs** — event log with severity filtering (info / warning / critical).

---

## 7. Shared Design System

- **Theme:** dark-first UI, light theme toggle available in Settings/Appearance.
- **Layout shell:** fixed left sidebar (portal-specific nav), top bar (search, theme toggle, notifications bell, user avatar + name/role), main content area.
- **Components to build once, reuse everywhere:**
  - Stat card (icon, label, value, sublabel)
  - Bar / line / area / donut chart wrapper (consistent axis, tooltip, and color tokens)
  - Data table (sortable, filterable, paginated)
  - Modal (form modal, confirm modal, profile modal)
  - Badge (status: healthy/degraded, unread, leave type, severity)
  - Tabs
  - Progress bar
  - Kanban column/card
  - Toast/notification
- **Design tokens:** color palette (dark bg, accent blue/orange/purple/pink/green per chart series), typography scale, spacing scale, border radius — extract these into a single tokens file so all three portals stay visually consistent.

---

## 8. Data Model (Mongoose schemas, high level)

```js
User {
  _id, name, email, passwordHash, role: [employee|hr|admin],
  avatarUrl, title, department, managerId: ObjectId(User),
  twoFactorEnabled, theme: [dark|light], language,
  createdAt, updatedAt
}

Attendance {
  _id, userId: ObjectId(User), date, checkIn, checkOut,
  status: [present|absent|half_day|leave]
}

LeaveRequest {
  _id, userId: ObjectId(User), type: [annual|sick|unpaid|...],
  startDate, endDate, days, reason,
  status: [pending|approved|rejected], approverId: ObjectId(User)
}

Payslip {
  _id, userId: ObjectId(User), period, earnings: [{ label, amount }],
  deductions: [{ label, amount }], netPay, generatedAt
}

Task {
  _id, userId: ObjectId(User), title, description,
  status: [todo|in_progress|done], priority, dueDate
}

PerformanceReview {
  _id, userId: ObjectId(User), cycle, score,
  goals: [{ title, status, completion }],
  reviewerId: ObjectId(User), notes
}

Document {
  _id, ownerId: ObjectId(User), name, type, url, uploadedAt
}

Notification {
  _id, userId: ObjectId(User), type, message, read: Boolean, createdAt
}

ChatMessage {
  _id, threadId: ObjectId(ChatThread), senderId: ObjectId(User), body, sentAt
}

ChatThread {
  _id, participantIds: [ObjectId(User)], updatedAt
}

Department {
  _id, name, headcount, leadId: ObjectId(User)
}

JobOpening {
  _id, title, department, stage: [applied|interview|offer|hired],
  candidates: [{ name, email, stage }]
}

AuditLog {
  _id, actorId: ObjectId(User), action, severity: [info|warning|critical],
  meta: Object, timestamp
}
```

This is the contract your frontend and backend teams agree on before building — treat it as a living doc, and mirror it 1:1 into `src/models/`.

---

## 9. Tech Stack — MERN

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + TypeScript + Vite | Fast dev loop, matches component-driven design |
| Styling | Tailwind CSS + shared token file | Matches dark-theme card UI, keeps 3 portals visually consistent |
| Charts | Recharts | Covers bar/line/area/donut/combo out of the box |
| State/data | TanStack Query + Zustand | Server cache + light client state |
| Routing | React Router (nested routes per portal) | Matches sidebar-driven navigation |
| Backend | Node.js + Express | Matches your standard backend structure |
| Database | MongoDB + Mongoose | Document model fits nested structures like payslips/goals well |
| Auth | JWT (access + refresh tokens), role claim in token, bcrypt for password hashing | Matches role-based routing/login |
| Realtime (Chat/Notifications) | Socket.IO | Needed for chat + live notification badges |
| Validation | Joi or Zod (in `validators/`) | Keeps request validation out of controllers |
| Infra | Docker Compose (dev), CI via GitHub Actions | Reproducible local setup for a multi-person team |

---

## 10. Backend Structure

Following your usual convention:

```
server/
├── public/                     # static assets (uploaded docs/avatars if not using S3)
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── employee/
│   │   │   ├── dashboard.controller.js
│   │   │   ├── profile.controller.js
│   │   │   ├── attendance.controller.js
│   │   │   ├── leave.controller.js
│   │   │   ├── payroll.controller.js
│   │   │   ├── task.controller.js
│   │   │   ├── performance.controller.js
│   │   │   ├── chat.controller.js
│   │   │   ├── notification.controller.js
│   │   │   ├── training.controller.js
│   │   │   ├── document.controller.js
│   │   │   └── settings.controller.js
│   │   ├── hr/
│   │   │   ├── overview.controller.js
│   │   │   ├── employees.controller.js
│   │   │   ├── leaveApproval.controller.js
│   │   │   ├── recruitment.controller.js
│   │   │   ├── departments.controller.js
│   │   │   └── performance.controller.js
│   │   └── admin/
│   │       ├── analytics.controller.js
│   │       ├── userManagement.controller.js
│   │       ├── payroll.controller.js
│   │       ├── reports.controller.js
│   │       ├── systemSettings.controller.js
│   │       └── auditLogs.controller.js
│   ├── db/
│   │   └── connect.js          # mongoose connection
│   ├── middleware/
│   │   ├── auth.middleware.js       # verify JWT
│   │   ├── role.middleware.js       # requireRole('hr'|'admin'|'employee')
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js     # multer, for documents/avatars
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── LeaveRequest.js
│   │   ├── Payslip.js
│   │   ├── Task.js
│   │   ├── PerformanceReview.js
│   │   ├── Document.js
│   │   ├── Notification.js
│   │   ├── ChatMessage.js
│   │   ├── ChatThread.js
│   │   ├── Department.js
│   │   ├── JobOpening.js
│   │   └── AuditLog.js
│   ├── routes/
│   │   ├── index.js             # mounts all route files
│   │   ├── auth.routes.js
│   │   ├── employee/            # one file per module (see §11)
│   │   ├── hr/
│   │   └── admin/
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── asyncHandler.js
│   │   └── logger.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── employee/
│   │   ├── hr/
│   │   └── admin/
│   └── app.js
├── server.js
└── .env
```

**Route file → controller → model mapping stays 1:1 per module**, so Track B/C/D (see collaboration guide) each work inside their own `controllers/{portal}/`, `routes/{portal}/`, `validators/{portal}/` folder without touching each other's files.

---

## 11. API Routes

All routes are prefixed `/api`. All routes except `/api/auth/*` require `auth.middleware` (valid JWT); portal-specific routes also require `role.middleware`.

### Auth — `/api/auth`
```
POST   /api/auth/login              # { email, password, role } -> { accessToken, refreshToken, user }
POST   /api/auth/login/otp/request  # { email, role } -> sends OTP
POST   /api/auth/login/otp/verify   # { email, otp, role } -> { accessToken, refreshToken, user }
POST   /api/auth/refresh            # { refreshToken } -> { accessToken }
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me                 # current user from token
```

### Employee Portal — `/api/employee`  (role: employee)
```
GET    /api/employee/dashboard                 # stat cards + attendance chart + quick actions data

GET    /api/employee/profile
PUT    /api/employee/profile/personal
PUT    /api/employee/profile/employment
GET    /api/employee/profile/skills
PUT    /api/employee/profile/skills
GET    /api/employee/profile/documents
PUT    /api/employee/profile/emergency-contact

GET    /api/employee/attendance
POST   /api/employee/attendance/check-in
POST   /api/employee/attendance/check-out
GET    /api/employee/attendance/calendar?month=&year=
GET    /api/employee/attendance/history

GET    /api/employee/leave/balance
GET    /api/employee/leave/history
POST   /api/employee/leave/apply
GET    /api/employee/leave/usage-chart

GET    /api/employee/payroll/payslips
GET    /api/employee/payroll/payslips/:id
GET    /api/employee/payroll/ytd-summary

GET    /api/employee/tasks?view=list|kanban
POST   /api/employee/tasks
PUT    /api/employee/tasks/:id
PUT    /api/employee/tasks/:id/status         # for kanban drag
DELETE /api/employee/tasks/:id

GET    /api/employee/performance/reviews
GET    /api/employee/performance/goals
PUT    /api/employee/performance/goals/:id

GET    /api/employee/chat/threads
GET    /api/employee/chat/threads/:id/messages
POST   /api/employee/chat/threads/:id/messages

GET    /api/employee/notifications?type=
PUT    /api/employee/notifications/:id/read
PUT    /api/employee/notifications/read-all

GET    /api/employee/training/courses
PUT    /api/employee/training/courses/:id/progress

GET    /api/employee/documents
POST   /api/employee/documents
GET    /api/employee/documents/:id/download

GET    /api/employee/settings/account
PUT    /api/employee/settings/account
PUT    /api/employee/settings/security          # 2FA, sessions
GET    /api/employee/settings/sessions
DELETE /api/employee/settings/sessions/:id
PUT    /api/employee/settings/notifications
PUT    /api/employee/settings/appearance
PUT    /api/employee/settings/language
```

### HR Portal — `/api/hr`  (role: hr)
```
GET    /api/hr/overview                          # stat cards + attendance-by-dept + headcount donut + pending leaves

GET    /api/hr/employees?search=&department=&page=
GET    /api/hr/employees/:id

GET    /api/hr/leave-requests?status=
PUT    /api/hr/leave-requests/:id/approve
PUT    /api/hr/leave-requests/:id/reject

GET    /api/hr/recruitment/openings
POST   /api/hr/recruitment/openings
GET    /api/hr/recruitment/openings/:id/candidates
PUT    /api/hr/recruitment/candidates/:id/stage   # move through pipeline

GET    /api/hr/departments
POST   /api/hr/departments
PUT    /api/hr/departments/:id

GET    /api/hr/performance/reviews
POST   /api/hr/performance/reviews
```

### Admin Portal — `/api/admin`  (role: admin)
```
GET    /api/admin/analytics                       # headcount, payroll, tenure, retention stat cards
GET    /api/admin/analytics/employee-growth
GET    /api/admin/analytics/payroll-cost
GET    /api/admin/analytics/system-health

GET    /api/admin/users?search=&role=
POST   /api/admin/users
PUT    /api/admin/users/:id
PUT    /api/admin/users/:id/permissions
DELETE /api/admin/users/:id

GET    /api/admin/payroll/runs
POST   /api/admin/payroll/runs                     # trigger payroll processing
GET    /api/admin/payroll/runs/:id

GET    /api/admin/reports?tab=headcount|attrition|payroll|attendance|diversity

GET    /api/admin/system-settings
PUT    /api/admin/system-settings

GET    /api/admin/audit-logs?severity=&actor=&from=&to=
```

### Shared/misc
```
GET    /api/departments/list        # lightweight list for dropdowns, any role
GET    /api/health                  # liveness check, no auth
```

---

## 12. Non-Functional Requirements

- **Performance:** dashboard initial load < 2s on broadband; charts lazy-load off critical path.
- **Accessibility:** all interactive elements keyboard-navigable; color is never the only status indicator (pair badges with text/icon).
- **Responsiveness:** portals must degrade gracefully to tablet width (1024px); full mobile is stretch goal.
- **Security:** role checks enforced server-side, not just hidden in UI; audit log every admin write action.
- **Theming:** dark/light toggle must persist per user (stored in Settings → Appearance).

---