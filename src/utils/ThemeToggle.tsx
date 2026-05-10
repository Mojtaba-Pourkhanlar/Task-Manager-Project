"use client";

import { FC, useState } from "react";
import { useTheme } from "next-themes";

function getMaxRadius(x: number, y: number) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dx = Math.max(x, w - x);
  const dy = Math.max(y, h - y);
  return Math.ceil(Math.sqrt(dx * dx + dy * dy));
}

export const ThemeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [busy, setBusy] = useState(false);

  const current = resolvedTheme ?? "light";
  const next = current === "dark" ? "light" : "dark";

  const onToggle = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div
      onClick={onToggle}
      className="w-10 h-10 flex items-center justify-center pt-2 cursor-pointer select-none hover:bg-(--color-navy-50) rounded-lg"
      aria-label="Toggle theme"
      role="button"
    >
      {current === "dark" ? (
        <span className="text-lg">🌙</span>
      ) : (
        <span className="text-lg">☀️</span>
      )}
    </div>
  );
};
