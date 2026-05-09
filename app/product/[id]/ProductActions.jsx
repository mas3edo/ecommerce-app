"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { useStore } from "../../store/store";

export default function ProductActions({ product }) {
    const cart = useStore((state) => state.cart || []);
    const favorites = useStore((state) => state.favorites || []);
    const addToCart = useStore((state) => state.addToCart);
    const toggleFavorite = useStore((state) => state.toggleFavorite);

    const inCart = cart.some((item) => item.id === product.id);
    const isFavorite = favorites.some((item) => item.id === product.id);

    return (
        <div className="flex gap-4 mt-8">
            <button
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                disabled={inCart}
                className={`flex-1 py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-md transition-all duration-200 ${inCart ? 'bg-emerald-100 text-emerald-400 border border-emerald-200 cursor-default' : 'bg-emerald-500 text-gray-900 dark:text-white hover:bg-emerald-600 hover:shadow-emerald-500/30 active:scale-[0.98]'}`}
            >
                {inCart ? (
                    <>Added to Cart <ShoppingCart size={20} fill="currentColor" /></>
                ) : (
                    <>Add to Cart <ShoppingCart size={20} /></>
                )}
            </button>
            <button
                onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
                className={`w-16 h-[60px] rounded-xl border flex items-center justify-center transition-all bg-white dark:bg-[#0B0F15] hover:shadow-md ${isFavorite ? 'border-red-500 text-red-500 bg-red-500/10' : 'border-gray-200 dark:border-white/10 text-gray-500 dark:text-[#7C94B0] hover:border-red-200 hover:text-red-500'}`}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
                <Heart size={24} strokeWidth={2} fill={isFavorite ? "currentColor" : "none"} />
            </button>
        </div>
    );
}
