"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/data";
import LoadingAnimation from "./LoadingAnimation";

// Public-only route (login/register page)
const PUBLIC_ONLY = ["/"];

export default function RouteGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // No session → send to login unless already on login page
                if (pathname !== "/") {
                    router.replace("/");
                } else {
                    setChecking(false);
                }
            } else {
                // Has session — allow /setup-admin without redirect
                if (pathname === "/") {
                    router.replace("/Home");
                } else {
                    setChecking(false);
                }
            }
        };

        checkSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                if (pathname !== "/") {
                    router.replace("/");
                }
            } else {
                if (pathname === "/") {
                    router.replace("/Home");
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [router, pathname]);

    if (checking) {
        return <LoadingAnimation />;
    }

    return <>{children}</>;
}
