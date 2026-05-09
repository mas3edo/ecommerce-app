"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/data";
import { useStore } from "../../../store/store";
import Link from "next/link";
import { TrendingUp, ShoppingCart, Heart, Star, ArrowLeft, ArrowRight } from "lucide-react";

export default function BestSellers() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollRef, setScrollRef] = useState(null);

    const addToCart = useStore(s => s.addToCart);
    const toggleFavorite = useStore(s => s.toggleFavorite);
    const favorites = useStore(s => s.favorites || []);
    const cart = useStore(s => s.cart || []);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await supabase
                .from("products")
                .select("*")
                .order("id", { ascending: true })
                .limit(8);

            if (data && data.length > 0) {
                setProducts(data.map(p => ({
                    ...p,
                    title: p.title || p.name,
                    image: p.image || p.image_url,
                })));
            } else {
                setProducts([
                    {
                        id: "bs-1",
                        title: "Nexus RGB Mechanical Keyboard",
                        price: 145.00,
                        rating: 5, reviews: 842,
                        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
                        category: "Gaming"
                    },
                    {
                        id: "bs-2",
                        title: "SwiftPoint Pro Wireless Mouse",
                        price: 89.99,
                        rating: 4, reviews: 631,
                        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
                        category: "Accessories"
                    },
                    {
                        id: "bs-3",
                        title: "ProBook X1 Laptop",
                        price: 1299.00,
                        rating: 5, reviews: 398,
                        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop",
                        category: "Laptops"
                    },
                    {
                        id: "bs-4",
                        title: "SonicFlow Z-9 Headphones",
                        price: 299.99,
                        rating: 5, reviews: 248,
                        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
                        category: "Audio"
                    },
                    {
                        id: "bs-5",
                        title: "GoPro Hero 12 Camera",
                        price: 399.00,
                        rating: 4, reviews: 512,
                        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
                        category: "Cameras"
                    },
                    {
                        id: "bs-6",
                        title: "Pixel X Ultra 256GB",
                        price: 849.00,
                        rating: 5, reviews: 310,
                        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
                        category: "Smartphones"
                    },
                ]);
            }
            setLoading(false);
        };
        fetch();
    }, []);

    const scroll = (dir) => {
        if (scrollRef) scrollRef.scrollBy({ left: dir * 300, behavior: "smooth" });
    };

    return (
        <section className="py-14 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp size={20} style={{color:'#06B6D4'}} />
                            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:'1.875rem',fontWeight:700,color:'#F1F5F9',letterSpacing:'-0.03em',margin:0}}>Best Sellers</h2>
                        </div>
                        <p style={{color:'#64748B',fontSize:'0.9375rem',margin:0}}>Most loved products by our community.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll(-1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                            style={{border:'1px solid rgba(139,92,246,0.2)',color:'#64748B',background:'rgba(255,255,255,0.02)'}}
                            onMouseEnter={e=>{e.currentTarget.style.color='#8B5CF6';e.currentTarget.style.borderColor='rgba(139,92,246,0.6)';e.currentTarget.style.background='rgba(139,92,246,0.1)'}}
                            onMouseLeave={e=>{e.currentTarget.style.color='#64748B';e.currentTarget.style.borderColor='rgba(139,92,246,0.2)';e.currentTarget.style.background='rgba(255,255,255,0.02)'}}
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <button
                            onClick={() => scroll(1)}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                            style={{border:'1px solid rgba(139,92,246,0.2)',color:'#64748B',background:'rgba(255,255,255,0.02)'}}
                            onMouseEnter={e=>{e.currentTarget.style.color='#8B5CF6';e.currentTarget.style.borderColor='rgba(139,92,246,0.6)';e.currentTarget.style.background='rgba(139,92,246,0.1)'}}
                            onMouseLeave={e=>{e.currentTarget.style.color='#64748B';e.currentTarget.style.borderColor='rgba(139,92,246,0.2)';e.currentTarget.style.background='rgba(255,255,255,0.02)'}}
                        >
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Scrollable Cards */}
            <div
                ref={el => setScrollRef(el)}
                className="flex gap-5 overflow-x-auto no-scrollbar px-6 max-w-7xl mx-auto pb-2"
            >
                {loading
                    ? [...Array(5)].map((_, i) => (
                        <div key={i} className="w-56 shrink-0 rounded-2xl bg-gray-100 animate-pulse h-72" />
                    ))
                    : products.map((product, idx) => {
                        const isFav = favorites.some(f => f.id === product.id);
                        const inCart = cart.some(c => c.id === product.id);
                        return (
                            <div key={product.id} className="w-56 shrink-0 group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 relative glass-card">
                                {/* Rank Badge */}
                                <div className="absolute top-3 left-3 z-10 w-7 h-7 text-gray-900 dark:text-white text-xs font-black rounded-full flex items-center justify-center"
                                    style={{background:'linear-gradient(135deg,#8B5CF6,#6366F1)',boxShadow:'0 0 10px rgba(139,92,246,0.4)'}}>
                                    #{idx + 1}
                                </div>

                                {/* Fav */}
                                <button
                                    onClick={() => toggleFavorite(product)}
                                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all`}
                                    style={{background: isFav ? 'linear-gradient(135deg,#EF4444,#B91C1C)' : 'rgba(255,255,255,0.05)',color: isFav ? 'white' : '#64748B',backdropFilter:'blur(4px)',border: isFav ? 'none' : '1px solid rgba(255,255,255,0.1)'}}
                                >
                                    <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                                </button>

                                <Link href={`/product/${product.id}`}>
                                    <div className="aspect-square flex items-center justify-center p-5 overflow-hidden" style={{background:'rgba(255,255,255,0.02)',borderBottom:'1px solid rgba(139,92,246,0.1)'}}>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>

                                <div className="p-4">
                                    {product.category && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{color:'#06B6D4'}}>{product.category}</span>
                                    )}
                                    <Link href={`/product/${product.id}`} style={{textDecoration:'none'}}>
                                        <h3 className="font-bold text-sm mt-0.5 mb-2 leading-tight line-clamp-2 transition-colors hover:text-indigo-400" style={{color:'#F1F5F9',fontFamily:"'Space Grotesk',sans-serif"}}>{product.title}</h3>
                                    </Link>
                                    <div className="flex text-[#facc15] mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={10} fill={i < (product.rating || 5) ? "currentColor" : "none"} className={i < (product.rating || 5) ? "text-[#facc15]" : "text-gray-500 dark:text-[#7C94B0]"} />
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="font-extrabold text-base" style={{color:'#A78BFA'}}>${Number(product.price).toFixed(2)}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                                            style={{
                                                background: inCart ? 'linear-gradient(135deg,#8B5CF6,#6366F1)' : 'rgba(255,255,255,0.05)',
                                                color: inCart ? 'white' : '#E2E8F0',
                                                border: inCart ? 'none' : '1px solid rgba(139,92,246,0.3)',
                                                boxShadow: inCart ? '0 0 12px rgba(139,92,246,0.4)' : 'none'
                                            }}
                                            onMouseEnter={!inCart ? e=>{e.currentTarget.style.background='linear-gradient(135deg,#8B5CF6,#6366F1)';e.currentTarget.style.border='none'} : undefined}
                                            onMouseLeave={!inCart ? e=>{e.currentTarget.style.background='rgba(255,255,255,0.05)';e.currentTarget.style.border='1px solid rgba(139,92,246,0.3)'} : undefined}
                                        >
                                            <ShoppingCart size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}
