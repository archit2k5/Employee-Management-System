import mongoose from 'mongoose';

const lineItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const payslipSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    period: { type: String, required: true }, // e.g. "2024-06"
    earnings: { type: [lineItemSchema], default: [] },
    deductions: { type: [lineItemSchema], default: [] },
    netPay: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

payslipSchema.index({ userId: 1, period: 1 }, { unique: true });

export default mongoose.model('Payslip', payslipSchema);