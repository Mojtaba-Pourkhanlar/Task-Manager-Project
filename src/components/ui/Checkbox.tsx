import React from "react";
import { Check } from "lucide-react";
import { GlassCheckboxProps } from "@/types";
import {
  checkboxStyles as s,
  checkboxPriorityStyles,
} from "./components.styles";

const GlassCheckbox: React.FC<GlassCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  priority = "low",
}) => {
  const colorClass = checkboxPriorityStyles[priority];

  return (
    <div className={s.wrapper}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={s.input}
        aria-label={label || "انتخاب آیتم"}
        title="انتخاب"
      />

      <div
        className={`
          ${s.circle}
          ${checked ? colorClass : s.unchecked}
        `}
      >
        <Check
          size={14}
          strokeWidth={3}
          aria-hidden="true"
          className={`
            ${s.icon}
            ${checked ? "opacity-100 scale-100" : "opacity-0 scale-0"}
          `}
        />
      </div>

      {label && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}
    </div>
  );
};

export default GlassCheckbox;
