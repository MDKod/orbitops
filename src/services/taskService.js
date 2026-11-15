
const {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByPriority,
  getPaginatedTasks,
  updateTask,
  patchTask,
    deleteTask,
} = require('../data/taskStore');

const createTaskService = (taskData) => {
  return createTask(taskData);
};

const getAllTasksService = () => {
  return getAllTasks();
};

const getTasksByPriorityService = (priority) => {
  return getTasksByPriority(priority);
};

const getTaskByIdService=(id)=>{
  return getTaskById(id);
};

const getPaginatedTasksService = ({ page, limit, priority }) => {
  return getPaginatedTasks({
    page,
    limit,
    priority,
  });
};
const updateTaskService = (id, taskData) => {
  return updateTask(id, taskData);
};
const patchTaskService = (id, taskData) => {
  return patchTask(id, taskData);
}

const deleteTaskService = (id) => {
  return deleteTask(id);
}

module.exports = {
  createTask: createTaskService,
  getAllTasks: getAllTasksService,
  getTaskById: getTaskByIdService,
  getPaginatedTasks: getPaginatedTasksService,
  getTasksByPriority: getTasksByPriorityService,
  updateTask: updateTaskService,
  patchTask: patchTaskService,
  deleteTask: deleteTaskService,
};
