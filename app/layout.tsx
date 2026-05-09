import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import RouteGuard from "./components/RouteGuard";
import RouteChangeLoader from "./components/RouteChangeLoader";
import { ThemeProvider } from "./components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechFlow",
  description: "Premium Tech Gadgets & Accessories",
};

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased bg-gray-50 text-gray-900 dark:bg-[#040608] dark:text-[#DFE6EE] transition-colors duration-300`}
      >
        <ThemeProvider>
          <RouteChangeLoader />
          <RouteGuard>
            {children}
          </RouteGuard>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
