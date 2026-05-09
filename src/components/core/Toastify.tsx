"use client";

import { useEffect, useMemo, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "info" | "success" | "warning" | "error";

type ResolvableProps = {
  message: string;
  type: ToastType;
  theme?: "light" | "dark" | "system";
  open: boolean;
  duration?: number;
  onClose: () => void;
};

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
      rtl: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      className: `toast--glass toast--${type}`,

      onClose: () => {
        toastIdRef.current = null;
        onClose();
      },
    });
  }, [open, message, type, theme, duration, toastId, onClose]);

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={duration}
      newestOnTop={false}
      closeOnClick
      rtl={true}
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
