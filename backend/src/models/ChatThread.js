import mongoose from 'mongoose';

const chatThreadSchema = new mongoose.Schema(
  {
    participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true } // updatedAt bumps whenever a new message is sent
);

chatThreadSchema.index({ participantIds: 1 });

export default mongoose.model('ChatThread', chatThreadSchema);