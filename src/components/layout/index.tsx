"use client";

import { ToastProvider } from "@/context/ToastContext";
import { Navbar } from "./components/NavBar";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="flex justify-center min-h-screen">
        <div className="w-full max-w-150 min-h-screen bg-background text-foreground shadow-[0_0_5px_rgba(100,100,100,0.5)]">
          {children}
          <Navbar />
        </div>
      </div>
    </ToastProvider>
  );
}
