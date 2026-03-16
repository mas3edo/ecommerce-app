import { fetchProducts } from "../../lib/data";
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

// Helper component for star ratings
const StarRating = ({ rating, count }) => {
    // Round to nearest half for display (simple assuming whole numbers for now)
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

export default async function Trending() {
    // Fetch products from database
    const dbProducts = await fetchProducts();

    // Map DB data or use fallbacks if data is missing
    const products = (dbProducts && dbProducts.length > 0) ? dbProducts.slice(0, 4) : [
        {
            id: 1,
            title: "SonicFlow Z-9 Headphones",
            description: "Premium active noise cancellation with 60h battery life.",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
            rating: 5,
            reviews: 128
        },
        {
            id: 2,
            title: "Pixel X Ultra 256GB",
            description: "Revolutionary camera system with night vision pro.",
            price: 849.00,
            originalPrice: 999.00,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
            rating: 4,
            reviews: 542,
            isHotDeal: true
        },
        {
            id: 3,
            title: "FitTrack Elite Pro",
            description: "Health tracking meets high fashion with ECG monitoring.",
            price: 189.50,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
            rating: 5,
            reviews: 89
        },
        {
            id: 4,
            title: "Nexus RGB Mechanical",
            description: "Ultra-responsive linear switches for competitive gaming.",
            price: 145.00,
            image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
            rating: 4,
            reviews: 312
        }
    ];

    // Ensure we map standard DB names if they exist
    const displayProducts = products.map(p => ({
        ...p,
        title: p.title || p.name || "Unknown Product",
        description: p.description || "No description available.",
        price: p.price ?? 0,
        originalPrice: p.original_price || p.originalPrice,
        image: p.image || p.image_url || p.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        rating: p.rating ?? 5,
        reviews: p.reviews || p.review_count || Math.floor(Math.random() * 500)
    }));

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 font-['public-sans',sans-serif]">
            
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2 tracking-tight text-[#0F172A]">Trending Now</h2>
                    <p className="text-[#64748B] text-base">Our most popular tech this week.</p>
                </div>
                
                {/* Carousel Controls */}
                <div className="hidden md:flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map((product) => (
                    <div 
                        key={product.id} 
                        className="group flex flex-col bg-white rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-orange-100 relative"
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
                            <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all">
                                <Heart size={16} strokeWidth={2} />
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

                                <button className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-200 hover:bg-[#1e293b] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn">
                                    <ShoppingCart size={18} className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
