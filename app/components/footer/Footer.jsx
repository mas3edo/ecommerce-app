import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-[#040608] pt-16 pb-8 border-t border-gray-200 dark:border-white/10 relative overflow-hidden">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[#040608] shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <Zap size={20} strokeWidth={2.5} fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">FLOW</span>
                            </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-[#AABDD1] text-sm md:text-base leading-relaxed mb-8 max-w-sm font-['Plus_Jakarta_Sans',sans-serif]">
                            Premium electronics curated for the tech-savvy individual. Quality, innovation, and design in every gadget.
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#0B0F15] border border-[rgba(16,185,129,0.2)] hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center text-gray-700 dark:text-[#DFE6EE] hover:text-emerald-400 transition-all duration-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-[#0B0F15] border border-[rgba(16,185,129,0.2)] hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center text-gray-700 dark:text-[#DFE6EE] hover:text-emerald-400 transition-all duration-300 font-bold text-lg">
                                @
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-6 font-['Outfit',sans-serif] tracking-wide">Shop</h3>
                        <ul className="space-y-4">
                            <li><Link href="/Home/category/laptops" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Laptops</Link></li>
                            <li><Link href="/Home/category/smartphones" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Phones</Link></li>
                            <li><Link href="/Home/category/audio" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Audio</Link></li>
                            <li><Link href="/Home/category/accessories" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-6 font-['Outfit',sans-serif] tracking-wide">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/Home/about" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">About Us</Link></li>
                            <li><Link href="/Home/deals" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Careers</Link></li>
                            <li><Link href="/Home/support" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Sustainability</Link></li>
                            <li><Link href="/Home/new-arrivals" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Press</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-bold mb-6 font-['Outfit',sans-serif] tracking-wide">Customer Care</h3>
                        <ul className="space-y-4">
                            <li><Link href="/Home/support" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Help Center</Link></li>
                            <li><Link href="/Home/support" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Shipping</Link></li>
                            <li><Link href="/Home/support" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Returns</Link></li>
                            <li><Link href="/Home/support" className="text-gray-600 dark:text-[#AABDD1] hover:text-emerald-400 text-sm transition-colors duration-300">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between flex-wrap gap-6 items-center">
                    <p className="text-gray-500 dark:text-[#7C94B0] text-sm">
                        &copy; {new Date().getFullYear()} TechFlow Electronics. All rights reserved.
                    </p>
                    
                    {/* Payment Gateways (Visual Only) */}
                    <div className="flex items-center gap-2 flex-wrap justify-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="h-8 px-3 bg-white dark:bg-[#0B0F15]/10 backdrop-blur-md border border-white/5 rounded flex items-center justify-center">
                            <span className="text-[15px] font-bold text-gray-900 dark:text-white italic tracking-tighter">VISA</span>
                        </div>
                        <div className="h-8 px-3 bg-white dark:bg-[#0B0F15]/10 backdrop-blur-md border border-white/5 rounded flex items-center justify-center">
                            <span className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight"> Pay</span>
                        </div>
                    </div>

                    <div className="flex gap-6 text-sm text-gray-500 dark:text-[#7C94B0]">
                        <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}