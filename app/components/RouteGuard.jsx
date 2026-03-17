"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/data";
import LoadingAnimation from "./LoadingAnimation";

export default function RouteGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // No token → send back to login
                if (pathname !== "/") {
                    router.replace("/");
                } else {
                    setChecking(false);
                }
            } else {
                // Has token
                if (pathname === "/") {
                    router.replace("/Home"); // Redirect to home if logged in but on login page
                } else {
                    setChecking(false);
                }
            }
        };

        checkSession();

        // Also listen for auth changes
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
