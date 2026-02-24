
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import AddTask from './AddTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <div className="task-list">
      <AddTask addTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleCompletion={toggleTaskCompletion}
            removeTask={removeTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
    