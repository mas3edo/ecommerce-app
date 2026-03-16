import { Sparkles } from "lucide-react";
import HeroButtons from "./HeroButtons";

export default function Hero() {
    return (
        <section className="p-6 max-w-7xl mx-auto font-['public-sans',sans-serif]">
            <div className="relative w-full min-h-[480px] md:min-h-[500px] rounded-[20px] md:rounded-3xl overflow-hidden flex items-center shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Pro-Book X1 Background"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.4)_0%,rgba(15,23,42,0.95)_100%)] md:bg-[linear-gradient(90deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,0.7)_40%,rgba(15,23,42,0.2)_100%)]"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 pt-[150px] md:p-[60px] max-w-full md:max-w-[650px] text-white flex flex-col justify-end md:justify-center h-full">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-[#ea580c26] border border-[#ea580c4d] text-[#f97316] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.5px] mb-6 w-fit">
                        <Sparkles size={14} className="text-[#ea580c]" />
                        <span>NEW RELEASE: PRO-BOOK X1</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[40px] md:text-[56px] font-[800] leading-[1.1] mb-6 tracking-[-1px]">
                        Power for the <br />
                        <span className="text-[#f97316]">Next Generation</span>
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-lg leading-[1.6] text-slate-300 mb-10 font-normal">
                        Experience lightning-fast performance and stunning visuals.<br />
                        Powered by the all-new Quantum-M3 chip.
                    </p>

                    {/* CTA Buttons - Separated as a Client Component */}
                    <HeroButtons />

                </div>
            </div>
        </section>
    );
}
