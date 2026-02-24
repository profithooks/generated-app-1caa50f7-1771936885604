
import { v4 as uuidv4 } from 'uuid';

const TASKS_KEY = 'tasks';

export const getTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const addTask = (title) => {
  const tasks = getTasks();
  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return newTask;
};

export const updateTask = (id, updatedFields) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;

  const updatedTask = { ...tasks[taskIndex], ...updatedFields, updatedAt: new Date().toISOString() };
  tasks[taskIndex] = updatedTask;
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return updatedTask;
};

export const deleteTask = (id) => {
  let tasks = getTasks();
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const toggleTaskCompletion = (id) => {
  const task = updateTask(id, { completed: !getTasks().find(task => task.id === id).completed });
  return task;
};
    