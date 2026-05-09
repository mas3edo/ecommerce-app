'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/data';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // الـ Supabase سيتعامل مع OAuth state تلقائياً
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          router.push('/?error=auth_error');
          return;
        }

        if (session) {
          // تسجيل الدخول نجح، اذهب للـ Home
          router.push('/Home');
        } else {
          // لم يتم تسجيل الدخول
          router.push('/');
        }
      } catch (err) {
        console.error('Callback error:', err);
        router.push('/?error=callback_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    </div>
  );
}
