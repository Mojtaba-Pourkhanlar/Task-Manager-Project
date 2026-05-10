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
        className={`
          w-full
          px-3 pt-1 h-10
          rounded-xl outline-none
          border
          border-gray-300 dark:border-white/20
          bg-white dark:bg-neutral-900
          text-gray-800 dark:text-gray-100
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:ring-2 focus:ring-blue-500
          transition-all duration-200
          ${className}
        `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    );
  },
);

TextInput.displayName = "TextInput";
