"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children }) {
  useEffect(() => {
    // Initialize theme from localStorage on mount
    const saved = localStorage.getItem("theme-preference");
    if (saved) {
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      themes={["light", "dark"]}
      enableSystem={true}
      storageKey="theme-preference"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
