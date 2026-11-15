
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');
const validatePriority = require('../middlewares/validatePriority');
const validatePagination = require('../middlewares/validatePagination');
const validateUpdateTask = require('../middlewares/validateUpdateTask');

// POST /api/tasks - Create a new task
router.post('/', validateTask, taskController.createTask);

// GET /api/tasks - Retrieve all tasks
router.get('/',validatePriority, validatePagination,taskController.getAllTasks);

// GET /api/tasks/:id - Retrieve a task by ID
router.get('/:id', taskController.getTaskById);

// PUT /api/tasks/:id - Update an existing task
router.put('/:id', validateUpdateTask, taskController.updateTask);

// PATCH /api/tasks/:id - Partially update an existing task
router.patch('/:id', validateUpdateTask, taskController.patchTask);

// DELETE /api/tasks/:id - Delete an existing task
router.delete('/:id', taskController.deleteTask);



module.exports = router;
