"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingAnimation from "./LoadingAnimation";

export default function RouteChangeLoader() {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // When the pathname changes, wait 3 seconds before hiding the loader
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000); // 3 seconds delay
            return () => clearTimeout(timer);
        }
    }, [pathname, isLoading]);

    useEffect(() => {
        const handleStart = () => setIsLoading(true);
        const handleStop = () => setIsLoading(false);

        // Next.js App Router doesn't expose native router events yet,
        // so we intercept clicks on anchors linking to internal routes.
        const handleClick = (e) => {
            const path = e.composedPath();
            const anchor = path.find(el => el.tagName === "A");
            
            if (anchor && anchor.href && anchor.target !== "_blank") {
                const url = new URL(anchor.href);
                const isInternal = url.origin === window.location.origin;
                const isDifferentPath = url.pathname !== window.location.pathname;

                if (isInternal && isDifferentPath) {
                    setIsLoading(true);
                }
            }
        };

        document.addEventListener("click", handleClick);
        
        // Listen to regular history changes (e.g. back/forward buttons)
        window.addEventListener("popstate", handleStop);

        return () => {
            document.removeEventListener("click", handleClick);
            window.removeEventListener("popstate", handleStop);
        };
    }, []);

    if (!isLoading) return null;

    return <LoadingAnimation />;
}
