import React, { useState } from 'react';

function MaterialTaskList( {addTask, tasksArray}) {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

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
                <button className="add-task-btn" onClick={addTask}>+</button>
            </div>
            
            <ul className="task-list">
                {tasks.map((tasksArray, index) => (
                    <li key={index}>{tasksArray.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MaterialTaskList;
