/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "./components/NavBar";
import { ThemeProvider } from "next-themes";
import IntlProvider from "@/context/IntlProvider";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isPWA } from "@/lib/isPWA";
import ShowPWA from "../ui/ShowPWA";


export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const [isPwaPromptOpen, setIsPwaPromptOpen] = useState(false);
  const deferredPrompt = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isPWA()) return;

    const dismissed = localStorage.getItem("pwa_dismissed");
    if (dismissed === "true") return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const beforeInstallHandler = (e: any) => {
      if (localStorage.getItem("pwa_dismissed") === "true") return;

      e.preventDefault();
      deferredPrompt.current = e;

      if (!timer) {
        timer = setTimeout(() => {
          setIsPwaPromptOpen(true);
        }, 30000);
      }
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem("pwa_dismissed", "true");
    deferredPrompt.current = null;
    setIsPwaPromptOpen(false);
  };

  const handleInstall = async () => {
    const event = deferredPrompt.current;
    if (!event) return;

    event.prompt();
    const choice = await event.userChoice;

    if (choice.outcome === "accepted") {
      console.log("PWA installed successfully");
    }

    deferredPrompt.current = null;
    setIsPwaPromptOpen(false);
  };

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
              {path !== "/auth/" && <Navbar />}
            </main>
          </div>

          <ShowPWA
            isOpen={isPwaPromptOpen}
            onClose={handleClose}
            onInstall={handleInstall}
          />
        </ToastProvider>
      </IntlProvider>
    </ThemeProvider>
  );
}
