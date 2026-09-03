"use client";

import React, { useState, useEffect } from "react";
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/data";

export default function AuthComponent() {
  const router = useRouter();

  // ✅ Redirect to Home if user already has a valid session
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/Home");
      }
    };
    checkSession();
  }, [router]);

  const [view, setView] = useState("login");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleView = (newView) => {
    setView(newView);
    setMessage({ type: "", text: "" });
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
      setLoading(false);
    } else {
      setMessage({ type: "success", text: "Logged in successfully!" });
      router.push("/Home");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (!email || !password) {
      setMessage({ type: "error", text: "Please enter both email and password." });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
        return;
      }

      if (data?.user && data.user.identities && data.user.identities.length === 0) {
        setMessage({ type: "error", text: "This email is already registered. Please log in." });
        setLoading(false);
        return;
      }

      setMessage({ type: "success", text: "Account created successfully! 🎉 Please log in." });
      // toggleView('login'); // يمكنك تفعيلها للتبديل التلقائي لشاشة الدخول
    } catch (err) {
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white dark:bg-[#0B0F15] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto hidden md:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Elevate Your Tech.
            </h2>
            <p className="text-zinc-300 transform font-medium">
              Join the premier destination for next-generation gadgets and exclusive deals.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          
          {/* Message Alert */}
          <div className="min-h-[3rem] mb-4">
            {message.text && (
              <div className={`p-3 rounded-xl flex items-center text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message.type === 'error' ? (
                  <AlertCircle className="w-5 h-5 mr-2 shrink-0" />
                ) : (
                  <CheckCircle className="w-5 h-5 mr-2 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}
          </div>

          {view === "login" ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-zinc-500 mb-8">
                Enter your email and password to access your account.
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Log In"}
                  {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
                </button>
              </form>

              <p className="mt-8 text-center text-zinc-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleView("register")}
                  className="text-emerald-400 font-semibold hover:text-indigo-700 transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                Create an Account
              </h1>
              <p className="text-zinc-500 mb-8">
                Join us to get the best tech deals.
              </p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-zinc-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white dark:bg-white dark:text-black py-3 mt-2 rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>

              <p className="mt-8 text-center text-zinc-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => toggleView("login")}
                  className="text-emerald-400 font-semibold hover:text-indigo-700 transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
