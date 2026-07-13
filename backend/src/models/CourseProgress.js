import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
  },
  { timestamps: true }
);

courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('CourseProgress', courseProgressSchema);