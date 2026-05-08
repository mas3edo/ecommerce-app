"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingBag, Users, TrendingUp,
  Plus, Trash2, Edit3, X, Save, Loader2, Search, BadgeCheck,
  ArrowLeft, Eye, AlertTriangle, CheckCircle, BarChart3,
  DollarSign, ShoppingCart, Star
} from "lucide-react";

// The hardcoded admin user ID (always has admin access)
const ADMIN_USER_ID = "9ea6042d-5b5b-4ec9-ae42-48f4239337fd";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const emptyForm = { name: "", description: "", price: "", category: "", image_url: "", brand: "" };
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  // Auth Check — allow hardcoded admin ID OR role=admin metadata
  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/"); return; }
      setUser(user);
      const role = user?.user_metadata?.role;
      const isAllowed = role === "admin" || user.id === ADMIN_USER_ID;
      if (!isAllowed) {
        router.replace("/Home");
        return;
      }
      setIsAdmin(true);
      setCheckingAuth(false);
    };
    check();
  }, [router]);

  // Fetch Data
  useEffect(() => {
    if (!isAdmin) return;
    fetchProducts();
    fetchOrders();

    // Auto-refresh orders every 30 seconds
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (data) setProducts(data);
    setLoadingProducts(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data);
    setLoadingOrders(false);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrder(orderId);
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);
    
    if (!error) {
      setOrders(prevOrders =>
        prevOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
      );
    }
    setUpdatingOrder(null);
  };

  const handleSaveProduct = async () => {
    setFormError("");
    if (!form.name || !form.price) { setFormError("Name and price are required."); return; }
    setSavingProduct(true);

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category,
      image_url: form.image_url,
      brand: form.brand,
    };

    let error;
    if (editingProduct) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editingProduct.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (!error) {
      setShowAddModal(false);
      setEditingProduct(null);
      setForm(emptyForm);
      fetchProducts();
    } else {
      setFormError(error.message);
    }
    setSavingProduct(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    setDeletingId(id);
    await supabase.from("products").delete().eq("id", id);
    setProducts(p => p.filter(x => x.id !== id));
    setDeletingId(null);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || product.title || "",
      description: product.description || "",
      price: String(product.price || ""),
      category: product.category || "",
      image_url: product.image_url || product.image || "",
      brand: product.brand || "",
    });
    setFormError("");
    setShowAddModal(true);
  };

  const totalRevenue = orders.reduce((a, o) => a + (o.total || 0), 0);
  const filteredProducts = products.filter(p =>
    (p.name || p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const STATUS_COLORS = {
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0f151c] flex items-center justify-center flex-col gap-4">
        <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 dark:text-[#7C94B0] font-medium">Verifying admin access...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f151c] font-['public-sans',sans-serif]">
      {/* Sidebar */}
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0F172A] shrink-0">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <Link href="/Home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-gray-900 dark:text-white font-black text-sm">T</div>
              <span className="text-gray-900 dark:text-white font-black">TECH<span className="text-emerald-400">FLOW</span></span>
            </Link>
            <div className="flex items-center gap-1 mt-3 px-2 py-1 bg-emerald-500/10 rounded-lg w-fit">
              <BadgeCheck size={12} className="text-emerald-400" />
              <span className="text-emerald-400 text-xs font-bold">Admin Panel</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {[
              { id: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
              { id: "products", icon: <Package size={18} />, label: "Products" },
              { id: "orders", icon: <ShoppingBag size={18} />, label: "Orders" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-emerald-500 text-gray-900 dark:text-white"
                    : "text-slate-400 hover:text-gray-900 dark:text-white hover:bg-white dark:bg-[#0B0F15]/5"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div className="px-4 py-5 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-gray-900 dark:text-white text-xs font-black">
                {(user?.email?.[0] || "A").toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white text-xs font-semibold truncate">{user?.email}</p>
                <p className="text-slate-500 text-[10px]">Administrator</p>
              </div>
            </div>
            <Link href="/Home" className="flex items-center gap-2 mt-2 px-3 py-2 text-slate-400 hover:text-gray-900 dark:text-white text-xs font-medium transition-colors">
              <ArrowLeft size={14} /> Back to Store
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-[#0F172A] px-4 py-3 flex items-center justify-between">
            <Link href="/Home" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-500 rounded-md flex items-center justify-center text-gray-900 dark:text-white font-black text-xs">T</div>
              <span className="text-gray-900 dark:text-white font-black text-sm">TECH<span className="text-emerald-400">FLOW</span></span>
            </Link>
            <div className="flex gap-2">
              {["overview", "products", "orders"].map((t) => (
                <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${activeTab === t ? "bg-emerald-500 text-gray-900 dark:text-white" : "text-slate-400"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 lg:p-8">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
                    <p className="text-gray-500 dark:text-[#7C94B0] text-sm">Welcome back, Admin! Here's what's happening.</p>
                  </div>
                  <button
                    onClick={() => { fetchProducts(); fetchOrders(); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
                  >
                    {loadingProducts || loadingOrders ? <Loader2 size={18} className="animate-spin" /> : "Refresh All"}
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total Products", value: products.length, icon: <Package size={20} />, color: "blue", sub: "In catalog" },
                    { label: "Total Orders", value: orders.length, icon: <ShoppingCart size={20} />, color: "orange", sub: "All time" },
                    { label: "Revenue", value: `$${totalRevenue.toFixed(0)}`, icon: <DollarSign size={20} />, color: "green", sub: "Simulated" },
                    { label: "Avg. Order", value: orders.length ? `$${(totalRevenue / orders.length).toFixed(0)}` : "$0", icon: <BarChart3 size={20} />, color: "purple", sub: "Per order" },
                  ].map((s) => (
                    <AdminStatCard key={s.label} {...s} />
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/5">
                    <h2 className="font-bold text-gray-900 dark:text-white">Recent Orders</h2>
                    <button onClick={() => setActiveTab("orders")} className="text-sm text-emerald-400 font-semibold hover:underline">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-white dark:bg-[#0f151c] text-xs text-gray-500 dark:text-[#7C94B0] font-semibold uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Order</th>
                          <th className="px-6 py-3 text-left">Items</th>
                          <th className="px-6 py-3 text-left">Total</th>
                          <th className="px-6 py-3 text-left">Date</th>
                          <th className="px-6 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-white dark:bg-[#0f151c] transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-[#AABDD1]">{o.id.slice(0, 8)}...</td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-[#DFE6EE]">{o.items?.length || 0} item(s)</td>
                            <td className="px-6 py-4 text-sm font-extrabold text-emerald-400">${o.total?.toFixed(2)}</td>
                            <td className="px-6 py-4 text-xs text-gray-500 dark:text-[#7C94B0]">{new Date(o.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-600 dark:text-[#AABDD1]"}`}>
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {orders.length === 0 && (
                      <div className="text-center py-12 text-gray-500 dark:text-[#7C94B0] text-sm">No orders yet</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── PRODUCTS ── */}
            {activeTab === "products" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Products</h1>
                    <p className="text-gray-500 dark:text-[#7C94B0] text-sm">{products.length} products in catalog</p>
                  </div>
                  <button
                    onClick={() => { setEditingProduct(null); setForm(emptyForm); setFormError(""); setShowAddModal(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
                  >
                    <Plus size={18} /> Add Product
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[#7C94B0]" />
                  <input
                    type="text" placeholder="Search by name or category..."
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-sm pl-10 pr-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Products Table */}
                <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-white dark:bg-[#0f151c] text-xs text-gray-500 dark:text-[#7C94B0] font-semibold uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Product</th>
                          <th className="px-6 py-3 text-left">Category</th>
                          <th className="px-6 py-3 text-left">Price</th>
                          <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingProducts ? (
                          [...Array(5)].map((_, i) => (
                            <tr key={i}><td colSpan={4} className="px-6 py-4"><div className="h-8 bg-gray-100 rounded animate-pulse" /></td></tr>
                          ))
                        ) : filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-white dark:bg-[#0f151c] transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                                  {(p.image_url || p.image) && (
                                    <img src={p.image_url || p.image} alt={p.name} className="w-full h-full object-contain mix-blend-darken rounded-lg" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{p.name || p.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-[#7C94B0] truncate max-w-[200px]">{p.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:text-[#AABDD1] text-xs rounded-lg font-medium capitalize">
                                {p.category || "—"}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-extrabold text-emerald-400 text-sm">${p.price}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Link href={`/product/${p.id}`} className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-[#7C94B0] hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                  <Eye size={16} />
                                </Link>
                                <button onClick={() => openEdit(p)} className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-[#7C94B0] hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors">
                                  <Edit3 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(p.id)}
                                  disabled={deletingId === p.id}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-[#7C94B0] hover:text-red-500 hover:bg-red-500/100/10 rounded-lg transition-colors disabled:opacity-40"
                                >
                                  {deletingId === p.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!loadingProducts && filteredProducts.length === 0 && (
                      <div className="text-center py-12 text-gray-500 dark:text-[#7C94B0] text-sm">No products found</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── ORDERS ── */}
            {activeTab === "orders" && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">All Orders</h1>
                    <p className="text-gray-500 dark:text-[#7C94B0] text-sm">{orders.length} total orders</p>
                  </div>
                  <button
                    onClick={fetchOrders}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-500/20"
                  >
                    {loadingOrders ? <Loader2 size={18} className="animate-spin" /> : "Refresh"}
                  </button>
                </div>

                <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-white dark:bg-[#0f151c] text-xs text-gray-500 dark:text-[#7C94B0] font-semibold uppercase tracking-wider">
                          <th className="px-6 py-3 text-left">Order ID</th>
                          <th className="px-6 py-3 text-left">Customer</th>
                          <th className="px-6 py-3 text-left">Items</th>
                          <th className="px-6 py-3 text-left">Total</th>
                          <th className="px-6 py-3 text-left">Date</th>
                          <th className="px-6 py-3 text-left">Status</th>
                          <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {loadingOrders ? (
                          [...Array(5)].map((_, i) => (
                            <tr key={i}><td colSpan={7} className="px-6 py-4"><div className="h-8 bg-gray-100 rounded animate-pulse" /></td></tr>
                          ))
                        ) : orders.map((o) => (
                          <tr key={o.id} className="hover:bg-white dark:bg-[#0f151c] transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-gray-600 dark:text-[#AABDD1]">{o.id.slice(0, 8)}...</td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{o.shipping_name || "—"}</p>
                                <p className="text-xs text-gray-500 dark:text-[#7C94B0]">{o.shipping_city}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-[#DFE6EE]">{o.items?.length || 0}</td>
                            <td className="px-6 py-4 font-extrabold text-emerald-400 text-sm">${o.total?.toFixed(2)}</td>
                            <td className="px-6 py-4 text-xs text-gray-500 dark:text-[#7C94B0]">{new Date(o.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-600 dark:text-[#AABDD1]"}`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-1 flex-wrap">
                                {["confirmed", "processing", "shipped", "delivered"].map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => handleUpdateOrderStatus(o.id, status)}
                                    disabled={updatingOrder === o.id || o.status === status}
                                    className={`px-2 py-1 text-xs rounded font-semibold transition-colors ${
                                      o.status === status
                                        ? "bg-emerald-500 text-white"
                                        : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-[#AABDD1] hover:bg-gray-200"
                                    } disabled:opacity-50`}
                                  >
                                    {status.slice(0, 3).toUpperCase()}
                                  </button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!loadingOrders && orders.length === 0 && (
                      <div className="text-center py-12 text-gray-500 dark:text-[#7C94B0] text-sm">No orders yet</div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B0F15] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/5">
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-[#7C94B0] hover:text-gray-700 dark:text-[#DFE6EE] hover:bg-gray-100 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {formError && (
                <div className="flex items-center gap-2 text-red-600 bg-red-500/10 border border-red-200 rounded-xl px-4 py-3 text-sm font-semibold">
                  <AlertTriangle size={15} /> {formError}
                </div>
              )}
              {[
                { label: "Product Name *", key: "name", placeholder: "e.g. Sony WH-1000XM5" },
                { label: "Brand", key: "brand", placeholder: "e.g. Sony" },
                { label: "Category", key: "category", placeholder: "e.g. Audio" },
                { label: "Price (USD) *", key: "price", placeholder: "e.g. 299.99", type: "number" },
                { label: "Image URL", key: "image_url", placeholder: "https://..." },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-[#AABDD1] mb-1.5">{label}</label>
                  <input
                    type={type || "text"} placeholder={placeholder} value={form[key]}
                    onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-[#AABDD1] mb-1.5">Description</label>
                <textarea
                  rows={3} placeholder="Product description..."
                  value={form.description}
                  onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-200 dark:border-white/5">
              <button onClick={() => { setShowAddModal(false); setEditingProduct(null); }} className="flex-1 py-2.5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#AABDD1] font-semibold rounded-xl hover:bg-white dark:bg-[#0f151c] transition-colors text-sm">
                Cancel
              </button>
              <button onClick={handleSaveProduct} disabled={savingProduct} className="flex-1 py-2.5 bg-emerald-500 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {savingProduct ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminStatCard({ label, value, icon, color, sub }) {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-emerald-50 text-emerald-400",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
  };
  return (
    <div className="bg-white dark:bg-[#0B0F15] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm p-5">
      <div className={`w-10 h-10 ${colors[color]} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
      <div className="text-2xl font-black text-gray-900 dark:text-white mb-0.5">{value}</div>
      <div className="text-sm font-semibold text-gray-700 dark:text-[#DFE6EE]">{label}</div>
      <div className="text-xs text-gray-500 dark:text-[#7C94B0] mt-0.5">{sub}</div>
    </div>
  );
}
