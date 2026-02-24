
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...task, id: Date.now().toString() },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <AddTask addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
};

export default Home;
    