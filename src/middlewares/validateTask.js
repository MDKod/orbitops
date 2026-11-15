const { PRIORITIES } = require('../constants/taskConstants');

const validateTask = (req, res, next) => {
	const { title, description, assignee, priority, dueDate } = req.body;

	if (!title || typeof title !== 'string' || !title.trim()) {
		const error = new Error('Task title is required.');
		error.statusCode = 400;
		return next(error);
	}

	if (description !== undefined && typeof description !== 'string') {
		const error = new Error('Description must be a string.');
		error.statusCode = 400;
		return next(error);
	}

	if (!assignee || typeof assignee !== 'string' || !assignee.trim()) {
		const error = new Error('Assignee is required.');
		error.statusCode = 400;
		return next(error);
	}

	if (!PRIORITIES.includes(priority)) {
		const error = new Error('Invalid priority value.');
		error.statusCode = 400;
		return next(error);
	}

	if (dueDate !== undefined && dueDate !== null && Number.isNaN(Date.parse(dueDate))) {
		const error = new Error('Invalid due date.');
		error.statusCode = 400;
		return next(error);
	}

	next();
};

module.exports = validateTask;