import { supabase } from "../../lib/data";
import { Star, ArrowLeft, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import Link from "next/link";
import ProductActions from "./ProductActions";

const StarRating = ({ rating, count }) => {
    const filledStars = Math.floor(rating || 5);
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex text-[#facc15]">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        fill={i < filledStars ? "currentColor" : "none"}
                        className={i < filledStars ? "text-[#facc15]" : "text-gray-300"}
                    />
                ))}
            </div>
            <span className="text-sm text-[#64748B] font-medium ml-1">({count || '0'} reviews)</span>
        </div>
    );
};

export default async function ProductDetail({ params }) {
    // Await params for Next.js 15+ 
    const { id } = await params;

    // Fetch product
    const { data: dbProduct, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !dbProduct) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <p className="text-gray-500 mb-8">We couldn't find the product you're looking for. It may have been removed or the ID is invalid.</p>
                    <Link href="/Home" className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors inline-flex items-center gap-2">
                        <ArrowLeft size={18} /> Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Normalize product data
    const product = {
        ...dbProduct,
        title: dbProduct.title || dbProduct.name || "Unknown Product",
        description: dbProduct.description || "No description available.",
        price: dbProduct.price ?? 0,
        originalPrice: dbProduct.original_price || dbProduct.originalPrice,
        image: dbProduct.image || dbProduct.image_url || dbProduct.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        rating: dbProduct.rating ?? 5,
        reviews: dbProduct.reviews || dbProduct.review_count || Math.floor(Math.random() * 500)
    };

    return (
        <div className="min-h-screen bg-white font-['public-sans',sans-serif]">
            {/* Breadcrumb / Back Navigation */}
            <div className="bg-gray-50 border-b border-gray-100 py-4">
                <div className="max-w-7xl mx-auto px-6">
                    <Link href="/Home" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 font-medium transition-colors border border-transparent hover:border-orange-200 px-3 py-1.5 rounded-lg -ml-3">
                        <ArrowLeft size={16} />
                        Back to Shop
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 lg:w-[500px] shrink-0 sticky top-24">
                        <div className="aspect-square bg-[#F8FAFC] rounded-3xl border border-gray-100 flex items-center justify-center p-8 relative overflow-hidden mix-blend-multiply shadow-sm">
                            {(product.isHotDeal || product.originalPrice) && (
                                <div className="absolute top-6 left-6 z-10 bg-[#f97316] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm tracking-wide">
                                    HOT DEAL
                                </div>
                            )}
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-darken filter drop-shadow-md hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 w-full pt-4 md:pt-0">
                        {product.brand && (
                            <div className="text-orange-500 font-bold text-sm tracking-wider uppercase mb-3 px-2 py-0.5 bg-orange-50 inline-block rounded-md">
                                {product.brand}
                            </div>
                        )}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-[1.15] tracking-tight mb-5">
                            {product.title}
                        </h1>

                        <div className="mb-6 flex items-center gap-4">
                            <StarRating rating={product.rating} count={product.reviews} />
                            {product.rating >= 4.5 && (
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">
                                    Top Rated
                                </span>
                            )}
                        </div>

                        <div className="mb-8 flex items-end gap-3">
                            <span className="text-4xl font-black text-[#ea580c] font-['inter',sans-serif]">
                                ${Number(product.price).toFixed(2)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-lg text-[#94a3b8] font-semibold line-through pb-1">
                                    ${Number(product.originalPrice).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <p className="text-[#475569] text-base leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Specs (if available) */}
                        {(product.ram || product.storage || product.color) && (
                            <div className="mb-8 p-5 bg-[#F8FAFC] rounded-2xl border border-gray-100 grid grid-cols-2 gap-4">
                                {product.ram && (
                                    <div>
                                        <div className="text-xs text-slate-500 font-medium mb-1">RAM Memory</div>
                                        <div className="text-sm font-bold text-slate-900">{product.ram} GB</div>
                                    </div>
                                )}
                                {product.storage && (
                                    <div>
                                        <div className="text-xs text-slate-500 font-medium mb-1">Internal Storage</div>
                                        <div className="text-sm font-bold text-slate-900">{product.storage} GB</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Actions (Client Component) */}
                        <div className="pt-2 border-t border-gray-100">
                            <ProductActions product={product} />
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                                    <Truck size={20} />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 leading-tight">Free USA<br />Shipping</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 leading-tight">1 Year<br />Warranty</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center shrink-0">
                                    <RefreshCw size={20} />
                                </div>
                                <span className="text-sm font-semibold text-gray-700 leading-tight">30-Day<br />Returns</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
