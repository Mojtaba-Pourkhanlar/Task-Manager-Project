"use client";
import { useState, useRef, useEffect } from "react";
import { componentsStyles as s } from "./components.styles";

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
    <div className={s.selectWrapper} tabIndex={0} onKeyDown={handleKeyDown}>
      <div
        onClick={() => {
          setOpen(o => !o);
          setFocusedIndex(0);
        }}
        className={s.selectTrigger}
      >
        <span>{selected?.label ?? "انتخاب کنید..."}</span>

        <span className={`${s.selectArrow} ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </div>

      {open && (
        <ul ref={listRef} className={s.dropdown}>
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
            ${s.option}
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
