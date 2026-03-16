'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../data'; // تأكد إن مسار ملف السوبابيز صح

export function useUser() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // 1. الدالة دي بتجيب بيانات المستخدم من السوبابيز
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                setUser(user); // لو موجود، احفظ بياناته
            } else {
                router.push('/login'); // لو مش مسجل دخول، اطرده لصفحة اللوجن
            }
            setLoading(false);
        };

        fetchUser();

        // 2. السطر ده بيراقب التغييرات (مثلاً لو عمل Log out من تاب تانية)
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT' || !session) {
                setUser(null);
                router.push('/login');
            } else if (session) {
                setUser(session.user);
            }
        });

        // تنظيف المراقبة لما الكومبوننت يتمسح
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [router]);

    return { user, loading };
}