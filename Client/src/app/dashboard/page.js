"use client";
import DashboardHeader from "@/components/DashboardHeader";
import AddTaskBar from "@/components/AddTaskBar";
import TaskList from "@/components/TaskList";
import { useState } from "react";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddTask = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <DashboardHeader />
      <main
        className="min-h-screen w-full flex flex-col items-center text-[color:var(--color-text)] px-4"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <AddTaskBar onAddTask={handleAddTask} />
        <TaskList refreshTrigger={refreshTrigger} />
      </main>
    </>
  );
}
