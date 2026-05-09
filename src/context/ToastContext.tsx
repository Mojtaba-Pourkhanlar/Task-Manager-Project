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
  const undoToastIdRef = useRef<string | number | null>(null);

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
    const duration = 1500;

    const content = ({ closeToast }: { closeToast?: () => void }) => (
      <div className="relative flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between gap-4">
          <span>{message}</span>

          <button
            onClick={() => {
              onUndo();
              closeToast?.();
              undoToastIdRef.current = null;
            }}
            className="
              px-4 py-1.5 
              text-xs font-semibold
              rounded-xl 
              bg-blue-500/20
              text-blue-300
              border border-blue-400/30
              backdrop-blur-md
              hover:bg-blue-500/30 
              transition-all duration-200 cursor-pointer
            "
          >
            بازگردانی
          </button>
        </div>

        <div className="h-[3px] w-full bg-white/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-linear-to-r from-red-400 to-orange-400 animate-toast-progress"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    );

    if (
      undoToastIdRef.current !== null &&
      toast.isActive(undoToastIdRef.current)
    ) {
      toast.update(undoToastIdRef.current, {
        render: content,
        autoClose: 1000,
        closeOnClick: false,
        hideProgressBar: true,
        pauseOnHover: false,
        className: "toast--glass toast--error",
      });
      return;
    }

    undoToastIdRef.current = toast(content, {
      autoClose: duration,
      position: "bottom-center",
      closeOnClick: false,
      hideProgressBar: true,
      className: "toast--glass toast--success",
      onClose: () => {
        undoToastIdRef.current = null;
      },
    });
  };

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
