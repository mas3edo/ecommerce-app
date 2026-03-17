"use client";

import { useState } from "react";
import { ShoppingCart, User, Search, Zap, ChevronDown, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/data";

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
    const [cartCount] = useState(3);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
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
                                    <Link key={cat} href={`/Home/category/${cat.toLowerCase()}`} className="block px-3.5 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link href="/deals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">Deals</Link>
                    <Link href="/new-arrivals" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">New Arrivals</Link>
                    <Link href="/support" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-150 hover:bg-orange-50 hover:text-orange-500">Support</Link>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-[320px] relative items-center">
                    <Search size={15} className="absolute left-3 text-gray-400 pointer-events-none" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search for gadgets..."
                        className="w-full py-2.5 pr-3.5 pl-9 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all duration-150 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 focus:bg-white"
                    />
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-1 ml-auto">
                    {/* Cart */}
                    <button className="relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-orange-500" aria-label="Cart">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Account */}
                    <button className="relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-700 transition-colors duration-150 hover:bg-gray-100 hover:text-orange-500" aria-label="Account">
                        <User size={22} />
                    </button>

                    {/* Avatar */}
                    <button className="group rounded-full p-0 ml-1" aria-label="Profile">
                        <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-200 transition-colors duration-150 group-hover:border-orange-500" />
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
                    <div className="relative flex items-center mb-2.5">
                        <Search size={15} className="absolute left-3 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search for gadgets..."
                            className="w-full py-2.5 pr-3.5 pl-9 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-orange-500"
                        />
                    </div>
                    <Link href="/deals" className="block px-3 py-2.5 text-[15px] font-medium text-slate-900 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>Deals</Link>
                    <Link href="/new-arrivals" className="block px-3 py-2.5 text-[15px] font-medium text-slate-900 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>New Arrivals</Link>
                    <Link href="/support" className="block px-3 py-2.5 text-[15px] font-medium text-slate-900 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>Support</Link>
                    <div className="h-px bg-gray-200 my-2" />
                    {categories.map((cat) => (
                        <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="block px-3 pl-5 py-2.5 text-[14px] font-normal text-gray-500 rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500" onClick={() => setMobileOpen(false)}>
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
