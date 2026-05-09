"use client";
import Link from 'next/link';
import { Ticket, Timer, Zap, Percent, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/data';

export default function Deals() {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeals = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .limit(4); // Just take 4 for hot deals section

            if (!error && data) {
                setDeals(data.map(p => ({
                    ...p,
                    title: p.title || p.name || "Unknown Product",
                    price: p.price ?? 0,
                    oldPrice: p.original_price || (p.price * 1.2), // Fallback old price
                    image: p.image || p.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                })));
            }
            setLoading(false);
        };
        fetchDeals();

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else if (minutes > 0) { minutes--; seconds = 59; }
                else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white dark:bg-[#0f151c] pb-20 font-['public-sans',sans-serif]">
            {/* Hero Section */}
            <section className="bg-emerald-500 py-16 md:py-24 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 text-gray-900 dark:text-white text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white dark:bg-[#0B0F15]/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                                <Zap size={14} fill="currentColor" /> MEGA FLASH SALE
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                Tech Savings <br />
                                <span className="text-emerald-950">Like Never Before</span>
                            </h1>
                            <p className="text-emerald-50 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
                                Get up to 60% off on premium smartphones, laptops, and audio gear. Limited time only!
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="bg-white dark:bg-[#0B0F15]/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl flex flex-col items-center min-w-[100px]">
                                    <span className="text-3xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                                    <span className="text-xs font-bold opacity-70 uppercase tracking-widest">hours</span>
                                </div>
                                <div className="bg-white dark:bg-[#0B0F15]/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl flex flex-col items-center min-w-[100px]">
                                    <span className="text-3xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                                    <span className="text-xs font-bold opacity-70 uppercase tracking-widest">mins</span>
                                </div>
                                <div className="bg-white dark:bg-[#0B0F15]/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl flex flex-col items-center min-w-[100px]">
                                    <span className="text-3xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                                    <span className="text-xs font-bold opacity-70 uppercase tracking-widest">secs</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-emerald-400/30 rounded-full absolute -top-10 -right-10 blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop"
                                alt="Deals"
                                className="relative z-10 w-full max-w-[500px] h-auto rounded-3xl shadow-2xl rotate-3"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Exclusive Coupons */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { code: "TECHFLOW10", discount: "10%", desc: "On All Smartphones", color: "from-blue-600 to-indigo-700" },
                        { code: "LAPTOP300", discount: "$300", desc: "Off Selected Laptops", color: "from-purple-600 to-pink-700" },
                        { code: "AUDIO50", discount: "50%", desc: "On Wireless Audio", color: "from-emerald-600 to-teal-700" },
                    ].map((coupon, idx) => (
                        <div key={idx} className={`bg-gradient-to-br ${coupon.color} p-8 rounded-3xl text-gray-900 dark:text-white shadow-xl relative overflow-hidden group`}>
                            <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                                <Ticket size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="text-4xl font-black mb-2">{coupon.discount} OFF</div>
                                <p className="opacity-80 font-medium mb-6">{coupon.desc}</p>
                                <div className="flex items-center justify-between bg-white dark:bg-[#0B0F15]/20 backdrop-blur-md rounded-xl p-3 border border-white/30">
                                    <span className="font-mono font-bold tracking-widest">{coupon.code}</span>
                                    <button className="text-[11px] font-black uppercase tracking-tighter bg-white dark:bg-[#0B0F15] text-gray-900 dark:text-white px-3 py-1.5 rounded-lg">Copy</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Hot Categories */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-[#0F172A] mb-2 leading-none uppercase tracking-tight">Today's Hot Deals</h2>
                        <p className="text-slate-500">Pick from our curated list of daily essentials.</p>
                    </div>
                    <Link href="/Home/category/smartphones" className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors group">
                        See All Deals <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-[#0B0F15] rounded-3xl h-[400px] animate-pulse" />
                        ))
                    ) : (
                        deals.map((p, i) => (
                            <div key={i} className="bg-white dark:bg-[#0B0F15] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                                <div className="aspect-[4/3] relative overflow-hidden bg-[#f0f9ff]">
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 bg-red-500/100 text-gray-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded uppercase">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 truncate">{p.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-[#0f172a]">${p.price}</span>
                                            <span className="text-xs text-gray-500 dark:text-[#7C94B0] line-through">${p.oldPrice.toFixed(0)}</span>
                                        </div>
                                        <Link href={`/product/${p.id}`} className="w-10 h-10 rounded-xl bg-emerald-600 text-gray-900 dark:text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-colors">
                                            <ShoppingBag size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Membership Perk */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-[#0f172a] rounded-[40px] p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Become a TechFlow Elite</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
                                Join our membership program to unlock early access to sales, free shipping, and exclusive member-only pricing.
                            </p>
                            <button className="px-10 py-5 bg-emerald-600 text-gray-900 dark:text-white font-black rounded-2xl shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:translate-y-0">
                                JOIN NOW — IT'S FREE
                            </button>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            {[
                                { icon: <Percent size={24} />, title: "Extra 5% Off", desc: "On every order" },
                                { icon: <ShoppingBag size={24} />, title: "Free Shipping", desc: "No minimum spend" },
                                { icon: <Timer size={24} />, title: "Early Access", desc: "48h before anyone" },
                                { icon: <Zap size={24} />, title: "Flash Rewards", desc: "Exclusive monthly items" },
                            ].map((perk, i) => (
                                <div key={i} className="bg-white dark:bg-[#0B0F15]/5 border border-white/10 p-6 rounded-[32px] hover:bg-white dark:bg-[#0B0F15]/10 transition-colors">
                                    <div className="w-12 h-12 bg-emerald-600/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-4">
                                        {perk.icon}
                                    </div>
                                    <h4 className="text-gray-900 dark:text-white font-bold mb-1">{perk.title}</h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">{perk.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}