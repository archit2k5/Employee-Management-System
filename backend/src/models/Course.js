import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: '' },
    durationMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);