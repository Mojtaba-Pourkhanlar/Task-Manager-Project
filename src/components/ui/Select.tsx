"use client";

import { GlassSelectProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { componentsStyles as s } from "./components.styles";

export default function GlassSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: GlassSelectProps<T>) {
  const listboxId = uuidv4();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open || focusedIndex < 0) return;

    const list = listRef.current;
    const item = list?.children[focusedIndex] as HTMLElement;

    item?.scrollIntoView({
      block: "nearest",
    });
  }, [focusedIndex, open]);

  const openSelect = () => {
    setOpen(true);
    const index = options.findIndex(o => o.value === value);
    setFocusedIndex(index >= 0 ? index : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        openSelect();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex(i => (i + 1) % options.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex(i => (i - 1 + options.length) % options.length);
        break;

      case "Enter":
        e.preventDefault();
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

  return (
    <>
      {label && (
        <label
          htmlFor={listboxId}
          className="
              text-sm font-semibold
              text-gray-700 dark:text-gray-200
              select-none
            "
        >
          {label}
        </label>
      )}
      <div
        ref={wrapperRef}
        className={s.selectWrapper}
        tabIndex={0}
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
      >
        <div
          className={s.selectTrigger}
          onClick={() => (open ? setOpen(false) : openSelect())}
        >
          <span className="font-semibold">
            {selected?.label ?? "انتخاب کنید..."}
          </span>

          <span className={`${s.selectArrow} ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </div>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            id={listboxId}
            className={s.dropdown}
          >
            {options.map((op, i) => {
              const isFocused = i === focusedIndex;
              const isSelected = op.value === value;

              return (
                <li
                  key={op.value}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={isFocused ? 0 : -1}
                  className={`
                  ${s.option}
                  ${isFocused ? s.optionFocused : ""}
                  ${isSelected ? s.optionSelected : ""}
                `}
                  onMouseEnter={() => setFocusedIndex(i)}
                  onClick={() => {
                    onChange(op.value);
                    setOpen(false);
                  }}
                >
                  {op.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
