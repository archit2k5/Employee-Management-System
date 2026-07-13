import Attendance from '../../models/Attendance.js';
import asyncHandler from '../../utils/asyncHandler.js';

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// GET /api/employee/attendance
export const getAttendance = asyncHandler(async (req, res) => {
  const today = startOfDay(new Date());
  const record = await Attendance.findOne({ userId: req.user.id, date: today });
  res.json(record ?? { date: today, checkIn: null, checkOut: null, status: 'absent' });
});

// POST /api/employee/attendance/check-in
export const checkIn = asyncHandler(async (req, res) => {
  const today = startOfDay(new Date());

  const record = await Attendance.findOneAndUpdate(
    { userId: req.user.id, date: today },
    { $setOnInsert: { checkIn: new Date(), status: 'present' } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json(record);
});

// POST /api/employee/attendance/check-out
export const checkOut = asyncHandler(async (req, res) => {
  const today = startOfDay(new Date());

  const record = await Attendance.findOneAndUpdate(
    { userId: req.user.id, date: today },
    { $set: { checkOut: new Date() } },
    { new: true }
  );

  if (!record) {
    return res.status(400).json({ message: 'No check-in found for today' });
  }

  res.json(record);
});

// GET /api/employee/attendance/calendar?month=&year=
export const getCalendar = asyncHandler(async (req, res) => {
  const { month, year } = req.query; // month: 1-12
  const y = Number(year) || new Date().getFullYear();
  const m = Number(month) || new Date().getMonth() + 1;

  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);

  const records = await Attendance.find({
    userId: req.user.id,
    date: { $gte: start, $lt: end },
  }).sort({ date: 1 });

  res.json(records);
});

// GET /api/employee/attendance/history
export const getHistory = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const records = await Attendance.find({ userId: req.user.id })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Attendance.countDocuments({ userId: req.user.id });

  res.json({ records, total, page: Number(page), limit: Number(limit) });
});