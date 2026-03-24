import { Zap } from "lucide-react";

export default function LoadingAnimation() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl transition-all duration-500">
            {/* Animated Logo Container */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl border border-orange-50/50">
                    <Zap size={48} className="text-[#EA580C] animate-bounce" fill="currentColor" />
                </div>
            </div>

            {/* Brand & Progress Name */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl font-black text-[#0F172A] tracking-tighter uppercase italic">
                        Tech<span className="text-orange-500">Flow</span>
                    </span>
                </div>
                
                {/* Modern Progress Line */}
                <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
                    <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-progress-loading"></div>
                </div>
                <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                    Synchronizing Experience
                </p>
            </div>

        </div>
    );
}
