"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { Heart, ShoppingCart, Star, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Star rating component (reused from CategoryContent)
const StarRating = ({ rating, count }) => {
    const filledStars = Math.floor(rating || 5);
    return (
        <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-[#facc15]">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        fill={i < filledStars ? "currentColor" : "none"}
                        className={i < filledStars ? "text-[#facc15]" : "text-gray-300"}
                    />
                ))}
            </div>
            <span className="text-xs text-[#64748B] font-medium">({count || '0'} reviews)</span>
        </div>
    );
};

export default function FavoritePage() {
    const [mounted, setMounted] = useState(false);
    
    const favorites = useStore(state => state.favorites || []);
    const toggleFavorite = useStore(state => state.toggleFavorite);
    const clearFavorites = useStore(state => state.clearFavorites);
    const cart = useStore(state => state.cart || []);
    const addToCart = useStore(state => state.addToCart);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 font-['public-sans',sans-serif]">
            <div className="max-w-7xl mx-auto px-6">
                <Link href="/Home" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-semibold mb-6 transition-colors">
                    <ArrowLeft size={18} />
                    Back to Shop
                </Link>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight mb-2">Your Wishlist</h1>
                        <p className="text-[#64748B] text-base">You have {favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}</p>
                    </div>
                    {favorites.length > 0 && (
                        <button 
                            onClick={clearFavorites} 
                            className="px-4 py-2 text-sm font-semibold text-red-500 hover:text-white border border-red-500 hover:bg-red-500 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Clear All
                        </button>
                    )}
                </div>

                {favorites.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                            <Heart size={32} strokeWidth={2} fill="currentColor" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Found something you like? Tap the heart icon on any product to save it here for later.</p>
                        <Link href="/Home" className="px-8 py-3.5 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-[#1e293b] transition-colors shadow-lg">
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((product) => {
                            const isFavorite = true; // They are in this list because they are favorites
                            const inCart = cart.some((item) => item.id === product.id);

                            return (
                                <Link
                                    href={`/product/${product.id}`}
                                    key={product.id}
                                    className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-red-100 relative cursor-pointer block"
                                >
                                    <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-xl mb-5 overflow-hidden flex items-center justify-center mix-blend-multiply">
                                        {(product.isHotDeal || product.originalPrice) && (
                                            <div className="absolute top-3 left-3 z-10 bg-[#f97316] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                                                HOT DEAL
                                            </div>
                                        )}

                                        <button 
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
                                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all bg-red-50 text-red-500 hover:bg-white hover:text-gray-400 group/fav"
                                            title="Remove from favorites"
                                        >
                                            <Heart size={16} strokeWidth={2} fill={isFavorite ? "currentColor" : "none"} className="group-hover/fav:fill-none" />
                                        </button>

                                        <img
                                            src={product.image || product.image_url}
                                            alt={product.title || product.name}
                                            className="w-[85%] h-[85%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <StarRating rating={product.rating} count={product.reviews} />

                                        <h3 className="text-[#0F172A] font-bold text-[17px] mb-1.5 leading-tight truncate">
                                            {product.title || product.name}
                                        </h3>

                                        <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2 mb-6">
                                            {product.description || "Premium high-quality gadget"}
                                        </p>

                                        <div className="flex flex-col mt-auto gap-4">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-extrabold text-[#ea580c]">
                                                    ${Number(product.price).toFixed(2)}
                                                </span>
                                                {(product.originalPrice || product.original_price) && (
                                                    <span className="text-xs text-[#94a3b8] line-through font-medium">
                                                        ${Number(product.originalPrice || product.original_price).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>

                                            <button 
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                                                className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all duration-200 active:translate-y-0.5 ${inCart ? 'bg-orange-100 text-[#ea580c] border border-orange-200 hover:bg-orange-200 cursor-default' : 'bg-[#0f172a] text-white hover:bg-[#1e293b] hover:shadow-lg'}`}
                                            >
                                                {inCart ? (
                                                    <>Added to Cart <ShoppingCart size={16} fill="currentColor" /></>
                                                ) : (
                                                    <>Add to Cart <ShoppingCart size={16} /></>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
