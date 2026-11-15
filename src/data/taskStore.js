
const { randomUUID } = require('crypto');

const tasks = [];


const createTask = (taskData) => {
  const newTask = {
    id: randomUUID(),
    title: taskData.title,
    description: taskData.description,
    assignee: taskData.assignee,
    priority: taskData.priority,
    status: 'pending',
    dueDate: taskData.dueDate || null,
  };

  tasks.push(newTask);

  return newTask;
};

const getAllTasks = () => {
  return tasks.map((task) => ({ ...task }));
};

const getTaskById = (id) => {
  const task = tasks.find((task) => task.id === id);

  return task ? { ...task } : undefined;
};

const updateTask = (id, taskData) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return undefined;
  }

  const existingTask = tasks[taskIndex];

  const updatedTask = {
    id: existingTask.id,
    title: taskData.title,
    description: taskData.description,
    assignee: taskData.assignee,
    priority: taskData.priority,
    status: existingTask.status,
    dueDate: taskData.dueDate ?? null,
  };

  tasks[taskIndex] = updatedTask;

  return { ...updatedTask };
};


const patchTask = (id, taskData) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return undefined;
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...taskData,
    id: tasks[taskIndex].id,
  };

  tasks[taskIndex] = updatedTask;

  return { ...updatedTask };
};

const deleteTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return undefined;
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);

  return { ...deletedTask };
};

const getTasksByPriority = (priority) => {
  return tasks
    .filter((task) => task.priority === priority)
    .map((task) => ({ ...task }));
};

const getPaginatedTasks = ({ page, limit, priority }) => {
  const filteredTasks = priority
    ? tasks.filter((task) => task.priority === priority)
    : tasks;

  const totalTasks = filteredTasks.length;

  const offset = (page - 1) * limit;

  const paginatedTasks = filteredTasks
    .slice(offset, offset + limit)
    .map((task) => ({ ...task }));

  return {
    tasks: paginatedTasks,
    totalTasks,
  };
};



module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
   updateTask,
    patchTask,
    deleteTask,
  getTasksByPriority,
  getPaginatedTasks,
};


