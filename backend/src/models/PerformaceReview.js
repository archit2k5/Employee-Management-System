import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    completion: { type: Number, min: 0, max: 100, default: 0 },
  },
  { _id: false }
);

const performanceReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cycle: { type: String, required: true }, // e.g. "Q2 2024"
    score: { type: Number, min: 0, max: 5, default: null },
    goals: { type: [goalSchema], default: [] },
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

performanceReviewSchema.index({ userId: 1, cycle: 1 });

export default mongoose.model('PerformanceReview', performanceReviewSchema);