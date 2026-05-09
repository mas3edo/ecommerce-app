"use client";

import { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { supabase } from "../lib/data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ShoppingCart, CheckCircle, Package,
  MapPin, Phone, User, CreditCard, Truck, Shield,
  ChevronRight, Loader2, Sparkles
} from "lucide-react";

const STEPS = ["Cart Review", "Shipping Info", "Payment", "Confirmed"];

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((s) => s.cart || []);
  const clearCart = useStore((s) => s.clearCart);
  const addOrder = useStore((s) => s.addOrder);

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0); // 0=Review, 1=Shipping, 2=Payment, 3=Done
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [user, setUser] = useState(null);

  // Shipping form
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  // Fake card form
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  useEffect(() => {
    setMounted(true);
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f151c] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const subtotal = cart.reduce((a, i) => a + (i.price || 0) * (i.quantity || 1), 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleFieldChange = (setter) => (e) => {
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formatCard = (val) => {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const v = val.replace(/\D/g, "").slice(0, 4);
    return v.length >= 3 ? v.slice(0, 2) + "/" + v.slice(2) : v;
  };

  const generateFallbackId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const items = cart.map((i) => ({
        id: i.id,
        title: i.title || i.name,
        price: i.price,
        quantity: i.quantity || 1,
        image: i.image || i.image_url,
      }));

      const orderPayload = {
        user_id: user.id,
        items,
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        status: "confirmed",
        shipping_name: form.name,
        shipping_address: form.address,
        shipping_city: form.city,
        shipping_phone: form.phone,
      };

      // Try to save to Supabase DB
      let finalId = generateFallbackId();
      try {
        const { data, error } = await supabase
          .from("orders")
          .insert(orderPayload)
          .select("id")
          .single();
        if (!error && data) finalId = data.id;
        else console.warn("DB insert failed (table may not exist yet):", error?.message);
      } catch (dbErr) {
        console.warn("DB unavailable, using local order:", dbErr);
      }

      // ✅ Always save to local Zustand store (persisted in localStorage)
      // This guarantees orders always appear in Profile
      const localOrder = {
        id: finalId,
        ...orderPayload,
        created_at: new Date().toISOString(),
      };
      addOrder(localOrder);

      setOrderId(finalId);
      clearCart();
      setStep(3);
    } catch (err) {
      console.error("Order error:", err);
      // Absolute fallback
      const fallbackId = generateFallbackId();
      addOrder({
        id: fallbackId,
        items: cart.map(i => ({ id: i.id, title: i.title || i.name, price: i.price, quantity: i.quantity || 1, image: i.image })),
        total: parseFloat(total.toFixed(2)),
        subtotal: parseFloat(subtotal.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        status: "confirmed",
        shipping_name: form.name,
        shipping_address: form.address,
        shipping_city: form.city,
        created_at: new Date().toISOString(),
      });
      setOrderId(fallbackId);
      clearCart();
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f151c] flex flex-col items-center justify-center gap-6 p-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-400 rounded-full flex items-center justify-center">
          <ShoppingCart size={36} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h1>
        <Link href="/Home" className="px-8 py-3 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f151c] font-['public-sans',sans-serif]">
      {/* Header */}
      <div className="bg-white dark:bg-[#0B0F15] border-b border-gray-200 dark:border-white/10 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-gray-500 dark:text-[#7C94B0] hover:text-emerald-400 font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Cart
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-gray-900 dark:text-white">
              <span className="text-sm font-black">T</span>
            </div>
            <span className="font-black text-gray-900 dark:text-white">TECH<span className="text-emerald-400">FLOW</span></span>
          </div>
          <div className="w-24" />
        </div>
      </div>

      {/* Stepper */}
      {step < 3 && (
        <div className="bg-white dark:bg-[#0B0F15] border-b border-gray-200 dark:border-white/5 py-5">
          <div className="max-w-2xl mx-auto px-6">
            <div className="flex items-center justify-between relative">
              {STEPS.slice(0, 3).map((s, i) => (
                <div key={s} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    step > i ? "bg-emerald-500 border-emerald-400 text-gray-900 dark:text-white" :
                    step === i ? "bg-white dark:bg-[#0B0F15] border-emerald-400 text-emerald-400" :
                    "bg-white dark:bg-[#0B0F15] border-gray-300 text-gray-500 dark:text-[#7C94B0]"
                  }`}>
                    {step > i ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <span className={`text-xs mt-2 font-semibold hidden sm:block ${step >= i ? "text-emerald-400" : "text-gray-500 dark:text-[#7C94B0]"}`}>{s}</span>
                </div>
              ))}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* STEP 0: Cart Review */}
        {step === 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Review Your Order</h2>
              <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                {cart.map((item, idx) => (
                  <div key={item.id} className={`flex items-center gap-4 p-5 ${idx !== cart.length - 1 ? "border-b border-white/5" : ""}`}>
                    <div className="w-16 h-16 bg-white dark:bg-[#0f151c] rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={item.image || item.image_url} alt={item.title || item.name} className="w-full h-full object-contain mix-blend-darken" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 dark:text-white truncate">{item.title || item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-[#7C94B0]">Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="font-extrabold text-emerald-400 shrink-0">
                      ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total}>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-4 bg-[#0F172A] text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1e293b] transition-all group mt-4"
                >
                  Proceed to Shipping <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </OrderSummary>
            </div>
          </div>
        )}

        {/* STEP 1: Shipping Info */}
        {step === 1 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
              <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">Full Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0]" />
                    <input
                      type="text" name="name" value={form.name} onChange={handleFieldChange(setForm)}
                      placeholder="e.g. Ahmed Mohamed"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">Street Address</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0]" />
                    <input
                      type="text" name="address" value={form.address} onChange={handleFieldChange(setForm)}
                      placeholder="e.g. 12 Tahrir Square, Cairo"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">City</label>
                  <input
                    type="text" name="city" value={form.city} onChange={handleFieldChange(setForm)}
                    placeholder="e.g. Cairo"
                    className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0]" />
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleFieldChange(setForm)}
                      placeholder="e.g. +20 100 000 0000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total}>
                <button
                  onClick={() => { if (form.name && form.address && form.city && form.phone) setStep(2); }}
                  disabled={!form.name || !form.address || !form.city || !form.phone}
                  className="w-full py-4 bg-[#0F172A] text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#1e293b] transition-all group mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </OrderSummary>
            </div>
          </div>
        )}

        {/* STEP 2: Payment (Fake) */}
        {step === 2 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Details</h2>
              <p className="text-sm text-emerald-600 font-semibold mb-6 flex items-center gap-1">
                <Shield size={14} /> Demo mode — No real charge will be made
              </p>

              {/* Fake Credit Card UI */}
              <div className="mb-6">
                <div className="relative w-full max-w-sm h-44 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-gray-900 dark:text-white p-6 shadow-2xl overflow-hidden mb-5">
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-[#0B0F15]/10" />
                  <div className="absolute top-4 right-10 w-10 h-10 rounded-full bg-emerald-500/40" />
                  <p className="text-xs font-semibold text-white/60 mb-1">Card Number</p>
                  <p className="text-lg font-mono tracking-[0.2em] mb-4">
                    {card.number || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-white/60">Card Holder</p>
                      <p className="font-semibold text-sm truncate max-w-[140px]">{card.name || "YOUR NAME"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60">Expires</p>
                      <p className="font-semibold text-sm">{card.expiry || "MM/YY"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0]" />
                    <input
                      type="text" placeholder="1234 5678 9012 3456"
                      value={card.number}
                      onChange={(e) => setCard(p => ({ ...p, number: formatCard(e.target.value) }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm font-mono"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">Expiry Date</label>
                    <input
                      type="text" placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) => setCard(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">CVV</label>
                    <input
                      type="text" placeholder="•••"
                      value={card.cvv}
                      maxLength={4}
                      onChange={(e) => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] mb-2">Name on Card</label>
                  <input
                    type="text" placeholder="e.g. AHMED MOHAMED"
                    value={card.name}
                    onChange={(e) => setCard(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0">
              <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total}>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !card.number || !card.expiry || !card.cvv || !card.name}
                  className="w-full py-4 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Processing...</>
                  ) : (
                    <><Shield size={18} /> Place Order — ${total.toFixed(2)}</>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500 dark:text-[#7C94B0] mt-3">🔒 Secured & Encrypted (Demo)</p>
              </OrderSummary>
            </div>
          </div>
        )}

        {/* STEP 3: Order Confirmed */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
              <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Order Confirmed!</span>
              <Sparkles size={20} className="text-emerald-400" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Thank You! 🎉</h1>
            <p className="text-gray-500 dark:text-[#7C94B0] text-lg mb-2 max-w-md">
              Your order has been placed successfully. You'll receive a confirmation shortly.
            </p>
            {orderId && (
              <div className="bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/10 rounded-xl px-6 py-3 mb-8 mt-2">
                <p className="text-xs text-gray-500 dark:text-[#7C94B0] font-medium">Order ID</p>
                <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">{orderId}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 max-w-sm mb-10">
              {[
                { icon: <CheckCircle size={20} />, label: "Confirmed", color: "text-green-500 bg-green-50" },
                { icon: <Package size={20} />, label: "Processing", color: "text-blue-500 bg-blue-50" },
                { icon: <Truck size={20} />, label: "On its way", color: "text-emerald-400 bg-emerald-50" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.color}`}>{s.icon}</div>
                  <span className="text-xs font-semibold text-gray-600 dark:text-[#AABDD1]">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/profile" className="px-8 py-3 bg-[#0F172A] text-gray-900 dark:text-white font-bold rounded-xl hover:bg-[#1e293b] transition-colors flex items-center gap-2">
                <Package size={18} /> View My Orders
              </Link>
              <Link href="/Home" className="px-8 py-3 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-[#DFE6EE] font-bold rounded-xl hover:bg-white dark:bg-[#0f151c] transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Order Summary Card
function OrderSummary({ subtotal, shipping, tax, total, children }) {
  return (
    <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/5 pb-4 mb-4">Order Summary</h3>
      <div className="space-y-3 mb-6 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-[#AABDD1]">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-[#AABDD1]">
          <span>Shipping</span>
          <span className="font-semibold text-gray-900 dark:text-white">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-[#AABDD1]">
          <span>Tax (5%)</span>
          <span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-white/5 pt-4 flex justify-between items-center mb-1">
        <span className="font-bold text-gray-900 dark:text-white">Total</span>
        <span className="text-2xl font-extrabold text-emerald-400">${total.toFixed(2)}</span>
      </div>
      {children}
    </div>
  );
}
