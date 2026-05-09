// app/support/page.jsx
import Link from 'next/link';
import { ArrowLeft, Zap, Phone, Mail, MessageSquare, MapPin, Clock, FileText } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="min-h-[70vh] bg-white dark:bg-[#0f151c] flex flex-col font-['public-sans',sans-serif]">
            <main className="flex-1 w-full">
                {/* Hero Section */}
                <div className="bg-[#0F172A] py-20 px-6 relative overflow-hidden">
                    {/* Abstract background blobs */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 tracking-tight">
                            How can we help you today?
                        </h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            Whether you have a question about our products, need help with an order, or just want to say hello, our team is ready to assist you round the clock.
                        </p>
                    </div>
                </div>

                {/* Contact Cards Grid */}
                <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Phone */}
                        <div className="bg-white dark:bg-[#0B0F15] rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-200 dark:border-white/5 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Phone size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Call Us</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Speak directly to our support agents. We're available 24/7 for urgent inquiries.</p>
                            <a href="tel:+18001234567" className="text-2xl font-black text-[#0F172A] hover:text-emerald-400 transition-colors">
                                +1 (800) 123-4567
                            </a>
                        </div>

                        {/* Email */}
                        <div className="bg-white dark:bg-[#0B0F15] rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-200 dark:border-white/5 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <Mail size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Drop us a line anytime. We typically respond within 2-4 business hours.</p>
                            <a href="mailto:support@techflow.com" className="text-xl font-bold text-[#0F172A] hover:text-emerald-400 transition-colors">
                                support@techflow.com
                            </a>
                        </div>

                        {/* Chat */}
                        <div className="bg-white dark:bg-[#0B0F15] rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-200 dark:border-white/5 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
                            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                <MessageSquare size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                            <p className="text-slate-500 text-sm mb-6 flex-1">Need a quick answer? Chat with our bot or a live human agent instantly.</p>
                            <button className="px-6 py-3 bg-[#0F172A] text-gray-900 dark:text-white font-bold rounded-xl hover:bg-[#1e293b] w-full transition-colors shadow-md">
                                Start Chat
                            </button>
                        </div>
                    </div>
                </div>

                {/* FAQ & Form Section */}
                <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Office Info */}
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">More Information</h2>
                        
                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-gray-100 text-gray-600 dark:text-[#AABDD1] rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Corporate Headquarters</h4>
                                    <p className="text-slate-500 leading-relaxed">
                                        123 Innovation Drive, Silicon Valley<br/>
                                        San Francisco, CA 94107<br/>
                                        United States
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 items-start">
                                <div className="w-12 h-12 bg-gray-100 text-gray-600 dark:text-[#AABDD1] rounded-xl flex items-center justify-center shrink-0">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Business Hours</h4>
                                    <p className="text-slate-500 leading-relaxed">
                                        Monday - Friday: 9:00 AM - 8:00 PM (PST)<br/>
                                        Saturday: 10:00 AM - 4:00 PM (PST)<br/>
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start pt-4 border-t border-gray-200 dark:border-white/10">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Need to return an item?</h4>
                                    <p className="text-slate-500 leading-relaxed mb-3">
                                        Check out our hassle-free returns policy and initiate a return process online.
                                    </p>
                                    <Link href="#" className="text-emerald-400 font-bold hover:underline flex items-center gap-1 w-max">
                                        View Return Policy <ArrowLeft size={14} className="rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-[#0B0F15] rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-white/5">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">Send us a message</h2>
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-[#DFE6EE]">First Name</label>
                                    <input type="text" className="px-4 py-3 bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-400 focus:bg-white dark:bg-[#0B0F15] transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-[#DFE6EE]">Last Name</label>
                                    <input type="text" className="px-4 py-3 bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-400 focus:bg-white dark:bg-[#0B0F15] transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            
                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 dark:text-[#DFE6EE]">Email Address</label>
                                <input type="email" className="px-4 py-3 bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-400 focus:bg-white dark:bg-[#0B0F15] transition-colors" placeholder="johndoe@example.com" />
                            </div>

                            <div className="space-y-1.5 flex flex-col relative">
                                <label className="text-sm font-semibold text-gray-700 dark:text-[#DFE6EE]">Subject</label>
                                <select className="px-4 py-3 bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-400 focus:bg-white dark:bg-[#0B0F15] transition-colors appearance-none text-gray-700 dark:text-[#DFE6EE] font-medium">
                                    <option>Order Inquiry</option>
                                    <option>Product Support</option>
                                    <option>Returns & Refunds</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-sm font-semibold text-gray-700 dark:text-[#DFE6EE]">Message</label>
                                <textarea rows="4" className="px-4 py-3 bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-emerald-400 focus:bg-white dark:bg-[#0B0F15] transition-colors resize-none" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="w-full mt-2 py-4 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
