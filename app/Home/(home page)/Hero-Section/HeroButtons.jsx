"use client";
import Link from "next/link";

export default function HeroButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/Home"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-[#040608] bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full shadow-[0_4px_24px_rgba(16,185,129,0.4),_inset_0_0_0_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(16,185,129,0.6),_inset_0_0_0_1px_rgba(255,255,255,0.3)]"
            >
                Shop Pro-Book
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 font-['Plus_Jakarta_Sans'] font-bold text-[15px] text-gray-900 dark:text-white bg-white dark:bg-[#0B0F15]/5 border border-white/10 rounded-full backdrop-blur-xl transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(16,185,129,0.2)]">
                Learn More
            </button>
        </div>
    );
}
