"use client";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login-register");
  };

  return (
    <header
      className="w-full px-6 py-4 border-b border-[color:var(--color-border)] grid grid-cols-3 items-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      {/* Left: Toggle */}
      <div className="flex justify-start">
        <ThemeToggle />
      </div>

      {/* Center: Title */}
      <div className="flex justify-center">
        <h1 className="text-xl font-bold text-[color:var(--color-title)]">
          Task Manager
        </h1>
      </div>

      {/* Right: Logout */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-1 border border-[color:var(--color-title)] text-[color:var(--color-title)] rounded-full text-sm hover:bg-[color:var(--color-title)] hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </header>

  );
}
