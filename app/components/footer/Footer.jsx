export default function Footer() {
    return (
        <footer className="bg-[#F8F9FA] pt-16 pb-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16 relative z-10">
                    
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[#EA580C] flex items-center justify-center text-white">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#111827]">
                                TECH<span className="font-extrabold">FLOW</span>
                            </span>
                        </div>
                        
                        <p className="text-[#6B7280] text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                            Premium electronics curated for the tech-savvy individual. Quality, innovation, and design in every gadget.
                        </p>
                        
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors text-lg font-bold font-serif">
                                @
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 transition-colors font-bold text-sm">
                                Aa
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-[#111827] font-bold mb-6">Shop</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Laptops</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Phones</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Audio</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Accessories</a></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-[#111827] font-bold mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">About Us</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Careers</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Sustainability</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Press</a></li>
                        </ul>
                    </div>

                    {/* Customer Care Links */}
                    <div>
                        <h3 className="text-[#111827] font-bold mb-6">Customer Care</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Shipping</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Returns</a></li>
                            <li><a href="#" className="text-[#6B7280] hover:text-[#111827] text-sm transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between flex-wrap gap-4 items-center">
                    <p className="text-[#9CA3AF] text-sm">
                        &copy; {new Date().getFullYear()} TechFlow Electronics. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-[#9CA3AF]">
                        <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-gray-700 transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}