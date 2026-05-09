"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  header: string;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ isOpen, header, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const offset = window.innerHeight - viewport.height;

      if (offset > 0) {
        setKeyboardOffset(offset);
      } else {
        setKeyboardOffset(0);
      }
    };

    viewport.addEventListener("resize", handleResize);

    return () => {
      viewport.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-transform duration-300 ease-out"
      style={{
        transform: `translateY(-${keyboardOffset / 2}px)`,
      }}
    >
      <div
        ref={modalRef}
        className="
          w-80 rounded-2xl p-4
          bg-black/30
          backdrop-blur-xl
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        "
      >
        <h2 className="mb-4 text-lg font-semibold text-white drop-shadow">
          {header}
        </h2>

        <div className="text-white/90">{children}</div>
      </div>
    </div>
  );
};
