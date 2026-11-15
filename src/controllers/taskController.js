const taskService = require('../services/taskService');

const createTask = (req, res, next) => {
	try {
		const task = taskService.createTask(req.body);

		res.status(201).json({
			success: true,
			message: 'Task created successfully',
			data: task,
		});
	} catch (err) {
		next(err);
	}
};

const getAllTasks = (req, res, next) => {
	try {
		const { page, limit } = req.pagination;
		const { priority } = req.query;

		const { tasks, totalTasks } = taskService.getPaginatedTasks({
			page,
			limit,
			priority,
		});

		const totalPages = Math.ceil(totalTasks / limit);

		res.status(200).json({
			success: true,
			message: 'Tasks retrieved successfully',
			data: tasks,
			pagination: {
				totalTasks,
				totalPages,
				currentPage: page,
				limit,
			},
		});
	} catch (err) {
		next(err);
	}
};

const getTaskById = (req, res, next) => {
	try {
		const { id } = req.params;

		const task = taskService.getTaskById(id);

		if (!task) {
			return res.status(404).json({
				success: false,
				message: 'Task not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Task retrieved successfully',
			data: task,
		});
	} catch (err) {
		next(err);
	}
};

const updateTask = (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedTask = taskService.updateTask(id, req.body);

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
};
const patchTask = (req, res, next) => {
  try {
    const { id } = req.params;

    const patchedTask = taskService.patchTask(id, req.body);

    if (!patchedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task partially updated successfully',
      data: patchedTask,
    });
  } catch (err) {
    next(err);
  }
};
const deleteTask = (req, res, next) => {
	try {
		const { id } = req.params;

		const deletedTask = taskService.deleteTask(id);

		if (!deletedTask) {
			return res.status(404).json({
				success: false,
				message: 'Task not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Task deleted successfully',
			data: deletedTask,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	patchTask,
	deleteTask,
};
