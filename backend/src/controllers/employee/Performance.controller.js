import PerformanceReview from '../../models/PerformanceReview.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/performance/reviews
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await PerformanceReview.find({ userId: req.user.id })
    .populate('reviewerId', 'name title')
    .sort({ createdAt: -1 });
  res.json(reviews);
});

// GET /api/employee/performance/goals
// Returns the goals array from the most recent review cycle.
export const getGoals = asyncHandler(async (req, res) => {
  const latestReview = await PerformanceReview.findOne({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(latestReview?.goals ?? []);
});

// PUT /api/employee/performance/goals/:id
// :id here refers to the goal's position/identifier within the latest review's goals array.
// Since goals are embedded (no own _id by default), this expects a `goalIndex` in the body
// or matches by title — adjust once goals get their own _id if you need per-goal addressing.
export const updateGoal = asyncHandler(async (req, res) => {
  const { status, completion } = req.body;
  const { id: goalTitle } = req.params;

  const review = await PerformanceReview.findOneAndUpdate(
    { userId: req.user.id, 'goals.title': goalTitle },
    {
      $set: {
        'goals.$.status': status,
        'goals.$.completion': completion,
      },
    },
    { new: true, runValidators: true }
  );

  if (!review) return res.status(404).json({ message: 'Goal not found' });
  res.json(review.goals.find((g) => g.title === goalTitle));
});