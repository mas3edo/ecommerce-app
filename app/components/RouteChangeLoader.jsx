"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import LoadingAnimation from "./LoadingAnimation";

export default function RouteChangeLoader() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Reset loading state when the actual page transition finishes
    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    useEffect(() => {
        const handleClick = (e) => {
            // If the user clicked a button (like Favorite or Add to Cart), ignore the routing intercept
            // so we don't accidentally navigate when they just wanted to trigger an action within a card.
            if (e.target.closest("button")) return;

            // Find the closest anchor tag
            const anchor = e.target.closest("a");
            
            // If there's an anchor, it's internal, not a blank target, and not a download link
            if (anchor && anchor.href && anchor.target !== "_blank" && !anchor.hasAttribute("download")) {
                const url = new URL(anchor.href);
                const isInternal = url.origin === window.location.origin;
                const isHash = url.hash && url.pathname === window.location.pathname;
                const isSamePath = url.pathname === window.location.pathname && url.search === window.location.search;

                if (isInternal && !isHash && !isSamePath) {
                    // Intercept the click BEFORE Next.js Link handles it
                    e.preventDefault();
                    e.stopPropagation();
                    
                    setIsLoading(true);

                    // Wait for the animation/delay
                    setTimeout(() => {
                        router.push(url.pathname + url.search + url.hash);
                    }, 800); // 0.8 seconds delay
                }
            }
        };

        // Use capture phase (true) to intercept the event before React's synthetic events
        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [router, pathname]);

    if (!isLoading) return null;

    return <LoadingAnimation />;
}
