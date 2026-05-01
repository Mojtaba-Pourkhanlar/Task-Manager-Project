"use client";
import { useState } from "react";

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

  const selected = options.find(o => o.value === value);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
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
          {options.map(op => (
            <li
              key={op.value}
              onClick={() => {
                onChange(op.value);
                setOpen(false);
              }}
              className="
                px-3 py-2 cursor-pointer text-center
                transition hover:bg-white/20
              "
            >
              {op.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
