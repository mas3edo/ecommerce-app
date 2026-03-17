
export default function Join() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative overflow-hidden rounded-3xl bg-[#FAE8DD] p-8 md:p-12 lg:p-16 flex items-center justify-between">

                {/* Text & Form Wrapper */}
                <div className="relative z-10 max-w-2xl w-full">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
                        Join the Tech Revolution
                    </h2>

                    <p className="text-[#4B5563] text-lg font-medium mb-8 leading-relaxed max-w-xl">
                        Subscribe to our newsletter and get <span className="text-[#EA580C] font-semibold">15% off</span> your first order. Stay ahead with the latest gadget updates.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-4 max-w-lg" >
                        <div className="flex-grow">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-12 md:h-14 px-5 rounded-xl border border-transparent focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 outline-none text-[#111827] bg-white shadow-sm transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="h-12 md:h-14 px-8 rounded-xl bg-[#EA580C] hover:bg-[#D94E07] text-white font-semibold transition-colors duration-300 shadow-sm whitespace-nowrap"
                        >
                            Subscribe Now
                        </button>
                    </div>

                    <p className="text-sm text-[#9CA3AF] font-medium">
                        By subscribing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>

                {/* Decorative Envelope Icon on the Right */}
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 pointer-events-none hidden md:block">
                    <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 4 10 8 10-8" />
                    </svg>
                </div>
            </div>
        </section>
    );
}