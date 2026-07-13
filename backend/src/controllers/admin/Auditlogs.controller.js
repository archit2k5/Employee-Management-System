import AuditLog from '../../models/AuditLog.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/admin/audit-logs?severity=&actor=&from=&to=
export const getAuditLogs = asyncHandler(async (req, res) => {
  const { severity, actor, from, to, page = 1, limit = 50 } = req.query;

  const filter = {};
  if (severity) filter.severity = severity;
  if (actor) filter.actorId = actor;
  if (from || to) {
    filter.timestamp = {};
    if (from) filter.timestamp.$gte = new Date(from);
    if (to) filter.timestamp.$lte = new Date(to);
  }

  const [logs, total] = await Promise.all([
    AuditLog.find(filter)
      .populate('actorId', 'name email role')
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    AuditLog.countDocuments(filter),
  ]);

  res.json({ logs, total, page: Number(page), limit: Number(limit) });
});