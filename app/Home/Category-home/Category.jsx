
import { ArrowRight, Laptop, Smartphone, Headphones, Gamepad2, Blocks } from "lucide-react";
import Link from "next/link";
import { fetchCategories } from "../../lib/data";

// Helper to map category names to Lucide icons
const getCategoryIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('laptop') || t.includes('computer') || t.includes('pc')) return Laptop;
    if (t.includes('phone') || t.includes('mobile')) return Smartphone;
    if (t.includes('audio') || t.includes('headphone') || t.includes('sound')) return Headphones;
    if (t.includes('gam') || t.includes('console')) return Gamepad2;
    return Blocks; // Default icon
};

export default async function Category() {
    // Fetch categories from the database
    const dbCategories = await fetchCategories();

    // Map DB rows to component props. Fallback to empty array if error.
    const categories = (dbCategories || []).map(cat => ({
        id: cat.id,
        title: cat.name || cat.title || "Unnamed Category",
        description: cat.description || "Explore this category",
        href: `/Home/category/${(cat.name || cat.title || "other").toLowerCase().replace(/\s+/g, '-')}`,
        icon: getCategoryIcon(cat.name || cat.title || "")
    }));

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 font-['public-sans',sans-serif]">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-[#0F172A]">
                <div>
                    <h2 className="text-3xl font-bold mb-2 tracking-tight">Shop by Category</h2>
                    <p className="text-[#64748B] text-base">Discover the best in modern tech.</p>
                </div>

                <Link
                    href="/Home/category"
                    className="group flex items-center gap-2 text-[#f97316] font-semibold text-sm hover:text-[#ea580c] transition-colors"
                >
                    View All
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link

                            key={category.id}
                            href={category.href}

                            className="bg-[#F8FAFC] rounded-2xl p-6 flex flex-col items-start transition-all duration-300 hover:bg-[#f97316] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-1 group border border-transparent hover:border-gray-200"
                        >
                            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-16 text-[#f97316] group-hover:scale-110 transition-transform duration-300">
                                <Icon size={24} strokeWidth={2.5} />
                            </div>

                            <div>
                                <h3 className="text-[#0F172A] text-lg font-bold mb-1">{category.title}</h3>
                                <p className="text-[#64748B] text-sm">{category.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </section>
    );
}
