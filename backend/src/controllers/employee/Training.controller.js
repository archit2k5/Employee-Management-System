import Course from '../../models/Course.js';
import CourseProgress from '../../models/CourseProgress.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/training/courses
export const getCourses = asyncHandler(async (req, res) => {
  const [courses, progressRecords] = await Promise.all([
    Course.find().sort({ title: 1 }),
    CourseProgress.find({ userId: req.user.id }),
  ]);

  const progressByCourse = new Map(progressRecords.map((p) => [p.courseId.toString(), p]));

  const result = courses.map((course) => {
    const progress = progressByCourse.get(course._id.toString());
    return {
      ...course.toObject(),
      progress: progress?.progress ?? 0,
      status: progress?.status ?? 'not_started',
    };
  });

  res.json(result);
});

// PUT /api/employee/training/courses/:id/progress
export const updateCourseProgress = asyncHandler(async (req, res) => {
  const { id: courseId } = req.params;
  const { progress, status } = req.body;

  const record = await CourseProgress.findOneAndUpdate(
    { userId: req.user.id, courseId },
    { $set: { progress, status } },
    { upsert: true, new: true, runValidators: true }
  );

  res.json(record);
});