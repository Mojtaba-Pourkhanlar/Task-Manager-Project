"use client";

import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, onChange, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full border border-white/20 px-3 py-2 h-10 rounded-xl outline-none
        focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  },
);

TextInput.displayName = "TextInput";
