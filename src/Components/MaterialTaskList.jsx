import React, { useState } from 'react';

function MaterialTaskList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const handleAddTask = () => {
        if (input.trim()) {
            setTasks([...tasks, input]);
            setInput('');
        }
    };

    return (
        <div>
            <div className="task-list-container">
                <input
                    type="text"
                    className="task-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task"
                />
                <button className="add-task-btn" onClick={handleAddTask}>+</button>
            </div>
            
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
}

export default MaterialTaskList;
