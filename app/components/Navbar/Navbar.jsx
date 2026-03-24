"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Search, Zap, ChevronDown, LogOut, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/data";
import { useStore } from "../../store/store";

const categories = [
    "Smartphones",
    "Laptops",
    "Audio",
    "Cameras",
    "Gaming",
    "Accessories",
];

export default function Navbar() {
    const router = useRouter();
    const cart = useStore((state) => state.cart || []);
    const favorites = useStore((state) => state.favorites || []);

    // Derived counts
    const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const favCount = favorites.length;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Live Search State
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    // Close search dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]); // close desktop dropdown
            }
            if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
                // optionally handle mobile outside click
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounced Supabase Live Search
    useEffect(() => {
        const fetchResults = async () => {
            if (!searchValue.trim()) {
                setSearchResults([]);
                return;
            }
            setIsSearching(true);
            const { data, error } = await supabase
                .from('products')
                .select('id, name, price, image_url')
                .or(`name.ilike.%${searchValue}%`)
                .limit(5);

            if (!error && data) {
                setSearchResults(data);
            }
            setIsSearching(false);
        };

        const timeoutId = setTimeout(fetchResults, 300); // 300ms debounce
        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // No redirect needed since we click results from dropdown
    };

    return (
        <nav className="sticky top-0 z-[100] bg-white border-b border-gray-200 shadow-sm font-['public-sans',sans-serif]">
            {/* ─── Main Bar ─── */}
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-7">

                {/* Logo */}
                <Link href="/Home" className="flex items-center gap-2 shrink-0 no-underline">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                        <Zap size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold text-gray-900 tracking-[-0.5px]">
                        TECH<span className="text-orange-500">FLOW</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1 text-slate-800">
                    {/* Categories Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg cursor-pointer transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">
                            Categories <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                        </span>

                        {dropdownOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 z-50 animate-[fadeDown_0.15s_ease-out]">
                                {categories.map((cat) => (
                                    <Link key={cat} href={`/Home/${cat.toLowerCase()}`} className="block px-3.5 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/Home/deals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">Deals</Link>
                    <Link href="/Home/new-arrivals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">New Arrivals</Link>
                    <Link href="/Home/support" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">Support</Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div ref={searchRef} className="hidden md:flex flex-1 max-w-[320px] relative items-center">
                    <form onSubmit={handleSearch} className="w-full relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => { if (searchValue) setSearchValue(searchValue) }} // ensures dropdown opens if there's text
                            placeholder="Search for gadgets..."
                            className="w-full py-2.5 pr-3.5 pl-9 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all duration-150 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 focus:bg-white"
                        />
                    </form>

                    {/* Desktop Search Dropdown */}
                    {(searchResults.length > 0 || isSearching) && searchValue.trim() && (
                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] overflow-hidden z-[110] animate-[fadeDown_0.15s_ease-out]">
                            {isSearching ? (
                                <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto">
                                    {searchResults.map(p => (
                                        <Link
                                            key={p.id}
                                            href={`/product/${p.id}`}
                                            onClick={() => { setSearchValue(""); setSearchResults([]); }}
                                            className="flex items-center gap-3 p-3 hover:bg-orange-50 border-b border-gray-50 last:border-0 transition-colors group"
                                        >
                                            <div className="w-10 h-10 bg-[#F8FAFC] rounded flex items-center justify-center shrink-0">
                                                <img src={p.image || p.image_url} alt={p.title || p.name} className="max-w-full max-h-full object-contain mix-blend-darken" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-500 transition-colors">{p.title || p.name}</div>
                                                <div className="text-xs text-orange-500 font-extrabold mt-0.5">${p.price}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : null}
                            {!isSearching && searchResults.length === 0 && (
                                <div className="p-4 text-center text-sm text-gray-500">No products found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-1 ml-auto">
                    {/* Favorites */}
                    <Link href="/favorite" className="relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 transition-colors duration-150 hover:bg-red-50 hover:text-red-500" aria-label="Favorites">
                        <Heart size={22} />
                        {favCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {favCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-orange-500" aria-label="Cart">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Account */}
                    <button className="relative w-10 h-10 rounded-lg md:flex hidden items-center justify-center text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-orange-500" aria-label="Account">
                        <User size={22} />
                    </button>

                    {/* Avatar */}
                    <button className="group rounded-full p-0 ml-1" aria-label="Profile">
                        <div className="w-[34px] h-[34px] rounded-full md:flex hidden bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-200 transition-colors duration-150 group-hover:border-orange-500" />
                    </button>

                    {/* Logout */}
                    <button onClick={handleLogout} className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 ml-2 text-[13px] font-semibold text-gray-700 bg-transparent border-[1.5px] border-gray-200 rounded-lg transition-all duration-150 hover:bg-red-50 hover:text-red-500 hover:border-red-300 whitespace-nowrap" aria-label="Logout">
                        <LogOut size={16} />
                        Log out
                    </button>
                </div>

                {/* Mobile Hamburger — animated morph to X */}
                <button
                    className="md:hidden flex flex-col justify-between w-[22px] h-4 ml-auto bg-transparent p-0 cursor-pointer group"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-full bg-gray-700 rounded-sm transform origin-center transition-all duration-300 ease-in-out group-hover:bg-orange-500 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-full bg-gray-700 rounded-sm transform origin-center transition-all duration-200 ease-in-out group-hover:bg-orange-500 ${mobileOpen ? "opacity-0 w-0" : ""}`} />
                    <span className={`block h-0.5 w-full bg-gray-700 rounded-sm transform origin-center transition-all duration-300 ease-in-out group-hover:bg-orange-500 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </button>
            </div>

            {/* ─── Mobile Menu ─── */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 px-5 pt-3 pb-5 flex flex-col gap-0.5 animate-[fadeDown_0.2s_ease-out]">
                    <div ref={mobileSearchRef} className="relative mb-2.5">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search for gadgets..."
                                className="w-full py-2.5 pr-3.5 pl-9 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                            />
                        </form>

                        {/* Mobile Search Dropdown */}
                        {(searchResults.length > 0 || isSearching) && searchValue.trim() && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-[110] animate-[fadeDown_0.15s_ease-out]">
                                {isSearching ? (
                                    <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                                        Searching...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="max-h-[250px] overflow-y-auto">
                                        {searchResults.map(p => (
                                            <Link
                                                key={p.id}
                                                href={`/product/${p.id}`}
                                                onClick={() => { setSearchValue(""); setSearchResults([]); setMobileOpen(false); }}
                                                className="flex items-center gap-3 p-3 hover:bg-orange-50 border-b border-gray-50 last:border-0 transition-colors group"
                                            >
                                                <div className="w-10 h-10 bg-[#F8FAFC] rounded flex items-center justify-center shrink-0">
                                                    <img src={p.image || p.image_url} alt={p.title || p.name} className="max-w-full max-h-full object-contain mix-blend-darken" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-gray-900 truncate">{p.title || p.name}</div>
                                                    <div className="text-xs text-orange-500 font-extrabold mt-0.5">${p.price}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                                {!isSearching && searchResults.length === 0 && (
                                    <div className="p-4 text-center text-sm text-gray-500">No products found</div>
                                )}
                            </div>
                        )}
                    </div>

                    <Link href="/Home/deals" className="block px-3 py-2.5 text-[15px] font-medium text-slate-900 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>Deals</Link>
                    <Link href="/Home/new-arrivals" className="block px-3 py-2.5 text-[15px] font-medium text-slate-900 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>New Arrivals</Link>
                    <Link href="/Home/support" className="block px-3 py-2.5 text-[15px] font-medium text-slate-900 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>Support</Link>
                    <div className="h-px bg-gray-200 my-2" />
                    {categories.map((cat) => (
                        <Link key={cat} href={`/Home/category/${cat.toLowerCase()}`} className="block px-3 pl-5 py-2.5 text-[14px] font-normal text-gray-500 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>
                            {cat}
                        </Link>
                    ))}
                    <button onClick={handleLogout} className="block w-full text-left mt-2 px-3 py-2.5 text-[15px] font-semibold text-red-500 rounded-lg transition-colors hover:bg-red-50">
                        Log out
                    </button>
                </div>
            )}
        </nav>
    );
}
