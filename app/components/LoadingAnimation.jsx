import { Zap } from "lucide-react";

export default function LoadingAnimation() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#0B0F15]/70 backdrop-blur-xl transition-all duration-500">
            {/* Animated Logo Container */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-white dark:bg-[#0B0F15] p-6 rounded-[2.5rem] shadow-2xl border border-emerald-50/50">
                    <Zap size={48} className="text-[#10B981] animate-bounce" fill="currentColor" />
                </div>
            </div>

            {/* Brand & Progress Name */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl font-black text-[#0F172A] tracking-tighter uppercase italic">
                        Tech<span className="text-emerald-400">Flow</span>
                    </span>
                </div>
                
                {/* Modern Progress Line */}
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
                    <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full animate-progress-loading"></div>
                </div>
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                    Synchronizing Experience
                </p>
            </div>

        </div>
    );
}
