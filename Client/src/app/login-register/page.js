"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginRegisterPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const getFriendlyError = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "The email address is badly formatted.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/missing-password":
        return "Please enter a password.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    resetMessages();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setSuccess("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(getFriendlyError(err.code));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    resetMessages();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setSuccess("Registration successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(getFriendlyError(err.code));
    }
  };

  return (
    <>
      <ThemeToggle />
      <main
        className="h-screen w-screen flex items-center justify-center text-[color:var(--color-text)] px-4"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div
          className="w-full max-w-md rounded-2xl shadow-lg p-6 pt-2 transition-all duration-300"
          style={{ minHeight: "460px", backgroundColor: "var(--color-bg)" }}
        >
          {/* Tabs */}
          <div className="flex w-full border-b border-[color:var(--color-title)] mb-6">
            <div
              onClick={() => {
                resetMessages();
                setActiveTab("login");
              }}
              className={`cursor-pointer flex-1 text-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === "login"
                  ? "border-b-2 border-[color:var(--color-title)] text-[color:var(--color-title)]"
                  : "text-[color:var(--color-aux)]"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => {
                resetMessages();
                setActiveTab("register");
              }}
              className={`cursor-pointer flex-1 text-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === "register"
                  ? "border-b-2 border-[color:var(--color-title)] text-[color:var(--color-title)]"
                  : "text-[color:var(--color-aux)]"
              }`}
            >
              Register
            </div>
          </div>

          {/* Form Section */}
          <div className="flex flex-col h-[340px]">
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="flex flex-col flex-grow space-y-4">
                <div>
                  <label htmlFor="login-email" className="block mb-1 text-sm text-[color:var(--color-text)]">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-transparent border border-[color:var(--color-text)] text-[color:var(--color-text)] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="login-password" className="block mb-1 text-sm text-[color:var(--color-text)]">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-transparent border border-[color:var(--color-text)] text-[color:var(--color-text)] focus:outline-none"
                  />
                </div>
                {(error || success) && (
                  <div className="text-center mt-2">
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {success && <p className="text-sm text-green-500">{success}</p>}
                  </div>
                )}
                <div className="mt-auto">
                  <button
                    type="submit"
                    className="w-full py-2 mt-2 rounded-md bg-[color:var(--color-title)] text-white font-semibold"
                  >
                    Log In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col flex-grow space-y-4">
                <div>
                  <label htmlFor="register-name" className="block mb-1 text-sm text-[color:var(--color-text)]">Name</label>
                  <input
                    id="register-name"
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-transparent border border-[color:var(--color-text)] text-[color:var(--color-text)] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="register-email" className="block mb-1 text-sm text-[color:var(--color-text)]">Email</label>
                  <input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-transparent border border-[color:var(--color-text)] text-[color:var(--color-text)] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="register-password" className="block mb-1 text-sm text-[color:var(--color-text)]">Password</label>
                  <input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-transparent border border-[color:var(--color-text)] text-[color:var(--color-text)] focus:outline-none"
                  />
                </div>
                {(error || success) && (
                  <div className="text-center mt-2">
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {success && <p className="text-sm text-green-500">{success}</p>}
                  </div>
                )}
                <div className="mt-auto">
                  <button
                    type="submit"
                    className="w-full py-2 mt-2 rounded-md bg-[color:var(--color-title)] text-white font-semibold"
                  >
                    Register
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
