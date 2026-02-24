
import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`flex items-center justify-between p-4 border-b ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={handleToggle} 
          className="mr-2" 
        />
        <span className={task.completed ? 'line-through text-gray-500' : 'text-black'}>
          {task.title}
        </span>
      </div>
      <button 
        onClick={handleDelete} 
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
    