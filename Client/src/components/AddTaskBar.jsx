"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AddTaskBar({ onAddTask = () => {} }) {
  const [task, setTask] = useState("");
  const [dateOption, setDateOption] = useState("today");
  const [customDate, setCustomDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const getSelectedDate = () => {
    if (isMobile || dateOption === "today") return dayjs().format("YYYY-MM-DD");
    if (dateOption === "tomorrow") return dayjs().add(1, "day").format("YYYY-MM-DD");
    return customDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId) {
      setError("You must be logged in to add a task.");
      return;
    }

    const selectedDate = getSelectedDate();

    try {
      const res = await axios.post(`${API_URL}/api/tasks`, {
        user_id: userId,
        description: task,
        task_date: selectedDate,
      });

      setSuccess("Task added!");
      setTimeout(() => setSuccess(""), 3000);

      setTask("");
      setCustomDate("");
      setDateOption("today");
      onAddTask(res.data.task); // Notify parent to refresh
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task.");
    }
  };

  return (
    <section className="w-full max-w-2xl mt-8 px-4 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-[color:var(--color-title)] mb-4 text-center w-full">
        Welcome back! 👋
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap sm:flex-nowrap gap-2 items-center border-2 border-[color:var(--color-title)] rounded-full px-4 py-2 bg-transparent w-full"
      >
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow bg-transparent text-[color:var(--color-text)] placeholder-[color:var(--color-aux)] focus:outline-none px-2"
        />

        {!isMobile && (
          <>
            <select
              value={dateOption}
              onChange={(e) => setDateOption(e.target.value)}
              className="w-28 bg-transparent border rounded-md border-[color:var(--color-title)] text-[color:var(--color-text)] px-2 py-1 text-sm"
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="custom">Pick a date...</option>
            </select>

            {dateOption === "custom" && (
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-36 bg-transparent border rounded-md border-[color:var(--color-title)] text-[color:var(--color-text)] px-2 py-1 text-sm"
              />
            )}
          </>
        )}

        <button
          type="submit"
          className="px-4 text-[color:var(--color-title)] font-bold text-xl hover:bg-[color:var(--color-title)]/10 transition"
        >
          +
        </button>
      </form>

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      {success && <p className="text-green-500 mt-2 text-sm">{success}</p>}
    </section>
  );
}
