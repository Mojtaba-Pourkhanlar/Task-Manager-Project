"use client";

import { FC, useState } from "react";
import { useTheme } from "next-themes";
import { useLocaleStore } from "@/store/locale";

function getMaxRadius(x: number, y: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dx = Math.max(x, w - x);
  const dy = Math.max(y, h - y);
  return Math.ceil(Math.sqrt(dx * dx + dy * dy));
}

export const ThemeToggle: FC = () => {
  const { locale } = useLocaleStore();
  const { setTheme, resolvedTheme } = useTheme();
  const [busy, setBusy] = useState(false);

  const current = resolvedTheme ?? "light";
  const next = current === "dark" ? "light" : "dark";

  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (busy) return;
    setBusy(true);

    const x = e.clientX;
    const y = e.clientY;
    const r = getMaxRadius(x, y);

    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${r}px`);

    const anyDoc = document;

    if (!anyDoc.startViewTransition) {
      setTheme(next);
      setBusy(false);
      return;
    }

    root.classList.add("vt-switch");
    const nextIsDark = next === "dark";

    const vt = anyDoc.startViewTransition(() => {
      root.classList.toggle("dark", nextIsDark);
    });

    vt.finished
      .catch(() => {})
      .finally(() => {
        setTheme(next);
        root.classList.remove("vt-switch");
        setBusy(false);
      });
  };

  return (
    <button
      onClick={onToggle}
      className={`
        flex items-start justify-center h-9 w-9
        p-1.25 rounded-xl cursor-pointer 
        bg-(--surface)
        hover:bg-(--surface-hover)
        border border-(--border)
        focus:outline-none
        focus:ring-2
        focus:ring-(--navy-400)
        transition-colors
      `}
      title={locale === "en" ? "Toggle theme" : "تغییر تم"}
      aria-label={locale === "en" ? "Toggle theme" : "تغییر تم"}
    >
      {current === "dark" ? (
        <span className="pt-0.75">🌙</span>
      ) : (
        <span className="pt-0.75">☀️</span>
      )}
    </button>
  );
};
