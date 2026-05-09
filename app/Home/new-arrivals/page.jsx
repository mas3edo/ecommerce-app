"use client";
import Link from 'next/link';
import { Sparkles, ArrowRight, Filter, ShoppingCart, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/data';

export default function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: false }) // Assuming higher ID means newer
                .limit(6);

            if (!error && data) {
                setProducts(data.map(p => ({
                    ...p,
                    name: p.title || p.name || "Unknown Product",
                    price: p.price ?? 0,
                    category: p.category || "Uncategorized",
                    tag: "New",
                    image: p.image || p.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
                })));
            }
            setLoading(false);
        };
        fetchNewArrivals();
    }, []);

    return (
        <div className="bg-white dark:bg-[#0B0F15] font-['public-sans',sans-serif]">
            {/* Header Section */}
            <section className="bg-white dark:bg-[#0f151c] border-b border-gray-200 dark:border-white/10 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm mb-4">
                                <Sparkles size={16} /> JUST LANDED
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-6 leading-tight uppercase tracking-tight">
                                New Arrivals <br />
                                <span className="text-gray-500 dark:text-[#7C94B0]">Autumn 2026</span>
                            </h1>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                Explore our latest collection of cutting-edge technology. From the newest foldable phones to next-gen computing, be the first to own the future.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors">
                                <Filter size={18} /> Filter
                            </button>
                            <div className="text-sm font-bold text-gray-500 dark:text-[#7C94B0]">
                                {products.length}+ Products Found
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-[32px]" />
                        ))
                    ) : (
                        products.map((p) => (
                            <div key={p.id} className="group flex flex-col">
                                <div className="aspect-[4/5] bg-white dark:bg-[#0f151c] rounded-[32px] overflow-hidden relative mb-6 border border-gray-200 dark:border-white/5 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Overlay Badges */}
                                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                                        <span className="bg-white dark:bg-[#0B0F15] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                            {p.tag}
                                        </span>
                                        <span className="bg-[#0F172A] text-gray-900 dark:text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            {p.category}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="flex-1 h-12 bg-white dark:bg-[#0B0F15] text-[#0F172A] font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl hover:bg-white dark:bg-[#0f151c]">
                                            <ShoppingCart size={18} /> Add to Cart
                                        </button>
                                        <Link href={`/product/${p.id}`} className="w-12 h-12 bg-[#0F172A] text-gray-900 dark:text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-slate-800">
                                            <Eye size={18} />
                                        </Link>
                                    </div>
                                </div>

                                <div className="px-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight truncate max-w-[70%]">{p.name}</h3>
                                        <span className="text-xl font-black text-emerald-600">${p.price}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm mb-6 line-clamp-2">Experience the next generation of {p.category.toLowerCase()} with premium features and sleek design.</p>
                                    <Link href={`/product/${p.id}`} className="inline-flex items-center gap-2 text-sm font-black text-[#0F172A] hover:gap-4 transition-all uppercase tracking-widest">
                                        View Details <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-20 flex justify-center">
                    <button className="px-12 py-5 border-2 border-[#0F172A] text-[#0F172A] font-black rounded-2xl hover:bg-[#0F172A] hover:text-gray-900 dark:text-white transition-all uppercase tracking-widest">
                        Load More Products
                    </button>
                </div>
            </section>

            {/* Newsletter */}
            <section className="max-w-7xl mx-auto px-6 pb-20">
                <div className="bg-emerald-500 rounded-[40px] p-10 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight leading-tight">Never Miss a <br /> Drop Again</h2>
                        <p className="text-emerald-100 mb-10 text-lg">Sign up for our newsletter and get notified about upcoming product launches and exclusive pre-orders.</p>
                        <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 h-16 px-8 rounded-2xl bg-white dark:bg-[#0B0F15] border-0 focus:ring-4 focus:ring-white/20 outline-none font-bold placeholder:text-gray-500 dark:text-[#7C94B0]"
                            />
                            <button className="h-16 px-10 bg-[#0F172A] text-gray-900 dark:text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-black/20">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
