import Link from 'next/link';
import { ArrowLeft, Zap } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white font-['public-sans',sans-serif]">
            {/* Main Content */}
            <main className="max-w-4xl mx-auto w-full px-6 py-16 md:py-24 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center mb-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-6">
                        About TechFlow
                    </h1>
                    <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed">
                        We are passionate about delivering the most innovative and high-quality premium tech gadgets directly to you.
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-gray-200/40 border border-gray-100">
                    <div className="space-y-8 text-[#475569] leading-relaxed text-base md:text-lg">
                        <p>
                            Founded in 2026, TechFlow started with a simple vision: to bridge the gap between cutting-edge technology and everyday consumers. We believe that premium tech shouldn't be a luxury, but an accessible tool that empowers you to live better, work smarter, and play harder.
                        </p>
                        <p>
                            Our expertly curated selection features only the highest-rated devices, rigorously tested by our team of hardware enthusiasts. From industry-leading smartphones and high-performance laptops to immersive audio gear, every product in our catalog embodies quality and innovation.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100/50">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                                <p className="text-sm leading-relaxed">To provide seamless access to top-tier technology, paired with unmatched customer support and transparent pricing.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Promise</h3>
                                <p className="text-sm leading-relaxed">We stand behind every gadget we sell. With 30-day hassle-free returns and comprehensive warranty coverage, your satisfaction is our priority.</p>
                            </div>
                        </div>
                        <p>
                            Thank you for choosing TechFlow. Whether you're upgrading your home office, building the ultimate gaming setup, or simply looking for the next best smartphone, we are here to power your digital life.
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center">
                    <div className="w-16 h-1 bg-orange-500 rounded-full mb-8"></div>
                    <Link href="/Home" className="inline-block px-10 py-4 bg-[#0F172A] text-white font-bold rounded-xl shadow-[0_8px_30px_rgba(15,23,42,0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.3)] hover:bg-[#1e293b]">
                        Explore Our Products
                    </Link>
                </div>
            </main>
        </div>
    );
}
