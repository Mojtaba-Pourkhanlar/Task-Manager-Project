"use client";

import { ModalProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { modalStyles as s } from "./core.styles";

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
      className={s.backdrop}
      style={{
        transform: `translateY(-${keyboardOffset / 2}px)`,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div ref={modalRef} className={s.container}>
        <h2 className={s.header}>{header}</h2>
        <hr className={s.styleHR} />

        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
