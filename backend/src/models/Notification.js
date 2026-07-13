import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['task', 'leave', 'payroll', 'chat', 'system', 'performance'],
      required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true } // createdAt covers `createdAt` from the spec
);

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);