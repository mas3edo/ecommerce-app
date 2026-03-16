"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/data";

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
        return (
            <div style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                color: "#9ca3af",
                fontSize: "14px"
            }}>
                Loading...
            </div>
        );
    }

    return <>{children}</>;
}
