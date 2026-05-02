"use client";
import { useState, useRef, useEffect } from "react";

interface Option<T extends string> {
  label: string;
  value: T;
}

interface GlassSelectProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function GlassSelect<T extends string>({
  options,
  value,
  onChange,
}: GlassSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find(o => o.value === value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        setOpen(true);
        setFocusedIndex(0);
      }
      return;
    }
    if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    switch (e.key) {
      case "ArrowDown":
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;

      case "ArrowUp":
        setFocusedIndex(prev => (prev - 1 < 0 ? options.length - 1 : prev - 1));
        break;

      case "Enter":
        if (focusedIndex >= 0) {
          onChange(options[focusedIndex].value);
          setOpen(false);
        }
        break;

      case "Escape":
        setOpen(false);
        break;

      case "Tab":
        setOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (open && listRef.current && focusedIndex >= 0) {
      const item = listRef.current.children[focusedIndex] as HTMLElement;
      item?.focus();
    }
  }, [focusedIndex, open]);

  return (
    <div className="relative w-full" tabIndex={0} onKeyDown={handleKeyDown}>
      <div
        onClick={() => {
          setOpen(o => !o);
          setFocusedIndex(0);
        }}
        className="
          cursor-pointer
          px-3 py-2
          rounded-xl
          border border-white/20
          text-white
          shadow-lg
          flex justify-between items-center
          transition duration-200
          hover:bg-white/20
          select-none
        "
      >
        <span>{selected?.label ?? "انتخاب کنید..."}</span>
        <span className={`text-white/70 ${open ? "rotate-180" : ""}`}>▾</span>
      </div>

      {open && (
        <ul
          ref={listRef}
          className="
            absolute left-0 mt-2 w-full
            bg-white/10 backdrop-blur-sm
            border border-white/20
            rounded-xl shadow-lg
            text-white
            z-50
            overflow-hidden
          "
        >
          {options.map((op, i) => (
            <li
              key={op.value}
              tabIndex={0}
              onClick={() => {
                onChange(op.value);
                setOpen(false);
              }}
              onFocus={() => setFocusedIndex(i)}
              className={`
                px-3 py-2 cursor-pointer text-center
                transition 
                outline-none
                ${focusedIndex === i ? "bg-white/30" : "hover:bg-white/20"}
              `}
            >
              {op.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
