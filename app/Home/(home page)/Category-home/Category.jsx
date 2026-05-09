import { fetchCategories } from "../../../lib/data";
import CategoryGrid from "./CategoryGrid";

const getIconName = (title) => {
    const t = title.toLowerCase();
    if (t.includes('laptop') || t.includes('computer') || t.includes('pc')) return 'Laptop';
    if (t.includes('phone') || t.includes('mobile')) return 'Smartphone';
    if (t.includes('audio') || t.includes('headphone') || t.includes('sound')) return 'Headphones';
    if (t.includes('gam') || t.includes('console')) return 'Gamepad2';
    return 'Blocks';
};

export default async function Category() {
    const dbCategories = await fetchCategories();
    const categories = (dbCategories || []).map(cat => ({
        id: cat.id,
        title: cat.name || cat.title || "Unnamed Category",
        description: cat.description || "Explore this category",
        href: `/Home/${(cat.name || cat.title || "other").toLowerCase().replace(/\s+/g, '-')}`,
        iconName: getIconName(cat.name || cat.title || "")
    }));

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <CategoryGrid categories={categories} />
        </section>
    );
}
