"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Search, Zap, ChevronDown, LogOut, Heart, LayoutDashboard, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const userDropdownRef = useRef(null);

    // Theme state
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Fetch current user for avatar/initials
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data?.user) setAuthUser(data.user);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
            setAuthUser(session?.user || null);
        });
        return () => subscription.unsubscribe();
    }, []);

    // Close user dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isAdmin = authUser?.user_metadata?.role === 'admin' || authUser?.id === '9ea6042d-5b5b-4ec9-ae42-48f4239337fd';
    const userInitials = (authUser?.user_metadata?.full_name || authUser?.email || "U").slice(0, 2).toUpperCase();

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
        <nav className="sticky top-0 z-[100] bg-white dark:bg-[#040608]/95 backdrop-blur-xl border-b border-[rgba(139,92,246,0.15)] shadow-[0_2px_30px_rgba(0,0,0,0.6)] font-['Plus_Jakarta_Sans',sans-serif]">
            {/* ─── Main Bar ─── */}
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-7">

                {/* Logo */}
                <Link href="/Home" className="flex items-center gap-2 shrink-0 no-underline">
                    <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-gray-900 dark:text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]">
                        <Zap size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white tracking-[-0.5px]">
                        TECH<span className="brand-text">FLOW</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-1 text-gray-800 dark:text-[#f8f9fa]">
                    {/* Categories Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <span className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-[#DFE6EE] rounded-lg cursor-pointer transition-colors duration-150 hover:bg-emerald-500/10 hover:text-emerald-400">
                            Categories <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                        </span>

                        {dropdownOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 min-w-[180px] bg-white dark:bg-[#0B0F15] border border-emerald-500/20 rounded-xl shadow-[0_12px_40px_rgba(16,185,129,0.15)] p-1.5 z-50 animate-[fadeDown_0.15s_ease-out]">
                                {categories.map((cat) => (
                                    <Link key={cat} href={`/Home/${cat.toLowerCase()}`} className="block px-3.5 py-2 text-sm text-gray-700 dark:text-[#DFE6EE] rounded-lg transition-colors duration-150 hover:bg-emerald-500/10 hover:text-emerald-400">
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/Home/deals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-[#DFE6EE] rounded-lg transition-colors duration-150 hover:bg-emerald-500/10 hover:text-emerald-400">Deals</Link>
                    <Link href="/Home/new-arrivals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-[#DFE6EE] rounded-lg transition-colors duration-150 hover:bg-emerald-500/10 hover:text-emerald-400">New Arrivals</Link>
                    <Link href="/Home/support" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-[#DFE6EE] rounded-lg transition-colors duration-150 hover:bg-emerald-500/10 hover:text-emerald-400">Support</Link>
                </div>

                {/* Search Bar (Desktop) */}
                <div ref={searchRef} className="hidden md:flex flex-1 max-w-[320px] relative items-center">
                    <form onSubmit={handleSearch} className="w-full relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0] pointer-events-none" />
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => { if (searchValue) setSearchValue(searchValue) }} // ensures dropdown opens if there's text
                            placeholder="Search for gadgets..."
                            className="w-full py-2.5 pr-3.5 pl-9 text-sm text-gray-900 dark:text-white bg-[rgba(255,255,255,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl outline-none transition-all duration-150 placeholder:text-[#4A4D72] focus:border-[rgba(16,185,129,0.6)] focus:ring-4 focus:ring-[rgba(16,185,129,0.1)] focus:bg-[rgba(255,255,255,0.07)]"
                        />
                    </form>

                    {/* Desktop Search Dropdown */}
                    {(searchResults.length > 0 || isSearching) && searchValue.trim() && (
                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#0B0F15] border border-emerald-500/20 rounded-xl shadow-[0_12px_40px_rgba(16,185,129,0.15)] overflow-hidden z-[110] animate-[fadeDown_0.15s_ease-out]">
                            {isSearching ? (
                                <div className="p-4 text-center text-sm text-gray-500 dark:text-[#7C94B0] flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="max-h-[300px] overflow-y-auto">
                                    {searchResults.map(p => (
                                        <Link
                                            key={p.id}
                                            href={`/product/${p.id}`}
                                            onClick={() => { setSearchValue(""); setSearchResults([]); }}
                                            className="flex items-center gap-3 p-3 hover:bg-emerald-500/10 border-b border-white/5 last:border-0 transition-colors group"
                                        >
                                            <div className="w-10 h-10 bg-white dark:bg-[#0f151c] rounded flex items-center justify-center shrink-0">
                                                <img src={p.image || p.image_url} alt={p.title || p.name} className="max-w-full max-h-full object-contain mix-blend-darken" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-emerald-400 transition-colors">{p.title || p.name}</div>
                                                <div className="text-xs text-emerald-400 font-extrabold mt-0.5">${p.price}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : null}
                            {!isSearching && searchResults.length === 0 && (
                                <div className="p-4 text-center text-sm text-gray-500 dark:text-[#7C94B0]">No products found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-1 ml-auto">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 dark:text-[#7C94B0] transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:text-emerald-400"
                        aria-label="Toggle Theme"
                        disabled={!mounted}
                    >
                        {mounted ? (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <Moon size={20} />}
                    </button>

                    {/* Favorites */}
                    <Link href="/favorite" className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-[#AABDD1] transition-colors duration-150 hover:bg-red-500/100/10 hover:text-red-500" aria-label="Favorites">
                        <Heart size={22} />
                        {favCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500/100 text-gray-900 dark:text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {favCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="relative w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 dark:text-[#AABDD1] transition-colors duration-150 hover:bg-emerald-500/10 hover:text-emerald-400" aria-label="Cart">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-gradient-to-br from-emerald-400 to-cyan-500 text-gray-900 dark:text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* User Dropdown */}
                    <div ref={userDropdownRef} className="relative hidden md:block ml-1">
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-emerald-500/10 transition-colors group"
                            aria-label="User menu"
                        >
                            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-gray-900 dark:text-white text-xs font-black border-2 border-transparent group-hover:border-emerald-400/50 transition-all shadow-[0_2px_8px_rgba(16,185,129,0.35)]">
                                {userInitials}
                            </div>
                            <ChevronDown size={14} className={`text-gray-500 dark:text-[#7C94B0] transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {userDropdownOpen && (
                            <div className="absolute top-[calc(100%+8px)] right-0 min-w-[210px] bg-white dark:bg-[#0B0F15] border border-emerald-500/20 rounded-2xl shadow-[0_16px_48px_rgba(16,185,129,0.18)] p-1.5 z-[200] animate-[fadeDown_0.15s_ease-out]">
                                <div className="px-3 py-2 mb-1 border-b border-gray-200 dark:border-white/5">
                                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{authUser?.email}</p>
                                    {isAdmin && <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">ADMIN</span>}
                                </div>
                                <Link
                                    href="/profile"
                                    onClick={() => setUserDropdownOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-[#DFE6EE] rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors font-medium"
                                >
                                    <User size={15} /> My Profile
                                </Link>
                                {isAdmin && (
                                    <Link
                                        href="/admin"
                                        onClick={() => setUserDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 dark:text-[#DFE6EE] rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors font-medium"
                                    >
                                        <LayoutDashboard size={15} /> Admin Dashboard
                                    </Link>
                                )}
                                <div className="border-t border-gray-200 dark:border-white/5 mt-1 pt-1">
                                    <button
                                        onClick={() => { setUserDropdownOpen(false); handleLogout(); }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 rounded-xl hover:bg-red-500/100/10 transition-colors font-medium"
                                    >
                                        <LogOut size={15} /> Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Hamburger — animated morph to X */}
                <button
                    className="md:hidden flex flex-col justify-between w-[22px] h-4 ml-auto bg-transparent p-0 cursor-pointer group"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-full bg-gray-700 rounded-sm transform origin-center transition-all duration-300 ease-in-out group-hover:bg-emerald-500/100 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-full bg-gray-700 rounded-sm transform origin-center transition-all duration-200 ease-in-out group-hover:bg-emerald-500/100 ${mobileOpen ? "opacity-0 w-0" : ""}`} />
                    <span className={`block h-0.5 w-full bg-gray-700 rounded-sm transform origin-center transition-all duration-300 ease-in-out group-hover:bg-emerald-500/100 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                </button>
            </div>

            {/* ─── Mobile Menu ─── */}
            {mobileOpen && (
                <div className="md:hidden bg-white dark:bg-[#040608]/98 border-t border-[rgba(139,92,246,0.15)] px-5 pt-3 pb-5 flex flex-col gap-0.5 animate-[fadeDown_0.2s_ease-out]">
                    <div ref={mobileSearchRef} className="relative mb-2.5">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0] pointer-events-none" />
                            <input
                                type="search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search for gadgets..."
                                className="w-full py-2.5 pr-3.5 pl-9 text-sm text-gray-900 dark:text-white bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-lg outline-none focus:border-emerald-400"
                            />
                        </form>

                        {/* Mobile Search Dropdown */}
                        {(searchResults.length > 0 || isSearching) && searchValue.trim() && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-[#0B0F15] border border-gray-200 dark:border-white/10 rounded-xl shadow-lg overflow-hidden z-[110] animate-[fadeDown_0.15s_ease-out]">
                                {isSearching ? (
                                    <div className="p-4 text-center text-sm text-gray-500 dark:text-[#7C94B0] flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                                        Searching...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    <div className="max-h-[250px] overflow-y-auto">
                                        {searchResults.map(p => (
                                            <Link
                                                key={p.id}
                                                href={`/product/${p.id}`}
                                                onClick={() => { setSearchValue(""); setSearchResults([]); setMobileOpen(false); }}
                                                className="flex items-center gap-3 p-3 hover:bg-emerald-500/10 border-b border-white/5 last:border-0 transition-colors group"
                                            >
                                                <div className="w-10 h-10 bg-white dark:bg-[#0f151c] rounded flex items-center justify-center shrink-0">
                                                    <img src={p.image || p.image_url} alt={p.title || p.name} className="max-w-full max-h-full object-contain mix-blend-darken" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white truncate">{p.title || p.name}</div>
                                                    <div className="text-xs text-emerald-400 font-extrabold mt-0.5">${p.price}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                                {!isSearching && searchResults.length === 0 && (
                                    <div className="p-4 text-center text-sm text-gray-500 dark:text-[#7C94B0]">No products found</div>
                                )}
                            </div>
                        )}
                    </div>

                    <Link href="/Home/deals" className="block px-3 py-2.5 text-[15px] font-medium text-gray-900 dark:text-white rounded-lg transition-colors hover:bg-emerald-500/10 hover:text-emerald-400" onClick={() => setMobileOpen(false)}>Deals</Link>
                    <Link href="/Home/new-arrivals" className="block px-3 py-2.5 text-[15px] font-medium text-gray-900 dark:text-white rounded-lg transition-colors hover:bg-emerald-500/10 hover:text-emerald-400" onClick={() => setMobileOpen(false)}>New Arrivals</Link>
                    <Link href="/Home/support" className="block px-3 py-2.5 text-[15px] font-medium text-gray-900 dark:text-white rounded-lg transition-colors hover:bg-emerald-500/10 hover:text-emerald-400" onClick={() => setMobileOpen(false)}>Support</Link>
                    <div className="h-px bg-white dark:bg-[#0B0F15]/5 my-2" />
                    {categories.map((cat) => (
                        <Link key={cat} href={`/Home/category/${cat.toLowerCase()}`} className="block px-3 pl-5 py-2.5 text-[14px] font-normal text-gray-500 dark:text-[#7C94B0] rounded-lg transition-colors hover:bg-emerald-500/10 hover:text-emerald-400" onClick={() => setMobileOpen(false)}>
                            {cat}
                        </Link>
                    ))}
                    <Link href="/profile" className="block px-3 py-2.5 text-[15px] font-medium text-gray-900 dark:text-white rounded-lg transition-colors hover:bg-emerald-500/10 hover:text-emerald-400" onClick={() => setMobileOpen(false)}>
                        👤 My Profile
                    </Link>
                    {isAdmin && (
                        <Link href="/admin" className="block px-3 py-2.5 text-[15px] font-semibold text-emerald-400 rounded-lg transition-colors hover:bg-emerald-500/10" onClick={() => setMobileOpen(false)}>
                            ⚙️ Admin Dashboard
                        </Link>
                    )}
                    <button onClick={handleLogout} className="block w-full text-left mt-2 px-3 py-2.5 text-[15px] font-semibold text-red-500 rounded-lg transition-colors hover:bg-red-500/100/10">
                        Log out
                    </button>
                </div>
            )}
        </nav>
    );
}
