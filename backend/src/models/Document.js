import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g. "pdf", "docx", "image"
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

documentSchema.index({ ownerId: 1 });

export default mongoose.model('Document', documentSchema);