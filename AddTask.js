
import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        existingTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
        
        onAdd(newTask);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                className="border p-2 mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2">Add Task</button>
        </form>
    );
};

export default AddTask;
    