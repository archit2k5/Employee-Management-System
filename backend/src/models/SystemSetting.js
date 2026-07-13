import mongoose from 'mongoose';

// Singleton document — there should only ever be one SystemSettings record.
// Use SystemSettings.getSettings() / .updateSettings() rather than querying directly.
const systemSettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'Nexus Technologies' },
    annualLeaveAllowance: { type: Number, default: 24 },
    workWeekDays: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    payrollCycle: { type: String, enum: ['monthly', 'biweekly'], default: 'monthly' },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

systemSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) settings = await this.create({});
  return settings;
};

export default mongoose.model('SystemSettings', systemSettingsSchema);