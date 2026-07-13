import PerformanceReview from '../../models/PerformanceReview.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/hr/performance/reviews
export const getReviews = asyncHandler(async (req, res) => {
  const { cycle, userId } = req.query;

  const filter = {};
  if (cycle) filter.cycle = cycle;
  if (userId) filter.userId = userId;

  const reviews = await PerformanceReview.find(filter)
    .populate('userId', 'name avatarUrl title department')
    .populate('reviewerId', 'name title')
    .sort({ createdAt: -1 });

  res.json(reviews);
});

// POST /api/hr/performance/reviews
export const createReview = asyncHandler(async (req, res) => {
  const { userId, cycle, score, goals = [], notes = '' } = req.body;

  const review = await PerformanceReview.create({
    userId,
    cycle,
    score,
    goals,
    notes,
    reviewerId: req.user.id,
  });

  res.status(201).json(review);
});