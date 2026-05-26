"use client";

import { forwardRef } from "react";
import { inputStyles as s } from "./core.styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  errorText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { label, error = false, errorText, className, id, rows = 3, ...rest },
    ref,
  ) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={s.wrapper}>
        {label && (
          <label htmlFor={inputId} className={s.label}>
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`
            ${s.base} 
            min-h-15 py-3 resize-y
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

TextArea.displayName = "TextArea";
