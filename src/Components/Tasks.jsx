import React, { useState, useEffect } from 'react';

const Tasks = ({ pickedDate, handleLogoutClick, handleNewDate, handleNewTask, userId, tasksArray, setTasksArray, getAllTasksOnDate }) => {
  const [taskName, setTaskName] = useState('');

  const addTask = async () => {
    if (pickedDate) {
      await handleNewDate(userId, pickedDate);
      await handleNewTask(userId, pickedDate, taskName);
      
      setTaskName('');

      await getAllTasksOnDate(userId, pickedDate);
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
            {tasksArray.map((task, index) => (
              <li key={index}>{task.taskName}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
