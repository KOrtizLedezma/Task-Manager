import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import MaterialTaskList from './MaterialTaskList';

const Tasks = ({ pickedDate, handleLogoutClick, handleNewDate, handleNewTask, userId, tasksArray }) => {
    const [taskName, setTaskName] = useState('');

    const addTask = () => {
        if (pickedDate !== null){
            handleNewDate(userId, pickedDate);
            handleNewTask(userId, pickedDate, taskName);
            setTaskName('');
            console.log(tasksArray);
        }
    };

    return (
        <main className="main_tasks">
            <div className="tasks">
                <div className="tasks_centered">
                    <button className="sign-out_button" onClick={handleLogoutClick}>
                        <span>Sign Out</span>
                    </button>
                    <div className="task-list-container">
                        <input
                            type="text"
                            className="task-input"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            placeholder="Enter a task"
                        />
                        <button className="add-task-btn" onClick={addTask}>+</button>
                    </div>
                    <ul className="task-list">
                        {tasksArray.map((tasksArray, index) => (
                            <li key={index}>{tasksArray.description}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Tasks;
