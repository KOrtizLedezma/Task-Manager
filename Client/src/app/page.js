"use client";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {

  console.log("API_URL from env:", process.env.NEXT_PUBLIC_API_URL);

  const router = useRouter();

  const handleStart = () => {
    router.push("/login-register");
  };

  return (
    <>
      <ThemeToggle />
      <main
        className="w-screen h-screen flex flex-col items-center justify-center text-[color:var(--color-text)] px-4 text-center"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <h1 className="text-[color:var(--color-title)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight">
          Task Manager
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[color:var(--color-aux)] font-medium max-w-xl">
          Organize your day, keep track of your tasks, and boost your productivity.
        </p>
        <button
          onClick={handleStart}
          className="mt-8 px-6 py-3 border-4 text-[color:var(--color-title)] border-[color:var(--color-title)] rounded-full transition-colors duration-300 hover:bg-[color:var(--color-title)]/10"
        >
          Start Now
        </button>
      </main>
    </>
  );
}
