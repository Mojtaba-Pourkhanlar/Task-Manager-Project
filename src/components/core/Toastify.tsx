"use client";

import { useLocaleStore } from "@/store/locale";
import { ResolvableProps } from "@/types";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toastify({
  message,
  type,
  theme = "dark",
  open,
  duration = 1000,
  onClose,
}: ResolvableProps) {
  const toastId = useMemo(() => `toast-${type}`, [type]);
  const hasShownRef = useRef(false);
  const toastIdRef = useRef<string | number | null>(null);
  const { locale } = useLocaleStore();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!open) {
      hasShownRef.current = false;
      return;
    }
    if (hasShownRef.current) return;
    hasShownRef.current = true;
    if (toastIdRef.current && toast.isActive(toastIdRef.current)) return;

    toast[type](message, {
      toastId,
      autoClose: duration,
      theme,
      position: "bottom-center",
      rtl: locale === "fa",
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      className: `${resolvedTheme === "dark" ? "toast--glass" : "toast--glass-light"} toast--${type}`,

      onClose: () => {
        toastIdRef.current = null;
        onClose();
      },
    });
  }, [
    open,
    message,
    type,
    theme,
    duration,
    toastId,
    onClose,
    locale,
    resolvedTheme,
  ]);

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={duration}
      newestOnTop={false}
      closeOnClick
      rtl={locale === "fa"}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      hideProgressBar
      theme={theme}
      closeButton={false}
      style={{ padding: 18, zIndex: 9999 }}
      limit={1}
    />
  );
}
