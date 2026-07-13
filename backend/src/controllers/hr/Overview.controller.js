import User from '../../models/User.js';
import Attendance from '../../models/Attendance.js';
import Department from '../../models/Department.js';
import JobOpening from '../../models/JobOpening.js';
import LeaveRequest from '../../models/LeaveRequest.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/hr/overview
export const getOverview = asyncHandler(async (req, res) => {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [totalEmployees, newThisMonth, departments, openJobs, pendingLeaveRequests, attendanceRecords] =
    await Promise.all([
      User.countDocuments({ role: 'employee', isActive: true }),
      User.countDocuments({ role: 'employee', createdAt: { $gte: startOfMonth } }),
      Department.find(),
      JobOpening.find({ stage: 'open' }),
      LeaveRequest.find({ status: 'pending' })
        .populate('userId', 'name avatarUrl')
        .sort({ createdAt: -1 })
        .limit(10),
      Attendance.find({ date: { $gte: startOfMonth } }).populate('userId', 'department'),
    ]);

  const avgAttendance = attendanceRecords.length
    ? Math.round(
        (attendanceRecords.filter((a) => a.status === 'present').length /
          attendanceRecords.length) *
          1000
      ) / 10
    : 0;

  const openPositionsCount = openJobs.length;
  const departmentsWithOpenings = new Set(openJobs.map((j) => j.department.toString())).size;

  // Attendance % grouped by department, for the bar chart
  const deptBuckets = {};
  attendanceRecords.forEach((record) => {
    const deptId = record.userId?.department?.toString();
    if (!deptId) return;
    deptBuckets[deptId] = deptBuckets[deptId] || { present: 0, total: 0 };
    deptBuckets[deptId].total += 1;
    if (record.status === 'present') deptBuckets[deptId].present += 1;
  });

  const attendanceByDepartment = departments.map((d) => {
    const bucket = deptBuckets[d._id.toString()];
    return {
      department: d.name,
      attendancePercent: bucket ? Math.round((bucket.present / bucket.total) * 1000) / 10 : 0,
    };
  });

  // Headcount by department, for the donut chart
  const headcountByDepartment = departments.map((d) => ({
    department: d.name,
    headcount: d.headcount,
  }));

  res.json({
    totalEmployees: { count: totalEmployees, newThisMonth },
    avgAttendance,
    openPositions: { count: openPositionsCount, departments: departmentsWithOpenings },
    pendingLeaves: {
      count: await LeaveRequest.countDocuments({ status: 'pending' }),
      requests: pendingLeaveRequests,
    },
    attendanceByDepartment,
    headcountByDepartment,
  });
});