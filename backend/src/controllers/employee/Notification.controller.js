import Notification from '../../models/Notification.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/notifications?type=
export const getNotifications = asyncHandler(async (req, res) => {
  const { type } = req.query;

  const filter = { userId: req.user.id };
  if (type) filter.type = type;

  const notifications = await Notification.find(filter).sort({ createdAt: -1 });
  res.json(notifications);
});

// PUT /api/employee/notifications/:id/read
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: { read: true } },
    { new: true }
  );

  if (!notification) return res.status(404).json({ message: 'Notification not found' });
  res.json(notification);
});

// PUT /api/employee/notifications/read-all
export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user.id, read: false }, { $set: { read: true } });
  res.json({ message: 'All notifications marked as read' });
});