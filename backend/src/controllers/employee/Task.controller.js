import Task from '../../models/Task.js';
import asyncHandler from '../../utils/asyncHandler.js';

// GET /api/employee/tasks?view=list|kanban
export const getTasks = asyncHandler(async (req, res) => {
  const { view = 'list', status, priority } = req.query;

  const filter = { userId: req.user.id };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter).sort({ dueDate: 1 });

  if (view === 'kanban') {
    const columns = { todo: [], in_progress: [], done: [] };
    tasks.forEach((t) => columns[t.status]?.push(t));
    return res.json(columns);
  }

  res.json(tasks);
});

// POST /api/employee/tasks
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const task = await Task.create({
    userId: req.user.id,
    title,
    description,
    priority,
    dueDate,
  });

  res.status(201).json(task);
});

// PUT /api/employee/tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: { title, description, priority, dueDate } },
    { new: true, runValidators: true }
  );

  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// PUT /api/employee/tasks/:id/status  (for kanban drag)
export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// DELETE /api/employee/tasks/:id
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(204).send();
});