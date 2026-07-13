import mongoose from 'mongoose';

const leaveRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['annual', 'sick', 'unpaid', 'maternity', 'paternity', 'other'],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: { type: Number, required: true, min: 0.5 },
    reason: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    approverComment: { type: String, default: '' },
  },
  { timestamps: true }
);

leaveRequestSchema.index({ userId: 1, status: 1 });
leaveRequestSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('LeaveRequest', leaveRequestSchema);