"use client";

import Toastify from "@/components/core/Toastify";
import { ToastContextType, ToastProviderProps, ToastType } from "@/types";
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastConfig, setToastConfig] = useState<{
    open: boolean;
    type: ToastType;
    message: string;
    duration: number;
  }>({
    open: false,
    type: "warning",
    message: "",
    duration: 2000,
  });

  const showToast = (type: ToastType, message: string) => {
    setToastConfig({
      open: true,
      type,
      message,
      duration: 2000,
    });
  };
  const handleToastClose = () => {
    setToastConfig(prev => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
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
