import Document from '../../models/Document.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/documents
export const getDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ ownerId: req.user.id }).sort({ uploadedAt: -1 });
  res.json(documents);
});

// POST /api/employee/documents
// Assumes `upload.middleware.js` (multer) has already run and attached req.file.
export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const document = await Document.create({
    ownerId: req.user.id,
    name: req.file.originalname,
    type: req.file.mimetype,
    url: `/public/uploads/${req.file.filename}`,
    uploadedAt: new Date(),
  });

  res.status(201).json(document);
});

// GET /api/employee/documents/:id/download
export const downloadDocument = asyncHandler(async (req, res) => {
  const document = await Document.findOne({ _id: req.params.id, ownerId: req.user.id });
  if (!document) return res.status(404).json({ message: 'Document not found' });

  // If serving from local disk via `public/`, redirect to the static URL.
  // If using S3/cloud storage instead, generate and return a signed URL here.
  res.redirect(document.url);
});