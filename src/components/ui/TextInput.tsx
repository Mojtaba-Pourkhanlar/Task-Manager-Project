"use client";

import { InputProps } from "@/types";
import { forwardRef } from "react";
import { inputStyles as s } from "./components.styles";

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, errorText, className, id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random()}`;

    return (
      <div className={s.wrapper}>
        {label && (
          <label htmlFor={inputId} className={s.label}>
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={`
            ${s.base}
            ${error ? s.error : s.normal}
            ${className ?? ""}
          `}
          aria-invalid={error}
          aria-describedby={error && errorText ? `${inputId}-error` : undefined}
          {...rest}
        />

        {error && errorText && (
          <p id={`${inputId}-error`} className={s.errorText}>
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
