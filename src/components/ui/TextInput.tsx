"use client";

import { InputProps } from "@/types";
import { forwardRef } from "react";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, errorText, className, id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random()}`;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="
              text-sm font-semibold
              text-gray-700 dark:text-gray-200
              select-none
            "
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`
            w-full
            px-3 pt-1 h-10
            rounded-xl outline-none
            border
            ${
              error
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 dark:border-white/20 focus:ring-(--navy-400)"
            }
            bg-white dark:bg-neutral-900
            text-gray-800 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:ring-2
            transition-all duration-200
            font-semibold
            ${className ?? ""}
          `}
          aria-invalid={error}
          aria-describedby={error && errorText ? `${inputId}-error` : undefined}
          {...rest}
        />

        {error && errorText && (
          <p
            id={`${inputId}-error`}
            className="
              text-xs
              text-red-500
              font-medium
              mt-1
            "
          >
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
