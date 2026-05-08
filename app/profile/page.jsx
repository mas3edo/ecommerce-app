"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/data";
import { useStore } from "../store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, Mail, Phone, MapPin, Package, Heart, ShoppingCart,
  LogOut, Edit3, Save, X, Camera, CheckCircle, Clock, Truck,
  Star, ArrowRight, ArrowLeft, ChevronRight, ShieldCheck,
  BadgeCheck, Loader2
} from "lucide-react";

const STATUS_CONFIG = {
  confirmed:  { label: "Confirmed",  color: "text-blue-600 bg-blue-50 border-blue-200",   icon: <CheckCircle size={14} /> },
  processing: { label: "Processing", color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: <Clock size={14} /> },
  shipped:    { label: "Shipped",    color: "text-purple-600 bg-purple-50 border-purple-200", icon: <Truck size={14} /> },
  delivered:  { label: "Delivered",  color: "text-green-600 bg-green-50 border-green-200",  icon: <CheckCircle size={14} /> },
  cancelled:  { label: "Cancelled",  color: "text-red-600 bg-red-500/10 border-red-200",       icon: <X size={14} /> },
};

const TABS = ["Overview", "My Orders", "Account Settings"];

export default function ProfilePage() {
  const router = useRouter();
  const favorites = useStore((s) => s.favorites || []);
  const cart = useStore((s) => s.cart || []);
  const localOrders = useStore((s) => s.orders || []);

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ full_name: "", phone: "", address: "", city: "" });
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [saved, setSaved] = useState(false);

  const fetchOrders = async (userId) => {
    if (!userId) return;
    setLoadingOrders(true);
    const { data: ords } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (ords && ords.length > 0) {
      setOrders(ords);
    }
    setLoadingOrders(false);
  };

  useEffect(() => {
    setMounted(true);
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/"); return; }
      setUser(user);

      // Fetch profile
      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (prof) setProfile(prof);

      // Fetch orders
      await fetchOrders(user.id);
    };
    init();
  }, [router]);

  // Auto-refresh orders every 30 seconds
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      fetchOrders(user.id);
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleEdit = () => {
    setEditForm({ ...profile });
    setEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...editForm, updated_at: new Date().toISOString() });
    if (!error) {
      setProfile({ ...editForm });
      setEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Merge local orders (always available) + Supabase orders, newest first, deduplicated by ID
  const mergedOrders = [
    ...localOrders,
    ...orders.filter(o => !localOrders.some(lo => lo.id === o.id)),
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const totalSpent = mergedOrders.reduce((a, o) => a + (o.total || 0), 0);
  const displayName = profile.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f151c] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f151c] font-['public-sans',sans-serif]">

      {/* Top Navigation */}
      <div className="bg-white dark:bg-[#0B0F15] border-b border-gray-200 dark:border-white/10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/Home" className="flex items-center gap-2 text-gray-500 dark:text-[#7C94B0] hover:text-emerald-400 font-medium text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Shop
          </Link>
          <Link href="/Home" className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-md flex items-center justify-center text-gray-900 dark:text-white text-xs font-black">T</div>
            <span className="font-black text-gray-900 dark:text-white text-sm">TECH<span className="text-emerald-400">FLOW</span></span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-[#7C94B0] hover:text-red-500 font-semibold transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Profile Hero Banner */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-gray-900 dark:text-white text-3xl font-black shadow-2xl border-4 border-white/20">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-400 rounded-full border-2 border-[#0F172A] flex items-center justify-center">
                <div className="w-2 h-2 bg-white dark:bg-[#0B0F15] rounded-full" />
              </div>
            </div>
            <div className="text-center sm:text-left pb-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">{displayName}</h1>
                {user?.user_metadata?.role === 'admin' && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-bold">
                    <BadgeCheck size={12} /> Admin
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              <p className="text-slate-500 text-xs mt-1">Member since {new Date(user?.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
            </div>

            {/* Quick Stats */}
            <div className="sm:ml-auto flex gap-4 sm:gap-8">
              {[
                { label: "Orders", value: mergedOrders.length },
                { label: "Wishlist", value: favorites.length },
                { label: "Total Spent", value: `$${totalSpent.toFixed(0)}` },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#0B0F15] border-b border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-4 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === i
                    ? "border-emerald-400 text-emerald-400"
                    : "border-transparent text-gray-500 dark:text-[#7C94B0] hover:text-gray-900 dark:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TAB 0: Overview */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <StatCard icon={<Package size={22} />} label="Total Orders" value={mergedOrders.length} color="blue" sub="All time" />
            <StatCard icon={<Heart size={22} />} label="Wishlist Items" value={favorites.length} color="red" sub="Saved products" />
            <StatCard icon={<ShoppingCart size={22} />} label="Cart Items" value={cart.reduce((a, i) => a + (i.quantity || 1), 0)} color="orange" sub="Ready to checkout" />

            {/* Recent Orders */}
            <div className="md:col-span-2 bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Recent Orders</h2>
                <button onClick={() => setActiveTab(1)} className="text-sm text-emerald-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              {loadingOrders ? (
                <div className="flex justify-center py-8"><Loader2 size={24} className="animate-spin text-gray-300" /></div>
              ) : mergedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package size={36} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-[#7C94B0] text-sm">No orders yet</p>
                  <Link href="/Home" className="text-emerald-400 font-semibold text-sm mt-2 inline-block hover:underline">Start Shopping →</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {mergedOrders.slice(0, 3).map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Preview */}
            <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Wishlist</h2>
                <Link href="/favorite" className="text-sm text-emerald-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View <ChevronRight size={14} />
                </Link>
              </div>
              {favorites.length === 0 ? (
                <div className="text-center py-6">
                  <Heart size={32} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-[#7C94B0] text-sm">No saved items</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.slice(0, 4).map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="flex items-center gap-3 group hover:bg-white dark:bg-[#0f151c] rounded-xl p-2 -mx-2 transition-colors">
                      <div className="w-10 h-10 bg-white dark:bg-[#0f151c] rounded-lg flex items-center justify-center shrink-0">
                        <img src={p.image || p.image_url} alt={p.title || p.name} className="w-full h-full object-contain mix-blend-darken" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-emerald-400 transition-colors">{p.title || p.name}</p>
                        <p className="text-xs text-emerald-400 font-bold">${p.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: My Orders */}
        {activeTab === 1 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h2>
              <button
                onClick={() => fetchOrders(user.id)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors text-sm"
              >
                {loadingOrders ? <Loader2 size={16} className="animate-spin" /> : "Refresh"}
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-[#7C94B0] mb-6">{mergedOrders.length} order{mergedOrders.length !== 1 ? "s" : ""}</p>

            {loadingOrders ? (
              <div className="flex justify-center py-20"><Loader2 size={32} className="animate-spin text-emerald-400" /></div>
            ) : mergedOrders.length === 0 ? (
              <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-16 text-center">
                <Package size={48} className="text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                <p className="text-gray-500 dark:text-[#7C94B0] mb-6">When you place an order, it will appear here.</p>
                <Link href="/Home" className="px-8 py-3 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors inline-flex items-center gap-2">
                  <ShoppingCart size={18} /> Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {mergedOrders.map((order) => (
                  <div key={order.id} className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-white dark:bg-[#0f151c] border-b border-gray-200 dark:border-white/5">
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-[#7C94B0] font-medium">Order ID</p>
                          <p className="font-mono text-xs font-bold text-gray-700 dark:text-[#DFE6EE]">{order.id.slice(0, 8).toUpperCase()}...</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-[#7C94B0] font-medium">Date</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {new Date(order.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-[#7C94B0] font-medium">Total</p>
                          <p className="text-sm font-extrabold text-emerald-400">${order.total?.toFixed(2)}</p>
                        </div>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>

                    {/* Order Items */}
                    <div className="px-6 py-4">
                      <div className="space-y-3">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-[#0f151c] rounded-xl flex items-center justify-center shrink-0">
                              {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-darken" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{item.title}</p>
                              <p className="text-xs text-gray-500 dark:text-[#7C94B0]">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    {order.shipping_address && (
                      <div className="px-6 py-3 border-t border-white/5 flex items-center gap-2 text-xs text-gray-500 dark:text-[#7C94B0]">
                        <MapPin size={12} className="text-emerald-400 shrink-0" />
                        <span>{order.shipping_name} — {order.shipping_address}, {order.shipping_city}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Account Settings */}
        {activeTab === 2 && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h2>
              {!editing ? (
                <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-semibold text-gray-700 dark:text-[#DFE6EE] hover:bg-white dark:bg-[#0f151c] transition-colors">
                  <Edit3 size={15} /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-semibold text-gray-500 dark:text-[#7C94B0] hover:bg-white dark:bg-[#0f151c] transition-colors">
                    <X size={15} /> Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-gray-900 dark:text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50">
                    {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                    Save
                  </button>
                </div>
              )}
            </div>

            {saved && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 text-sm font-semibold">
                <CheckCircle size={16} /> Profile updated successfully!
              </div>
            )}

            <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6 space-y-5">
              <ProfileField
                icon={<User size={16} />} label="Full Name"
                name="full_name" value={editing ? editForm.full_name : profile.full_name}
                editing={editing} placeholder="Your full name"
                onChange={(e) => setEditForm(p => ({ ...p, full_name: e.target.value }))}
              />
              <ProfileField
                icon={<Mail size={16} />} label="Email Address"
                value={user?.email} editing={false}
              />
              <ProfileField
                icon={<Phone size={16} />} label="Phone Number"
                name="phone" value={editing ? editForm.phone : profile.phone}
                editing={editing} placeholder="+20 100 000 0000"
                onChange={(e) => setEditForm(p => ({ ...p, phone: e.target.value }))}
              />
              <ProfileField
                icon={<MapPin size={16} />} label="Street Address"
                name="address" value={editing ? editForm.address : profile.address}
                editing={editing} placeholder="Your delivery address"
                onChange={(e) => setEditForm(p => ({ ...p, address: e.target.value }))}
              />
              <ProfileField
                icon={<MapPin size={16} />} label="City"
                name="city" value={editing ? editForm.city : profile.city}
                editing={editing} placeholder="Your city"
                onChange={(e) => setEditForm(p => ({ ...p, city: e.target.value }))}
              />
            </div>

            {/* Danger Zone */}
            <div className="mt-8 p-5 bg-red-500/10 border border-red-100 rounded-2xl">
              <h3 className="font-bold text-red-700 mb-1">Danger Zone</h3>
              <p className="text-sm text-red-500 mb-4">These actions are irreversible. Please be careful.</p>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#0B0F15] text-red-500 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-500/100/100 hover:text-gray-900 dark:text-white transition-colors">
                <LogOut size={15} /> Sign Out of Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Sub-components
function StatCard({ icon, label, value, color, sub }) {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    red: "bg-red-500/10 text-red-500",
    orange: "bg-emerald-50 text-emerald-400",
    green: "bg-green-50 text-green-500",
  };
  return (
    <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-6">
      <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="font-semibold text-gray-700 dark:text-[#DFE6EE] text-sm">{label}</div>
      <div className="text-xs text-gray-500 dark:text-[#7C94B0] mt-1">{sub}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.confirmed;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
      {cfg.icon} {cfg.label}
    </span>
  );
}

function OrderRow({ order }) {
  const firstItem = order.items?.[0];
  return (
    <div className="flex items-center gap-4 p-3 hover:bg-white dark:bg-[#0f151c] rounded-xl transition-colors">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 text-gray-500 dark:text-[#7C94B0]">
        {firstItem?.image ? (
          <img src={firstItem.image} alt={firstItem.title} className="w-full h-full object-contain mix-blend-darken rounded-lg" />
        ) : (
          <Package size={16} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          {firstItem?.title || "Order"} {order.items?.length > 1 ? `+${order.items.length - 1}` : ""}
        </p>
        <p className="text-xs text-gray-500 dark:text-[#7C94B0]">{new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-extrabold text-emerald-400">${order.total?.toFixed(2)}</p>
        <StatusBadge status={order.status} />
      </div>
    </div>
  );
}

function ProfileField({ icon, label, name, value, editing, placeholder, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 dark:text-[#7C94B0] uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0]">{icon}</div>
        {editing && onChange ? (
          <input
            type="text" name={name} value={value || ""} onChange={onChange} placeholder={placeholder}
            className="w-full pl-9 pr-4 py-3 border border-emerald-300 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm bg-emerald-50/30"
          />
        ) : (
          <div className="w-full pl-9 pr-4 py-3 bg-white dark:bg-[#0f151c] border border-gray-200 dark:border-white/5 rounded-xl text-sm text-gray-700 dark:text-[#DFE6EE] font-medium">
            {value || <span className="text-gray-300 italic">{placeholder || "Not set"}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
