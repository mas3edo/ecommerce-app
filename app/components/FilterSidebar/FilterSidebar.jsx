"use client";
import { Star, X } from "lucide-react";

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
    setMinRating,
    isOpen,
    onClose
}) {

    const toggleBrand = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const resetFilters = (e) => {
        e.preventDefault();
        setSelectedBrands([]);
        setPriceRange(maxPossiblePrice);
        setSelectedRam(null);
        setSelectedStorage(null);
        setMinRating(0);
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar Content */}
            <aside className={`
                fixed top-0 left-0 h-full w-[320px] bg-white dark:bg-[#0B0F15] z-[70] p-8 overflow-y-auto transition-transform duration-300 ease-out lg:hidden
                ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight">Filters</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Filter Content (shared with desktop) */}
                <FilterContent 
                    availableBrands={availableBrands}
                    availableRams={availableRams}
                    availableStorages={availableStorages}
                    maxPossiblePrice={maxPossiblePrice}
                    selectedBrands={selectedBrands}
                    toggleBrand={toggleBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedRam={selectedRam}
                    setSelectedRam={setSelectedRam}
                    selectedStorage={selectedStorage}
                    setSelectedStorage={setSelectedStorage}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    resetFilters={resetFilters}
                />
                
                <div className="mt-10">
                    <button 
                        onClick={onClose}
                        className="w-full py-4 bg-[#0F172A] text-gray-900 dark:text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all uppercase tracking-widest"
                    >
                        Show Results
                    </button>
                </div>
            </aside>

            {/* Desktop Sidebar (Permanent) */}
            <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-[#0F172A] uppercase tracking-tight">Filters</h3>
                    <button 
                        onClick={resetFilters}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest"
                    >
                        Reset All
                    </button>
                </div>
                <FilterContent 
                    availableBrands={availableBrands}
                    availableRams={availableRams}
                    availableStorages={availableStorages}
                    maxPossiblePrice={maxPossiblePrice}
                    selectedBrands={selectedBrands}
                    toggleBrand={toggleBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedRam={selectedRam}
                    setSelectedRam={setSelectedRam}
                    selectedStorage={selectedStorage}
                    setSelectedStorage={setSelectedStorage}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    resetFilters={resetFilters}
                />
            </aside>
        </>
    );
}

// Sub-component to organize filter logic
function FilterContent({
    availableBrands,
    availableRams,
    availableStorages,
    maxPossiblePrice,
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange,
    selectedRam,
    setSelectedRam,
    selectedStorage,
    setSelectedStorage,
    minRating,
    setMinRating
}) {
    return (
        <div className="space-y-10">
            {/* BRAND */}
            {availableBrands.length > 0 && (
                <div>
                    <h4 className="text-[10px] font-black text-[#94a3b8] tracking-[0.2em] uppercase mb-5">Brand</h4>
                    <div className="flex flex-col gap-3.5">
                        {availableBrands.map((brand) => (
                            <label key={brand} className="flex items-center gap-3.5 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-[#10B981] border-[#10B981] shadow-lg shadow-emerald-500/20' : 'bg-white dark:bg-[#0B0F15] border-gray-200 dark:border-white/10 group-hover:border-[#10B981]'}`}>
                                    {selectedBrands.includes(brand) && (
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <input type="checkbox" className="hidden" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                                <span className={`text-[15px] font-bold transition-colors ${selectedBrands.includes(brand) ? 'text-[#0F172A]' : 'text-slate-500 group-hover:text-[#0F172A]'}`}>{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* PRICE RANGE */}
            <div>
                <h4 className="text-[10px] font-black text-[#94a3b8] tracking-[0.2em] uppercase mb-5">Max Price</h4>
                <div className="relative mb-6 px-1">
                    <input 
                        type="range" 
                        min="0" 
                        max={maxPossiblePrice} 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#10B981]"
                    />
                </div>
                <div className="flex items-center h-12 gap-3">
                    <div className="flex-1 h-full border-2 border-gray-200 rounded-xl flex items-center justify-center bg-slate-50/50">
                        <span className="text-sm font-black text-[#0F172A]">$0</span>
                    </div>
                    <div className="flex-1 h-full border-2 border-emerald-100 rounded-xl flex items-center justify-center bg-emerald-50/30">
                        <span className="text-sm font-black text-emerald-600">${priceRange}</span>
                    </div>
                </div>
            </div>

            {/* RAM */}
            {availableRams.length > 0 && (
                <div>
                     <h4 className="text-[10px] font-black text-[#94a3b8] tracking-[0.2em] uppercase mb-5">RAM Capacity</h4>
                    <div className="flex flex-wrap gap-2">
                        {availableRams.map((ram) => (
                            <button 
                                key={ram}
                                onClick={(e) => { e.preventDefault(); setSelectedRam(prev => prev === ram ? null : ram); }}
                                className={`px-4 py-2.5 text-xs font-black rounded-xl border-2 transition-all uppercase ${
                                    selectedRam === ram 
                                    ? 'border-emerald-400 text-emerald-600 bg-emerald-50 shadow-sm' 
                                    : 'border-gray-200 text-slate-400 bg-white dark:bg-[#0B0F15] hover:border-slate-300'
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
                <div>
                    <h4 className="text-[10px] font-black text-[#94a3b8] tracking-[0.2em] uppercase mb-5">Storage</h4>
                    <div className="flex flex-col gap-3">
                        {availableStorages.map((storage) => (
                            <label key={storage} className="flex items-center gap-3.5 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="radio" 
                                        name="storage" 
                                        className="peer appearance-none w-5 h-5 border-2 border-gray-200 dark:border-white/10 rounded-full checked:border-[#10B981] transition-all cursor-pointer bg-white dark:bg-[#0B0F15] group-hover:border-[#10B981]"
                                        checked={selectedStorage === storage}
                                        onChange={() => setSelectedStorage(prev => prev === storage ? null : storage)}
                                        onClick={() => { if(selectedStorage === storage) setSelectedStorage(null) }}
                                    />
                                    <div className="absolute w-2 h-2 bg-[#10B981] rounded-full scale-0 peer-checked:scale-100 transition-transform duration-200 pointer-events-none"></div>
                                </div>
                                <span className={`text-[15px] font-bold transition-colors ${selectedStorage === storage ? 'text-[#0F172A]' : 'text-slate-500 group-hover:text-[#0F172A]'}`}>{storage}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {/* RATINGS */}
            <div>
                <h4 className="text-[10px] font-black text-[#94a3b8] tracking-[0.2em] uppercase mb-5">Rating</h4>
                <div className="flex flex-col gap-4">
                    {[4, 3].map(rating => (
                        <button 
                            key={rating}
                            onClick={(e) => { e.preventDefault(); setMinRating(prev => prev === rating ? 0 : rating); }} 
                            className={`flex items-center gap-3 transition-opacity ${minRating === rating ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                        >
                            <div className="flex gap-1 text-[#facc15]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={15} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "" : "text-gray-200"} />
                                ))}
                            </div>
                            <span className="text-[13px] font-extrabold text-[#0F172A] uppercase tracking-tighter">& Up</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

