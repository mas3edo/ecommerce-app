"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="dark"
      themes={["light", "dark"]}
      enableSystem={false}
      storageKey="theme-preference"
      disableTransitionOnChange
      forcedTheme={undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
