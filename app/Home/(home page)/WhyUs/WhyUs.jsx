"use client";

import Link from "next/link";
import { Shield, Truck, RefreshCw, Headphones, CreditCard, Star } from "lucide-react";
import { useTheme } from "next-themes";

const BRANDS = [
    { name: "Apple", color: "#F1F5F9", bg: "rgba(255,255,255,0.05)", letter: "🍎" },
    { name: "Samsung", color: "#3B82F6", bg: "rgba(59,130,246,0.1)", letter: "S" },
    { name: "Sony", color: "#F1F5F9", bg: "rgba(255,255,255,0.05)", letter: "S" },
    { name: "Dell", color: "#0EA5E9", bg: "rgba(14,165,233,0.1)", letter: "D" },
    { name: "LG", color: "#E11D48", bg: "rgba(225,29,72,0.1)", letter: "LG" },
    { name: "Logitech", color: "#06B6D4", bg: "rgba(6,182,212,0.1)", letter: "L" },
];

const TRUST = [
    {
        icon: <Truck size={24} />,
        title: "Free Shipping",
        desc: "On all orders over $100",
        color: "#06B6D4", // Cyan
    },
    {
        icon: <Shield size={24} />,
        title: "2-Year Warranty",
        desc: "Full coverage on all products",
        color: "#22C55E", // Green
    },
    {
        icon: <RefreshCw size={24} />,
        title: "30-Day Returns",
        desc: "Hassle-free return policy",
        color: "#8B5CF6", // Violet
    },
    {
        icon: <Headphones size={24} />,
        title: "24/7 Support",
        desc: "Expert help whenever you need",
        color: "#F43F5E", // Rose
    },
    {
        icon: <CreditCard size={24} />,
        title: "Secure Checkout",
        desc: "256-bit SSL encryption",
        color: "#14B8A6", // Teal
    },
    {
        icon: <Star size={24} />,
        title: "Top Rated",
        desc: "4.9★ from 50k+ customers",
        color: "#FACC15", // Yellow
    },
];

export default function WhyUs() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <>
            {/* ── TRUST BADGES ── */}
            <section
                className="py-14"
                style={{
                    borderTop: isDark ? "1px solid rgba(139,92,246,0.1)" : "1px solid rgba(15,23,42,0.08)",
                    borderBottom: isDark ? "1px solid rgba(139,92,246,0.1)" : "1px solid rgba(15,23,42,0.08)",
                    background: isDark
                        ? "linear-gradient(90deg, rgba(7,8,15,1) 0%, rgba(13,14,26,1) 50%, rgba(7,8,15,1) 100%)"
                        : "transparent",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-10">
                        <h2
                            className="text-gray-900 dark:text-white"
                            style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 6px' }}
                        >
                            Why Shop With Us?
                        </h2>
                        <p style={{color:'#64748B',fontSize:'0.9375rem',margin:0}}>We go above and beyond for every customer.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {TRUST.map((item) => (
                            <div key={item.title} className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl transition-all duration-300 group"
                                style={{
                                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.03)',
                                    border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(15,23,42,0.08)',
                                }}
                                onMouseEnter={e=>{
                                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.05)';
                                    e.currentTarget.style.borderColor = `${item.color}40`;
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e=>{
                                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(15,23,42,0.03)';
                                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.08)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                                    style={{background:`${item.color}15`,color:item.color,boxShadow:`0 0 12px ${item.color}20`}}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-sm dark:text-white text-gray-900" style={{fontFamily:"'Space Grotesk',sans-serif"}}>{item.title}</p>
                                    <p className="text-xs mt-1 leading-relaxed dark:text-gray-400 text-gray-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED BRANDS ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
                <div className="text-center mb-10">
                    <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.875rem',fontWeight:700,letterSpacing:'-0.03em',margin:'0 0 6px'}} className="text-gray-900 dark:text-white">
                        Top Brands We Carry
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400" style={{fontSize:'0.9375rem',margin:0}}>Authorized dealer of the world's leading tech brands.</p>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {BRANDS.map((brand) => (
                        (() => {
                            const fg = isDark
                                ? brand.color
                                : (brand.color === "#F1F5F9" ? "#0F172A" : brand.color);
                            const bg = isDark
                                ? brand.bg
                                : (brand.bg === "rgba(255,255,255,0.05)" ? "rgba(15,23,42,0.06)" : brand.bg);

                            return (
                        <Link
                            key={brand.name}
                            href={`/Home/smartphones`}
                            className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl transition-all duration-300 group glass-card"
                            style={{textDecoration:'none'}}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black transition-transform duration-300 group-hover:scale-110"
                                style={{ background: bg, color: fg }}
                            >
                                {brand.letter}
                            </div>
                            <span className="text-sm font-bold transition-colors dark:text-gray-200 text-gray-700" style={{fontFamily:"'Space Grotesk',sans-serif"}}>{brand.name}</span>
                        </Link>
                            );
                        })()
                    ))}
                </div>
            </section>
        </>
    );
}
