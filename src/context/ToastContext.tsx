"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
} from "react";
import Toastify from "@/components/core/Toastify";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useLocaleStore } from "@/store/locale";
import { useTheme } from "next-themes";

type ToastType = "info" | "success" | "warning" | "error";

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  showUndoToast: (message: string, onUndo: () => void) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const t = useTranslations("public");
  const undoToastIdRef = useRef<string | number | null>(null);
  const { locale } = useLocaleStore();
  const { resolvedTheme } = useTheme();

  const [toastConfig, setToastConfig] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
    duration: number;
  }>({
    open: false,
    type: "warning",
    message: "",
    duration: 1000,
  });

  const showToast = (type: ToastType, message: string) => {
    setToastConfig({
      open: true,
      type,
      message,
      duration: 1000,
    });
  };
  const handleToastClose = () => {
    setToastConfig(prev => ({ ...prev, open: false }));
  };

  const showUndoToast = (message: string, onUndo: () => void) => {
    const duration = 2000;

    const content = ({ closeToast }: { closeToast?: () => void }) => (
      <div className="relative flex items-center justify-between w-full text-white px-4 py-2 shadow-lg backdrop-blur-sm animate-fade-in-down text-sm set-border-light dark:set-border">
        <span>{message}</span>
        <button
          onClick={() => {
            onUndo();
            closeToast?.();
            undoToastIdRef.current = null;
          }}
          className="text-[#1E88E5] font-bold hover:text-[#42A5F5] transition-colors cursor-pointer"
        >
          {t("return")}
        </button>
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full bg-[#1E88E5] animate-toast-progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    );

    if (
      undoToastIdRef.current !== null &&
      toast.isActive(undoToastIdRef.current)
    ) {
      toast.update(undoToastIdRef.current, {
        render: content,
        autoClose: duration,
        closeOnClick: false,
        hideProgressBar: true,
        pauseOnHover: false,
        className: "undo-toast",
      });
      return;
    }

    undoToastIdRef.current = toast(content, {
      autoClose: duration,
      position: "bottom-center",
      closeOnClick: false,
      hideProgressBar: true,
      rtl: locale === "fa",
      onClose: () => (undoToastIdRef.current = null),
      className: "undo-toast",
    });
  };

  // className: resolvedTheme === "dark" ? "undo-toast" : "undo-toast-light",

  return (
    <ToastContext.Provider value={{ showToast, showUndoToast }}>
      {children}
      <Toastify
        open={toastConfig.open}
        type={toastConfig.type}
        message={toastConfig.message}
        duration={toastConfig.duration}
        theme="dark"
        onClose={handleToastClose}
      />
    </ToastContext.Provider>
  );
};
