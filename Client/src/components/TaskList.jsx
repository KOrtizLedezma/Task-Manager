"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaTrash } from "react-icons/fa";

export default function TaskList({ refreshTrigger = 0 }) {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`${API_URL}/api/tasks`, {
          params: { user_id: userId, date: selectedDate }
        });
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [userId, selectedDate, refreshTrigger]); // ✅ React to new tasks

  const handleToggle = async (taskId, currentState) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${taskId}`, {
        completed: !currentState
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, completed: !currentState } : t
        )
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <section className="w-full max-w-2xl mt-10 px-4 text-[color:var(--color-text)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[color:var(--color-title)]">📅 Tasks for:</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-[color:var(--color-title)] rounded-md px-2 py-1 bg-transparent text-[color:var(--color-text)]"
        />
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
        <ul className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between border border-[color:var(--color-title)] rounded-md px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id, task.completed)}
                    className="cursor-pointer accent-[color:var(--color-title)]"
                  />

                  <span className={task.completed ? "line-through opacity-60" : ""}>
                    {task.description}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700 ml-4"
                  title="Delete Task"
                >
                  <FaTrash />
                </button>
              </li>
            ))
          ) : (
            <p className="text-sm text-[color:var(--color-aux)]">No tasks for this day.</p>
          )}
        </ul>
      </div>
    </section>
  );
}
