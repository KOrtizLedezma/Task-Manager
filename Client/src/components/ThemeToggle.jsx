"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-2xl border-2 shadow-md transition-colors duration-300 flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-title)",
          borderColor: "var(--color-title)",
        }}
      >
        {theme === "light" ? <FaSun size={16} /> : <FaMoon size={16} />}
      </button>
    </div>
  );
}
