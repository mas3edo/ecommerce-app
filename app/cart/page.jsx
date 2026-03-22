"use client";

import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    
    const cart = useStore(state => state.cart || []);
    const removeFromCart = useStore(state => state.removeFromCart);
    const updateQuantity = useStore(state => state.updateQuantity);
    const clearCart = useStore(state => state.clearCart);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 1)), 0);
    const shipping = subtotal > 0 ? 15.00 : 0; // Flat rate or free over certain amount
    const tax = subtotal * 0.05; // 5% tax example
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50 py-12 font-['public-sans',sans-serif]">
            <div className="max-w-7xl mx-auto px-6">
                <Link href="/Home" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 font-semibold mb-6 transition-colors">
                    <ArrowLeft size={18} />
                    Back to Shop
                </Link>
                
                <h1 className="text-3xl font-bold text-[#0F172A] mb-8 tracking-tight">Your Cart</h1>
                
                {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6">
                            <ShoppingCart size={32} strokeWidth={2} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any premium gadgets to your cart yet. Discover our top-tier products!</p>
                        <Link href="/Home" className="px-8 py-3.5 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Items ({cart.length})</h2>
                                <button onClick={clearCart} className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
                                    Clear Cart
                                </button>
                            </div>

                            <div className="flex flex-col gap-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                        {/* Image */}
                                        <Link href={`/product/${item.id}`} className="w-full sm:w-32 h-32 bg-[#F8FAFC] rounded-xl flex items-center justify-center p-3 mix-blend-multiply flex-shrink-0 border border-transparent hover:border-orange-200 transition-all">
                                            <img src={item.image || item.image_url} alt={item.title || item.name} className="max-w-full max-h-full object-contain mix-blend-darken hover:scale-105 transition-transform" />
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <Link href={`/product/${item.id}`} className="hover:text-orange-500 transition-colors inline-block">
                                                        <h3 className="font-bold text-[#0F172A] text-lg mb-1 leading-tight">{item.title || item.name}</h3>
                                                    </Link>
                                                    {item.brand && <p className="text-sm text-gray-500 font-medium">{item.brand}</p>}
                                                </div>
                                                <span className="font-extrabold text-orange-500 text-lg">
                                                    ${Number(item.price).toFixed(2)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
                                                    <button 
                                                        onClick={(e) => { e.preventDefault(); updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1)); }}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                                                    >
                                                        <Minus size={14} strokeWidth={2.5} />
                                                    </button>
                                                    <span className="w-10 text-center font-bold text-sm text-gray-900">
                                                        {item.quantity || 1}
                                                    </span>
                                                    <button 
                                                        onClick={(e) => { e.preventDefault(); updateQuantity(item.id, (item.quantity || 1) + 1); }}
                                                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                                                    >
                                                        <Plus size={14} strokeWidth={2.5} />
                                                    </button>
                                                </div>

                                                <button 
                                                    onClick={(e) => { e.preventDefault(); removeFromCart(item.id); }}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg hover:text-red-500 hover:bg-red-50 transition-colors group"
                                                >
                                                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96 shrink-0">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Order Summary</h2>

                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span className="text-sm">Subtotal</span>
                                        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span className="text-sm">Shipping estimate</span>
                                        <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600">
                                        <span className="text-sm">Tax estimate</span>
                                        <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-extrabold text-orange-500">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-[#0F172A] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1e293b] hover:shadow-[0_8px_25px_rgba(15,23,42,0.25)] group">
                                    Checkout Now
                                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 mt-0.5" />
                                </button>
                                
                                <p className="text-xs text-center text-gray-400 mt-4 mb-6">Taxes and shipping calculated at checkout</p>

                                {/* Payment Methods Badges */}
                                <div className="border-t border-gray-100 pt-6">
                                    <p className="text-xs text-center text-[#64748B] mb-3 font-semibold uppercase tracking-wider">Guaranteed Safe Checkout</p>
                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        <div className="h-7 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center">
                                            <span className="text-[12px] font-bold text-[#1434CB] italic tracking-tighter">VISA</span>
                                        </div>
                                        <div className="h-7 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center">
                                            <span className="text-[12px] font-bold text-black tracking-tight"> Pay</span>
                                        </div>
                                        <div className="h-7 px-2.5 bg-white border border-gray-200 rounded flex items-center justify-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-[#00A54F]"></div>
                                            <span className="text-[11px] font-bold text-[#00A54F] tracking-tight">mada</span>
                                        </div>
                                        <div className="h-7 px-2.5 bg-[#E7FF00] border border-[#d6ec00] rounded flex items-center justify-center">
                                            <span className="text-[10px] font-black text-black uppercase tracking-tight">tabby</span>
                                        </div>
                                        <div className="h-7 px-2.5 bg-[#FFB5A6] border border-[#FFA593] rounded flex items-center justify-center">
                                            <span className="text-[11px] font-bold text-black tracking-tight">tamara</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
