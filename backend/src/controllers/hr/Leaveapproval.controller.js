import LeaveRequest from '../../models/LeaveRequest.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/hr/leave-requests?status=
export const getLeaveRequests = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const requests = await LeaveRequest.find(filter)
    .populate('userId', 'name avatarUrl title department')
    .sort({ createdAt: -1 });

  res.json(requests);
});

// PUT /api/hr/leave-requests/:id/approve
export const approveLeaveRequest = asyncHandler(async (req, res) => {
  const { comment = '' } = req.body;

  const request = await LeaveRequest.findByIdAndUpdate(
    req.params.id,
    { $set: { status: 'approved', approverId: req.user.id, approverComment: comment } },
    { new: true }
  );

  if (!request) return res.status(404).json({ message: 'Leave request not found' });

  // TODO: trigger a notification to request.userId here.

  res.json(request);
});

// PUT /api/hr/leave-requests/:id/reject
export const rejectLeaveRequest = asyncHandler(async (req, res) => {
  const { comment = '' } = req.body;

  const request = await LeaveRequest.findByIdAndUpdate(
    req.params.id,
    { $set: { status: 'rejected', approverId: req.user.id, approverComment: comment } },
    { new: true }
  );

  if (!request) return res.status(404).json({ message: 'Leave request not found' });

  // TODO: trigger a notification to request.userId here.

  res.json(request);
});