import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    description: { type: String, default: '' },
    openRoles: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Department', departmentSchema);
