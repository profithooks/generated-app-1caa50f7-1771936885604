
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = 'tasks';

// Fetch tasks from localStorage
export const fetchTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks to localStorage
export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Add a new task
export const addTask = (title) => {
  const tasks = fetchTasks();
  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
};

// Update a task
export const updateTask = (id, updatedProperties) => {
  const tasks = fetchTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex > -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updatedProperties,
      updatedAt: new Date().toISOString(),
    };
    saveTasks(tasks);
  }
};

// Delete a task
export const deleteTask = (id) => {
  const tasks = fetchTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  saveTasks(filteredTasks);
};

// Mark a task as completed
export const toggleTaskCompletion = (id) => {
  const tasks = fetchTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  
  if (taskIndex > -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    updateTask(id, { completed: tasks[taskIndex].completed });
  }
};

export default {
  fetchTasks,
  saveTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
};
    