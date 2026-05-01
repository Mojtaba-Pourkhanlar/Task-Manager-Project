"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Toastify from "@/components/core/Toastify";

type ToastType = "info" | "success" | "warning" | "error";

interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
  hideToast: () => void;
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
  const [toastConfig, setToastConfig] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
    duration: number;
  }>({
    open: false,
    type: "info",
    message: "",
    duration: 4000,
  });

  const showToast = (type: ToastType, message: string, duration = 4000) => {
    setToastConfig({
      open: true,
      type,
      message,
      duration,
    });
  };

  const hideToast = () => {
    setToastConfig(prev => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toastify
        open={toastConfig.open}
        type={toastConfig.type}
        message={toastConfig.message}
        duration={toastConfig.duration}
        theme="light"
      />
    </ToastContext.Provider>
  );
};
