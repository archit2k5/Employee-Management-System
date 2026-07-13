import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['employee', 'hr', 'admin'],
      required: true,
      default: 'employee',
    },
    avatarUrl: { type: String, default: '' },
    title: { type: String, default: '' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    twoFactorEnabled: { type: Boolean, default: false },
    theme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    language: { type: String, default: 'en' },

    skills: {
      type: [
        {
          name: { type: String, required: true },
          progress: { type: Number, min: 0, max: 100, default: 0 },
          certifications: { type: [String], default: [] },
        },
      ],
      default: [],
      _id: false,
    },

    emergencyContact: {
      type: {
        name: { type: String, default: '' },
        relationship: { type: String, default: '' },
        phone: { type: String, default: '' },
      },
      default: {},
      _id: false,
    },

    // Fine-grained permissions beyond the coarse `role` field, editable in Admin > User Management
    permissions: { type: [String], default: [] },

    notificationPreferences: { type: mongoose.Schema.Types.Mixed, default: {} },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ role: 1 });
userSchema.index({ department: 1 });

// Hash password whenever it's set/changed
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Never leak passwordHash in JSON responses
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

export default mongoose.model('User', userSchema);