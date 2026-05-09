import { Zap } from "lucide-react";
import HeroButtons from "./HeroButtons";

export default function Hero() {
    return (
        <section className="px-4 sm:px-6 pt-6 pb-2 max-w-7xl mx-auto float-anim">
            <div className="relative w-full min-h-[520px] md:min-h-[560px] rounded-[32px] overflow-hidden flex items-center"
                style={{ boxShadow: '0 0 0 1px rgba(16,185,129,0.2), 0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(16,185,129,0.15)' }}>

                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Pro-Book X1"
                        className="w-full h-full object-cover object-center scale-105 transition-transform duration-[10s] hover:scale-100"
                    />
                    {/* Multi-layer dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/95 dark:from-[#040608]/70 dark:to-[#040608]/98" />
                    <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-white/95 via-white/80 to-transparent dark:from-[#040608]/98 dark:via-[#040608]/85 dark:to-transparent" />

                    {/* Neon glow orbs */}
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none float-anim"
                        style={{background:'radial-gradient(circle,rgba(16,185,129,0.15) 0%,transparent 70%)',filter:'blur(50px)'}} />
                    <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none float-anim"
                        style={{background:'radial-gradient(circle,rgba(6,182,212,0.15) 0%,transparent 70%)',filter:'blur(50px)', animationDelay: '2s'}} />

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{backgroundImage:'linear-gradient(rgba(16,185,129,1) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,1) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 pt-[160px] md:p-[64px] max-w-full md:max-w-[700px] text-gray-900 dark:text-white flex flex-col justify-end md:justify-center h-full animate-[fadeUp_0.8s_ease-out]">

                    {/* Neon Badge */}
                    <div className="inline-flex items-center gap-2 mb-7 w-fit neon-badge">
                        <Zap size={14} className="text-emerald-400" fill="currentColor" />
                        <span>NEW RELEASE: PRO-BOOK X1</span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-['Outfit'] font-black leading-[1.05] tracking-tight mb-6" style={{fontSize:'clamp(2.5rem, 5vw, 4.2rem)'}}>
                        Power for the{' '}
                        <span className="brand-text block mt-2">
                            Next Generation
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="font-['Plus_Jakarta_Sans'] text-lg text-gray-700 dark:text-[#DFE6EE] mb-10 max-w-[440px] leading-relaxed">
                        Experience lightning-fast performance and stunning visuals.
                        Powered by the all-new Quantum-M3 chip, redefining what's possible.
                    </p>

                    <HeroButtons />
                </div>
            </div>
        </section>
    );
}
