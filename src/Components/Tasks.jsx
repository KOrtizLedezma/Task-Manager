import React, { useState } from 'react';
import Popup from 'reactjs-popup';

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
                    <Popup
                        trigger={<button className="add_new_task_button">New Task</button>}
                        modal
                        closeOnDocumentClick
                        overlayStyle={{ backdropFilter: 'blur(5px)' }}
                    >
                        <div className='popups'>

                            <h2 className='popups-tittle'>
                                New Task
                            </h2>

                            <div className="task-input-container">
                                <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                placeholder="Ex: Take out the trash"
                                />
                            </div>

                            <button className="popups-button" onClick={addTask}>
                                <span>Add Task</span>
                            </button>
                        </div>
                    </Popup>
                </div>
            </div>
        </main>
    );
};

export default Tasks;
