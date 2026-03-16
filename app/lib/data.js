import { createClient } from '@supabase/supabase-js';

// 1. استدعاء المفاتيح من ملف البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. إنشاء الاتصال بقاعدة البيانات
export const supabase = createClient(supabaseUrl, supabaseKey);

// 3. دالة كمثال لجلب كل المنتجات من جدول products
export async function fetchProducts() {

    try {
        const { data, error } = await supabase
            .from('products') // اسم الجدول
            .select('*');     // هات كل الأعمدة

        if (error) {
            console.error('مشكلة في جلب المنتجات:', error.message);
            throw new Error('فشل في تحميل المنتجات');
        }

        return data; // هيرجع مصفوفة (Array) فيها كل المنتجات
    } catch (err) {
        console.error('خطأ عام:', err);
        return [];
    }
}

// 4. دالة جلب الأقسام من جدول categories
export async function fetchCategories() {
    try {
        const { data, error } = await supabase
            .from('categories') // اسم الجدول
            .select('*');

        if (error) {
            console.error('مشكلة في جلب الأقسام:', error.message);
            return [];
        }

        return data; 
    } catch (err) {
        console.error('خطأ عام:', err);
        return [];
    }
}