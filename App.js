
import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Task Management</h1>
      <AddTask addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        toggleTaskCompletion={toggleTaskCompletion}
        removeTask={removeTask}
      />
    </div>
  );
};

export default App;
    