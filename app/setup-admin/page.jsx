"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/data";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, CheckCircle, XCircle } from "lucide-react";

// The specific user ID allowed to become admin
const ADMIN_USER_ID = "9ea6042d-5b5b-4ec9-ae42-48f4239337fd";

export default function SetupAdminPage() {
    const router = useRouter();
    const [status, setStatus] = useState("loading"); // loading | checking | success | error | wrong_user
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const run = async () => {
            setStatus("checking");

            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                setStatus("error");
                setMessage("You must be logged in to use this page.");
                return;
            }

            setUser(user);

            // Check if this is the right user
            if (user.id !== ADMIN_USER_ID) {
                setStatus("wrong_user");
                setMessage(`This setup is only for a specific user. Your ID: ${user.id}`);
                return;
            }

            // Check if already admin
            if (user.user_metadata?.role === "admin") {
                setStatus("success");
                setMessage("You are already an admin! Redirecting to admin dashboard...");
                setTimeout(() => router.push("/admin"), 2000);
                return;
            }

            // Set admin role
            const { error: updateError } = await supabase.auth.updateUser({
                data: { role: "admin" }
            });

            if (updateError) {
                setStatus("error");
                setMessage(`Failed: ${updateError.message}`);
                return;
            }

            setStatus("success");
            setMessage("✅ Admin role set successfully! You now have full access to the Admin Dashboard.");
            setTimeout(() => router.push("/admin"), 3000);
        };

        run();
    }, [router]);

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 font-['public-sans',sans-serif]">
            <div className="bg-white dark:bg-[#0B0F15] rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
                {/* Icon */}
                <div className="mb-6">
                    {status === "loading" || status === "checking" ? (
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                            <Loader2 size={36} className="text-emerald-400 animate-spin" />
                        </div>
                    ) : status === "success" ? (
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle size={36} className="text-green-500" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                            <XCircle size={36} className="text-red-500" />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center gap-2 mb-2">
                    <ShieldCheck size={18} className="text-emerald-400" />
                    <h1 className="text-xl font-black text-gray-900 dark:text-white">Admin Setup</h1>
                </div>

                <p className="text-gray-500 dark:text-[#7C94B0] text-sm mb-6">
                    {status === "loading" || status === "checking"
                        ? "Verifying your identity..."
                        : message}
                </p>

                {user && (
                    <div className="bg-white dark:bg-[#0f151c] rounded-xl px-4 py-3 text-left mb-6">
                        <p className="text-xs text-gray-500 dark:text-[#7C94B0] font-semibold mb-1">Logged in as:</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                        <p className="text-xs text-gray-500 dark:text-[#7C94B0] font-mono truncate">{user.id}</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-semibold bg-green-50 rounded-xl p-3">
                        <Loader2 size={14} className="animate-spin" />
                        Redirecting to Admin Dashboard...
                    </div>
                )}

                {(status === "error" || status === "wrong_user") && (
                    <button
                        onClick={() => router.push("/Home")}
                        className="w-full py-3 bg-[#0F172A] text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-500/100 transition-colors"
                    >
                        Back to Home
                    </button>
                )}
            </div>
        </div>
    );
}
