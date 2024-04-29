import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import MaterialTaskList from './MaterialTaskList';

const Tasks = ({ pickedDate, handleLogoutClick, handleNewDate, handleNewTask, userId }) => {
    const [taskName, setTaskName] = useState('');

    function taskObject (order, state){
        this.order = order,
        this.state = state
    }

    const addTask = () => {
        if (pickedDate !== null){
            handleNewDate(userId, pickedDate);
            handleNewTask(userId, pickedDate, taskName);
            setTaskName('');
        }
    };

    return (
        <main className="main_tasks">
            <div className="tasks">
                <div className="tasks_centered">
                    <button className="add_new_task_button" onClick={handleLogoutClick}>
                        <span>Sign Out</span>
                    </button>
                    <MaterialTaskList></MaterialTaskList>
                </div>
            </div>
        </main>
    );
};

export default Tasks;
