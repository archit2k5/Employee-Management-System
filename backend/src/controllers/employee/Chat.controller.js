import ChatThread from '../../models/ChatThread.js';
import ChatMessage from '../../models/ChatMessage.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/chat/threads
export const getThreads = asyncHandler(async (req, res) => {
  const threads = await ChatThread.find({ participantIds: req.user.id })
    .populate('participantIds', 'name avatarUrl title')
    .sort({ updatedAt: -1 });

  res.json(threads);
});

// GET /api/employee/chat/threads/:id/messages
export const getMessages = asyncHandler(async (req, res) => {
  const { id: threadId } = req.params;
  const { page = 1, limit = 50 } = req.query;

  const thread = await ChatThread.findOne({ _id: threadId, participantIds: req.user.id });
  if (!thread) return res.status(404).json({ message: 'Thread not found' });

  const messages = await ChatMessage.find({ threadId })
    .sort({ sentAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(messages.reverse()); // chronological order for the UI
});

// POST /api/employee/chat/threads/:id/messages
export const sendMessage = asyncHandler(async (req, res) => {
  const { id: threadId } = req.params;
  const { body } = req.body;

  const thread = await ChatThread.findOne({ _id: threadId, participantIds: req.user.id });
  if (!thread) return res.status(404).json({ message: 'Thread not found' });

  const message = await ChatMessage.create({
    threadId,
    senderId: req.user.id,
    body,
    sentAt: new Date(),
  });

  thread.updatedAt = new Date();
  await thread.save();

  // If Socket.IO is set up, emit here:
  // req.app.get('io').to(threadId.toString()).emit('message:new', message);

  res.status(201).json(message);
});