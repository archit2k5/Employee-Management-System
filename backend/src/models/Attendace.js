import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    checkIn: { type: Date, default: null },
    checkOut: { type: Date, default: null },
    status: {
      type: String,
      enum: ['present', 'absent', 'half_day', 'leave'],
      required: true,
      default: 'present',
    },
  },
  { timestamps: true }
);

// One attendance record per user per day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);