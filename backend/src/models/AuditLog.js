import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g. "user.update", "payroll.run"
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    default: 'info',
  },
  meta: { type: mongoose.Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now },
});

auditLogSchema.index({ severity: 1, timestamp: -1 });
auditLogSchema.index({ actorId: 1, timestamp: -1 });

export default mongoose.model('AuditLog', auditLogSchema);