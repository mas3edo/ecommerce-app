import { supabase, fetchCategories } from "../../lib/data";
import CategoryContent from "./CategoryContent";

export default async function CategoryPage({ params }) {
    const { category } = await params;

    const categories = await fetchCategories();

    const normalizedParam = category.toLowerCase().replace(/-/g, '');
    const currentCategory = categories.find(cat =>
        (cat.name || cat.title || '').toLowerCase().replace(/\s+/g, '') === normalizedParam
    );

    let rawData = [];

    if (currentCategory && currentCategory.id) {
        const { data: prodData, error } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', currentCategory.id);

        if (!error && prodData) {
            rawData = prodData;
        } else if (error) {
            console.error('Error fetching products:', error);
        }
    }

    const data = rawData.map(p => ({
        ...p,
        title: p.title || p.name || "Unknown Product",
        description: p.description || "No description available.",
        price: p.price ?? 0,
        originalPrice: p.original_price || p.originalPrice,
        image: p.image || p.image_url || p.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        rating: p.rating ?? 5,
        reviews: p.reviews || p.review_count || Math.floor(Math.random() * 500)
    }));

    const displayCategory = currentCategory?.name || currentCategory?.title || category.charAt(0).toUpperCase() + category.slice(1);

    return <CategoryContent initialProducts={data} displayCategory={displayCategory} />;
}
