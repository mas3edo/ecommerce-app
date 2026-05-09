"use client";
import { useRef } from "react";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
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
    const scrollRef = useRef(null);
    const addToCart = useStore(state => state.addToCart);
    const cart = useStore(state => state.cart || []);
    const toggleFavorite = useStore(state => state.toggleFavorite);
    const favorites = useStore(state => state.favorites || []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // Scroll 80% of the visible area
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative group/container">
            {/* Scroll Buttons */}
            <div className="absolute -top-16 right-0 flex gap-2 z-20">
                <button
                    onClick={() => scroll('left')}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-[#AABDD1] bg-white dark:bg-[#0B0F15] hover:border-[rgba(139,92,246,0.6)] hover:text-[#8B5CF6] hover:shadow-md transition-all active:scale-95"
                    style={{border:'1px solid rgba(139,92,246,0.2)'}}
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-[#AABDD1] bg-white dark:bg-[#0B0F15] hover:border-[rgba(139,92,246,0.6)] hover:text-[#8B5CF6] hover:shadow-md transition-all active:scale-95"
                    style={{border:'1px solid rgba(139,92,246,0.2)'}}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
                {displayProducts.map((product) => {
                    const isFavorite = favorites.some((fav) => fav.id === product.id);
                    const inCart = cart.some((item) => item.id === product.id);

                    return (
                        <Link
                            href={`/product/${product.id}`}
                            key={product.id}
                            className="group flex flex-col rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 relative cursor-pointer block flex-shrink-0 w-[280px] sm:w-[310px] snap-start"
                            style={{background:'linear-gradient(135deg,rgba(139,92,246,0.07),rgba(6,182,212,0.03))',border:'1px solid rgba(139,92,246,0.15)',boxShadow:'0 4px 24px rgba(0,0,0,0.4)'}}
                            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(139,92,246,0.45)';e.currentTarget.style.boxShadow='0 0 0 1px rgba(139,92,246,0.2),0 20px 60px rgba(0,0,0,0.6),0 0 30px rgba(139,92,246,0.12)'}}
                            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(139,92,246,0.15)';e.currentTarget.style.boxShadow='0 4px 24px rgba(0,0,0,0.4)'}}
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-square rounded-xl mb-5 overflow-hidden flex items-center justify-center" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)'}}>
                                {/* Hot Deal Badge */}
                                {(product.isHotDeal || product.originalPrice) && (
                                    <div className="absolute top-3 left-3 z-10 text-gray-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider"
                                        style={{background:'linear-gradient(135deg,#8B5CF6,#6366F1)',boxShadow:'0 0 12px rgba(139,92,246,0.5)'}}>
                                        HOT DEAL
                                    </div>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
                                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all  cursor-pointer ${isFavorite ? 'bg-red-500/10 text-red-500' : 'bg-white dark:bg-[#0B0F15]/90 backdrop-blur-sm text-gray-500 dark:text-[#7C94B0] hover:text-red-500 hover:bg-white dark:bg-[#0B0F15]'}`}
                                >
                                    <Heart size={16} strokeWidth={2} fill={isFavorite ? "currentColor" : "none"} />
                                </button>

                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow">
                                <StarRating rating={product.rating} count={product.reviews} />

                                <h3 className="font-bold text-[17px] mb-1.5 leading-tight truncate"
                                    style={{color:'#F1F5F9',fontFamily:"'Space Grotesk',sans-serif"}}>
                                    {product.title}
                                </h3>

                                <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2 mb-6">
                                    {product.description}
                                </p>

                                {/* Price & Cart */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-xl font-extrabold" style={{color:'#A78BFA'}}>
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
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn`}
                                        style={{background: inCart ? 'linear-gradient(135deg,#8B5CF6,#6366F1)' : 'linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.1))',border:'1px solid rgba(139,92,246,0.4)',color: inCart ? 'white' : '#A78BFA',boxShadow: inCart ? '0 0 16px rgba(139,92,246,0.5)' : 'none'}}
                                    >
                                        <ShoppingCart size={18} className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
