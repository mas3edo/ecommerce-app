import { fetchProducts } from "../../../lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TrendingGrid from "./TrendingGrid";

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
            <TrendingGrid displayProducts={displayProducts} />

        </section>
    );
}
