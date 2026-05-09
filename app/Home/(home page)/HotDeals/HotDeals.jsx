"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/data";
import { useStore } from "../../../store/store";
import Link from "next/link";
import { Zap, Timer, Heart, ShoppingCart, Star, ArrowRight } from "lucide-react";

export default function HotDeals() {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ h: 5, m: 59, s: 30 });

    const addToCart = useStore(s => s.addToCart);
    const toggleFavorite = useStore(s => s.toggleFavorite);
    const favorites = useStore(s => s.favorites || []);

    // Countdown timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                let { h, m, s } = prev;
                s--;
                if (s < 0) { s = 59; m--; }
                if (m < 0) { m = 59; h--; }
                if (h < 0) { h = 5; m = 59; s = 59; }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetch = async () => {
            // Fetch any products — show first 4 as deals
            const { data } = await supabase
                .from("products")
                .select("*")
                .limit(4);

            if (data && data.length > 0) {
                setDeals(data.map((p, i) => ({
                    ...p,
                    title: p.title || p.name,
                    image: p.image || p.image_url,
                    // Use original_price if it exists, otherwise create a simulated one
                    originalPrice: p.original_price || p.originalPrice || (i % 2 === 0 ? p.price * 1.3 : null),
                })));
            } else {
                // Fallback static deals
                setDeals([
                    {
                        id: "deal-1",
                        title: "SonicFlow Z-9 Headphones",
                        description: "Premium ANC with 60h battery life.",
                        price: 199.99,
                        originalPrice: 299.99,
                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
                        rating: 5, reviews: 248,
                    },
                    {
                        id: "deal-2",
                        title: "Pixel X Ultra 256GB",
                        description: "Revolutionary camera with night vision.",
                        price: 699.00,
                        originalPrice: 999.00,
                        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
                        rating: 5, reviews: 542,
                    },
                    {
                        id: "deal-3",
                        title: "VividView 4K Monitor",
                        description: "Ultra-wide color gamut for creators.",
                        price: 349.00,
                        originalPrice: 499.00,
                        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop",
                        rating: 4, reviews: 156,
                    },
                    {
                        id: "deal-4",
                        title: "FitTrack Elite Pro",
                        description: "Health tracking with ECG monitoring.",
                        price: 129.50,
                        originalPrice: 189.50,
                        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
                        rating: 5, reviews: 89,
                    },
                ]);
            }
            setLoading(false);
        };
        fetch();
    }, []);

    const pad = n => String(n).padStart(2, "0");

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4 flex-wrap">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Zap size={20} style={{color:'#A78BFA'}} fill="currentColor" />
                            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.875rem',fontWeight:700,color:'#F1F5F9',letterSpacing:'-0.03em',margin:0}}>Hot Deals</h2>
                        </div>
                        <p style={{color:'#64748B',fontSize:'0.9375rem',margin:0}}>Limited time offers — grab them before they're gone!</p>
                    </div>

                    {/* Countdown */}
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl" style={{background:'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.05))',border:'1px solid rgba(139,92,246,0.2)'}}>
                        <Timer size={14} style={{color:'#06B6D4'}} className="shrink-0" />
                        <span className="text-xs font-semibold text-slate-400 mr-1">Ends in</span>
                        {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((v, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <span className="px-2 py-1 rounded-lg font-mono font-black text-sm text-gray-900 dark:text-white min-w-[32px] text-center" style={{background:'rgba(139,92,246,0.2)',boxShadow:'0 0 10px rgba(139,92,246,0.2)'}}>{v}</span>
                                {i < 2 && <span style={{color:'#8B5CF6'}} className="font-black text-xs">:</span>}
                            </span>
                        ))}
                    </div>
                </div>

                <Link href="/Home/deals" style={{display:'flex',alignItems:'center',gap:'6px',color:'#8B5CF6',fontWeight:600,fontSize:'14px',textDecoration:'none'}} className="group shrink-0 hover:text-indigo-400 transition-colors">
                    View All Deals <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {loading
                    ? [...Array(4)].map((_, i) => (
                        <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-72" />
                    ))
                    : deals.map((product) => {
                        const discount = product.originalPrice
                            ? Math.round((1 - product.price / product.originalPrice) * 100)
                            : 0;
                        const isFav = favorites.some(f => f.id === product.id);

                        return (
                            <div key={product.id} className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 glass-card">
                                {/* Discount Badge */}
                                {discount > 0 && (
                                    <div className="absolute top-3 left-3 z-10 text-gray-900 dark:text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-sm" style={{background:'linear-gradient(135deg,#8B5CF6,#6366F1)'}}>
                                        -{discount}%
                                    </div>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all`}
                                    style={{background: isFav ? 'linear-gradient(135deg,#EF4444,#B91C1C)' : 'rgba(255,255,255,0.05)',color: isFav ? 'white' : '#64748B',backdropFilter:'blur(4px)',border: isFav ? 'none' : '1px solid rgba(255,255,255,0.1)'}}
                                >
                                    <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                                </button>

                                {/* Image */}
                                <Link href={`/product/${product.id}`} className="block">
                                    <div className="aspect-square flex items-center justify-center p-6 overflow-hidden" style={{background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(139,92,246,0.1)'}}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>

                                <div className="p-4">
                                    {/* Stars */}
                                    <div className="flex text-[#facc15] mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < (product.rating || 5) ? "currentColor" : "none"} className={i < (product.rating || 5) ? "text-[#facc15]" : "text-gray-200"} />
                                        ))}
                                        <span className="text-[11px] text-gray-500 dark:text-[#7C94B0] ml-1.5 font-medium">({product.reviews})</span>
                                    </div>

                                    <Link href={`/product/${product.id}`} style={{textDecoration:'none'}}>
                                        <h3 className="font-bold text-sm leading-tight mb-2 hover:text-indigo-400 transition-colors line-clamp-2" style={{color:'#F1F5F9',fontFamily:"'Space Grotesk',sans-serif"}}>{product.title}</h3>
                                    </Link>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-lg font-extrabold" style={{color:'#A78BFA'}}>${Number(product.price).toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-gray-500 dark:text-[#7C94B0] line-through font-medium">${Number(product.originalPrice).toFixed(2)}</span>
                                        )}
                                    </div>

                                    {/* Add to Cart */}
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full py-2.5 text-gray-900 dark:text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                                        style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(139,92,246,0.3)',fontFamily:"'Space Grotesk',sans-serif"}}
                                        onMouseEnter={e=>{e.currentTarget.style.background='linear-gradient(135deg,#8B5CF6,#6366F1)';e.currentTarget.style.boxShadow='0 4px 16px rgba(139,92,246,0.4)'}}
                                        onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.boxShadow='none'}}
                                    >
                                        <ShoppingCart size={15} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}
