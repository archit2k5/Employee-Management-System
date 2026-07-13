import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    stage: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'hired', 'rejected'],
      default: 'applied',
    },
  },
  { timestamps: true }
);

const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    stage: {
      type: String,
      enum: ['open', 'on_hold', 'closed'],
      default: 'open',
    },
    candidates: { type: [candidateSchema], default: [] },
  },
  { timestamps: true }
);

jobOpeningSchema.index({ department: 1, stage: 1 });

export default mongoose.model('JobOpening', jobOpeningSchema);