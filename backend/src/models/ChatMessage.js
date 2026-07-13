import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatThread', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

chatMessageSchema.index({ threadId: 1, sentAt: 1 });

export default mongoose.model('ChatMessage', chatMessageSchema);