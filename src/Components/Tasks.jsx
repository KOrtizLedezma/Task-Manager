import React from "react";

    const Tasks = ({pickedDate, handleLogoutClick}) => {

        const addTask = () => {
            console.log(pickedDate);
        };

        return (
            <main className="main_tasks">
                <div className="tasks">  
                    <div className="tasks_centered">
                        <button className="add_new_task_button" onClick={handleLogoutClick}>
                            <span>Sign Out</span>
                        </button>
                        <button className="add_new_task_button" onClick={addTask}>
                            <span>New Task</span>
                        </button>
                    </div>
                </div>
            </main>
            
        );
    };
  
export default Tasks;
