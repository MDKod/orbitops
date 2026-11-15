
const { PRIORITIES, STATUSES } = require('../constants/taskConstants');

const ALLOWED_FIELDS = [
  'title',
  'description',
  'assignee',
  'priority',
  'status',
  'dueDate',
];

const validateUpdateTask = (req, res, next) => {
  const taskData = req.body;

  // Check whether update data exists
  if (
    !taskData ||
    typeof taskData !== 'object' ||
    Array.isArray(taskData) ||
    Object.keys(taskData).length === 0
  ) {
    const error = new Error('Update data is required.');
    error.statusCode = 400;
    return next(error);
  }

  // Reject fields that cannot be updated
  const invalidFields = Object.keys(taskData).filter(
    (field) => !ALLOWED_FIELDS.includes(field)
  );

  if (invalidFields.length > 0) {
    const error = new Error('Invalid update fields.');
    error.statusCode = 400;
    return next(error);
  }

  const {
    title,
    description,
    assignee,
    priority,
    status,
    dueDate,
  } = taskData;

  // Validate title
  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    const error = new Error('Task title must be a non-empty string.');
    error.statusCode = 400;
    return next(error);
  }

  // Validate description
  if (description !== undefined && typeof description !== 'string') {
    const error = new Error('Description must be a string.');
    error.statusCode = 400;
    return next(error);
  }

  // Validate assignee
  if (
    assignee !== undefined &&
    (typeof assignee !== 'string' || !assignee.trim())
  ) {
    const error = new Error('Assignee must be a non-empty string.');
    error.statusCode = 400;
    return next(error);
  }

  // Validate priority
  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    const error = new Error('Invalid priority value.');
    error.statusCode = 400;
    return next(error);
  }

  // Validate status
  if (status !== undefined && !STATUSES.includes(status)) {
    const error = new Error('Invalid status value.');
    error.statusCode = 400;
    return next(error);
  }

  // Validate due date
  if (
    dueDate !== undefined &&
    dueDate !== null &&
    (typeof dueDate !== 'string' || Number.isNaN(Date.parse(dueDate)))
  ) {
    const error = new Error('Invalid due date.');
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = validateUpdateTask;
