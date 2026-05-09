"use client";
import { useState, useMemo } from "react";
import { Heart, ShoppingCart, Star, SlidersHorizontal } from "lucide-react";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { useStore } from "../../store/store";
import Link from "next/link";

// Helper component for star ratings
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

export default function CategoryContent({ initialProducts, displayCategory }) {
    // Zustand Global Store hooks
    const addToCart = useStore(state => state.addToCart);
    const cart = useStore(state => state.cart);
    const toggleFavorite = useStore(state => state.toggleFavorite);
    const favorites = useStore(state => state.favorites);

    // Determine dynamic filter options based on the passed products
    const availableBrands = useMemo(() => {
        const brands = new Set(initialProducts.map(p => p.brand).filter(Boolean));
        return Array.from(brands).sort();
    }, [initialProducts]);

    const maxProductPrice = useMemo(() => {
        if (initialProducts.length === 0) return 2500;
        return Math.max(...initialProducts.map(p => Number(p.price) || 0));
    }, [initialProducts]);

    const availableRams = useMemo(() => {
        const rams = new Set(initialProducts.map(p => p.ram).filter(Boolean));
        return Array.from(rams).sort((a, b) => parseInt(a) - parseInt(b));
    }, [initialProducts]);

    const availableStorages = useMemo(() => {
        const strg = new Set(initialProducts.map(p => p.storage).filter(Boolean));
        return Array.from(strg).sort((a, b) => parseInt(a) - parseInt(b));
    }, [initialProducts]);

    // Filter states
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState(maxProductPrice);
    const [selectedRam, setSelectedRam] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [minRating, setMinRating] = useState(0);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Compute filtered products
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(p => {
            if (p.price > priceRange) return false;
            if (selectedBrands.length > 0 && (!p.brand || !selectedBrands.includes(p.brand))) return false;
            if (selectedRam && p.ram !== selectedRam) return false;
            if (selectedStorage && p.storage !== selectedStorage) return false;
            if (minRating > 0 && (p.rating || 5) < minRating) return false;
            return true;
        });
    }, [initialProducts, selectedBrands, priceRange, selectedRam, selectedStorage, minRating]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 font-['public-sans',sans-serif]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#0F172A] mb-3 tracking-tight uppercase">
                        {displayCategory} <span className="text-emerald-400">Collection</span>
                    </h1>
                    <p className="text-[#64748B] text-lg font-medium">Explore our premium selection of {displayCategory.toLowerCase()} hardware.</p>
                </div>
                
                {/* Mobile Filter Toggle */}
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-[#0B0F15] border-2 border-gray-200 rounded-2xl font-black text-[#0F172A] hover:border-emerald-200 transition-all shadow-sm active:scale-95"
                >
                    <SlidersHorizontal size={20} className="text-emerald-400" />
                    <span className="uppercase tracking-widest text-xs">Filter Products</span>
                    <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-lg text-[10px] ml-1">{filteredProducts.length}</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
                <FilterSidebar
                    availableBrands={availableBrands}
                    availableRams={availableRams}
                    availableStorages={availableStorages}
                    maxPossiblePrice={maxProductPrice}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedRam={selectedRam}
                    setSelectedRam={setSelectedRam}
                    selectedStorage={selectedStorage}
                    setSelectedStorage={setSelectedStorage}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                />

                <div className="flex-1 w-full">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => {
                                const isFavorite = favorites.some((fav) => fav.id === product.id);
                                const inCart = cart.some((item) => item.id === product.id);

                                return (
                                    <Link
                                        href={`/product/${product.id}`}
                                        key={product.id}
                                        className="group flex flex-col bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 p-4 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-emerald-100 relative cursor-pointer block"
                                    >
                                        <div className="relative w-full aspect-square bg-white dark:bg-[#0f151c] rounded-xl mb-5 overflow-hidden flex items-center justify-center mix-blend-multiply">
                                            {(product.isHotDeal || product.originalPrice) && (
                                                <div className="absolute top-3 left-3 z-10 bg-[#f97316] text-gray-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-wide">
                                                    HOT DEAL
                                                </div>
                                            )}

                                            <button
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
                                                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all ${isFavorite ? 'bg-red-500/10 text-red-500' : 'bg-white dark:bg-[#0B0F15]/90 backdrop-blur-sm text-gray-500 dark:text-[#7C94B0] hover:text-red-500 hover:bg-white dark:bg-[#0B0F15]'}`}
                                            >
                                                <Heart size={16} strokeWidth={2} fill={isFavorite ? "currentColor" : "none"} />
                                            </button>

                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-[85%] h-[85%] object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-grow">
                                            <StarRating rating={product.rating} count={product.reviews} />

                                            <h3 className="text-[#0F172A] font-bold text-[17px] mb-1.5 leading-tight truncate">
                                                {product.title}
                                            </h3>

                                            <p className="text-[#64748B] text-sm leading-relaxed line-clamp-2 mb-6">
                                                {product.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex flex-col">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-xl font-extrabold text-[#10B981]">
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
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn ${inCart ? 'bg-[#10B981] text-gray-900 dark:text-white hover:bg-[#059669] hover:shadow-emerald-500/30' : 'bg-[#0f172a] text-gray-900 dark:text-white hover:bg-[#1e293b] hover:shadow-lg'}`}
                                                >
                                                    <ShoppingCart size={18} className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-48 bg-white dark:bg-[#0f151c] rounded-2xl border border-gray-200 dark:border-white/5">
                            <p className="text-gray-500 dark:text-[#7C94B0] font-medium">No products match the selected filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
