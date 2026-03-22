"use client";

export default function HeroButtons() {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <button className="w-full md:w-auto px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-[#f97316] hover:bg-[#ea580c] transition-all shadow-[0_4px_14px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 font-inherit">
                Shop Pro-Book
            </button>
            <button className="w-full md:w-auto px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-slate-800/60 hover:bg-slate-800/90 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all hover:-translate-y-0.5 font-inherit">
                Learn More
            </button>
        </div>
    );
}
