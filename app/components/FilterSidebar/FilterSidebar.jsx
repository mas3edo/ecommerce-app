"use client";
import { Star } from "lucide-react";

export default function FilterSidebar({
    availableBrands = [],
    availableRams = [],
    availableStorages = [],
    maxPossiblePrice = 2500,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    selectedRam,
    setSelectedRam,
    selectedStorage,
    setSelectedStorage,
    minRating,
    setMinRating
}) {

    const toggleBrand = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    return (
        <aside className="w-full lg:w-64 shrink-0 bg-[#F8FAFC] md:bg-transparent rounded-2xl md:rounded-none p-5 md:p-0 mb-8 md:mb-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-[#0F172A]">Filters</h3>
                <button 
                    onClick={() => {
                        setSelectedBrands([]);
                        setPriceRange(maxPossiblePrice);
                        setSelectedRam(null);
                        setSelectedStorage(null);
                        setMinRating(0);
                    }}
                    className="text-sm font-semibold text-[#f97316] hover:text-[#ea580c] transition-colors"
                >
                    Reset All
                </button>
            </div>

            {/* BRAND */}
            {availableBrands.length > 0 && (
                <div className="mb-8">
                    <h4 className="text-xs font-bold text-[#94a3b8] tracking-widest uppercase mb-4">Brand</h4>
                    <div className="flex flex-col gap-3">
                        {availableBrands.map((brand) => (
                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-[4px] border border-gray-300 flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-[#ea580c] border-[#ea580c]' : 'bg-white group-hover:border-[#ea580c]'}`}>
                                    {selectedBrands.includes(brand) && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={selectedBrands.includes(brand)} 
                                    onChange={() => toggleBrand(brand)} 
                                />
                                <span className="text-sm text-[#334155] font-medium">{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* PRICE RANGE */}
            <div className="mb-8">
                <h4 className="text-xs font-bold text-[#94a3b8] tracking-widest uppercase mb-4">Price Range</h4>
                <div className="relative mb-6">
                    <input 
                        type="range" 
                        min="0" 
                        max={maxPossiblePrice} 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ea580c]"
                    />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 py-2 px-3 border border-gray-200 rounded-lg text-center bg-white shadow-sm">
                        <span className="text-sm font-semibold text-[#0F172A]">$0</span>
                    </div>
                    <div className="flex-1 py-2 px-3 border border-gray-200 rounded-lg text-center bg-white shadow-sm">
                        <span className="text-sm font-semibold text-[#0F172A]">${priceRange}</span>
                    </div>
                </div>
            </div>

            {/* RAM */}
            {availableRams.length > 0 && (
                <div className="mb-8">
                    <h4 className="text-xs font-bold text-[#94a3b8] tracking-widest uppercase mb-4">RAM</h4>
                    <div className="flex flex-wrap gap-2.5">
                        {availableRams.map((ram) => (
                            <button 
                                key={ram}
                                onClick={() => setSelectedRam(prev => prev === ram ? null : ram)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all ${
                                    selectedRam === ram 
                                    ? 'border-[#ea580c] text-[#ea580c] bg-orange-50' 
                                    : 'border-gray-200 text-[#475569] bg-white hover:border-gray-300'
                                }`}
                            >
                                {ram}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* STORAGE */}
            {availableStorages.length > 0 && (
                <div className="mb-8">
                    <h4 className="text-xs font-bold text-[#94a3b8] tracking-widest uppercase mb-4">Storage</h4>
                    <div className="flex flex-col gap-3">
                        {availableStorages.map((storage) => (
                            <label key={storage} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="storage" 
                                        className="peer appearance-none w-5 h-5 border border-gray-300 rounded-full checked:border-[#ea580c] transition-all cursor-pointer bg-white group-hover:border-[#ea580c]"
                                        checked={selectedStorage === storage}
                                        onChange={() => setSelectedStorage(prev => prev === storage ? null : storage)}
                                        onClick={() => { if(selectedStorage === storage) setSelectedStorage(null) }}
                                    />
                                    <div className="absolute w-2.5 h-2.5 bg-[#ea580c] rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none"></div>
                                </div>
                                <span className="text-sm text-[#334155] font-medium">{storage}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* CUSTOMER RATINGS */}
            <div className="mb-8">
                <h4 className="text-xs font-bold text-[#94a3b8] tracking-widest uppercase mb-4">Customer Ratings</h4>
                <div className="flex flex-col gap-3">
                    <button onClick={() => setMinRating(prev => prev === 4 ? 0 : 4)} className={`flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0 ${minRating === 4 ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                        <div className="flex gap-1 text-[#facc15]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-sm text-[#475569] font-medium group-hover:text-[#0F172A] transition-colors ml-1">& Up</span>
                    </button>
                    <button onClick={() => setMinRating(prev => prev === 3 ? 0 : 3)} className={`flex items-center gap-2 group cursor-pointer bg-transparent border-none p-0 ${minRating === 3 ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                        <div className="flex gap-1 text-[#facc15]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < 3 ? "currentColor" : "none"} className={i < 3 ? "" : "text-gray-300"} />
                            ))}
                        </div>
                        <span className="text-sm text-[#475569] font-medium group-hover:text-[#0F172A] transition-colors ml-1">& Up</span>
                    </button>
                </div>
            </div>

        </aside>
    );
}
