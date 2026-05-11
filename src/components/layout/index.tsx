"use client";

import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "./components/NavBar";
import { ThemeProvider } from "next-themes";
import IntlProvider from "@/context/IntlProvider";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <IntlProvider>
        <ToastProvider>
          <div className="flex justify-center min-h-screen">
            <main className="w-full max-w-150 min-h-screen bg-background text-foreground shadow-[0_0_5px_rgba(100,100,100,0.5)]">
              {children}
              <Navbar />
            </main>
          </div>
        </ToastProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}
