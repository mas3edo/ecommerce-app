"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { useStore } from "../../../store/store";
import Link from "next/link";

const StarRating = ({ rating, count }) => {
    // Round to nearest half for display
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

export default function TrendingGrid({ displayProducts }) {
    const addToCart = useStore(state => state.addToCart);
    const cart = useStore(state => state.cart || []);
    const toggleFavorite = useStore(state => state.toggleFavorite);
    const favorites = useStore(state => state.favorites || []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => {
                const isFavorite = favorites.some((fav) => fav.id === product.id);
                const inCart = cart.some((item) => item.id === product.id);

                return (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-orange-100 relative cursor-pointer block"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-xl mb-5 overflow-hidden flex items-center justify-center mix-blend-multiply">
                            {/* Hot Deal Badge */}
                            {(product.isHotDeal || product.originalPrice) && (
                                <div className="absolute top-3 left-3 z-10 bg-[#f97316] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                                    HOT DEAL
                                </div>
                            )}

                            {/* Favorite Button */}
                            <button
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
                                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'}`}
                            >
                                <Heart size={16} strokeWidth={2} fill={isFavorite ? "currentColor" : "none"} />
                            </button>

                            {/* Product Image */}
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-[85%] h-[85%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow">
                            <StarRating rating={product.rating} count={product.reviews} />

                            <h3 className="text-[#0F172A] font-bold text-[17px] mb-1.5 leading-tight truncate">
                                {product.title}
                            </h3>

                            <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2 mb-6">
                                {product.description}
                            </p>

                            {/* Price & Cart */}
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-extrabold text-[#ea580c]">
                                            ${Number(product.price).toFixed(2)}
                                        </span>
                                    </div>
                                    {product.originalPrice && (
                                        <span className="text-xs text-[#94a3b8] line-through font-medium">
                                            ${Number(product.originalPrice).toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn ${inCart ? 'bg-[#ea580c] text-white hover:bg-[#c2410c] hover:shadow-orange-500/30' : 'bg-[#0f172a] text-white hover:bg-[#1e293b] hover:shadow-lg'}`}
                                >
                                    <ShoppingCart size={18} className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                                </button>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
