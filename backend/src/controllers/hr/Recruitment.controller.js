import JobOpening from '../../models/JobOpening.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/hr/recruitment/openings
export const getOpenings = asyncHandler(async (req, res) => {
  const { stage, department } = req.query;

  const filter = {};
  if (stage) filter.stage = stage;
  if (department) filter.department = department;

  const openings = await JobOpening.find(filter)
    .populate('department', 'name')
    .sort({ createdAt: -1 });

  res.json(openings);
});

// POST /api/hr/recruitment/openings
export const createOpening = asyncHandler(async (req, res) => {
  const { title, department } = req.body;

  const opening = await JobOpening.create({ title, department, stage: 'open', candidates: [] });
  res.status(201).json(opening);
});

// GET /api/hr/recruitment/openings/:id/candidates
export const getCandidates = asyncHandler(async (req, res) => {
  const opening = await JobOpening.findById(req.params.id);
  if (!opening) return res.status(404).json({ message: 'Opening not found' });

  res.json(opening.candidates);
});

// PUT /api/hr/recruitment/candidates/:id/stage  (move through pipeline)
// :id here is the JobOpening _id; the candidate is identified by candidateId in the body,
// since candidates are embedded sub-documents.
export const updateCandidateStage = asyncHandler(async (req, res) => {
  const { id: openingId } = req.params;
  const { candidateId, stage } = req.body;

  const opening = await JobOpening.findOneAndUpdate(
    { _id: openingId, 'candidates._id': candidateId },
    { $set: { 'candidates.$.stage': stage } },
    { new: true }
  );

  if (!opening) return res.status(404).json({ message: 'Opening or candidate not found' });

  const candidate = opening.candidates.id(candidateId);
  res.json(candidate);
});