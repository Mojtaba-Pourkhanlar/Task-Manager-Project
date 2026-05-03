import React from "react";
import { Check } from "lucide-react";

type Priority = "low" | "medium" | "high";

interface GlassCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  priority?: Priority;
}

const priorityStyles: Record<Priority, string> = {
  low: "border-green-400 bg-green-400/30 shadow-[0_0_12px_rgba(34,197,94,0.5)]",
  medium:
    "border-yellow-400 bg-yellow-400/30 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
  high: "border-red-400 bg-red-400/30 shadow-[0_0_12px_rgba(239,68,68,0.5)]",
};

const GlassCheckbox: React.FC<GlassCheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
  priority = "low",
}) => {
  const colorClass = priorityStyles[priority];

  return (
    <div className="flex items-center gap-3 group">
      {/* Hidden Checkbox */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="peer absolute w-6 h-6 opacity-0 cursor-pointer z-10"
        aria-label={label || "انتخاب آیتم"}
      />

      {/* Glassy circle */}
      <div
        className={`
          w-6 h-6 rounded-full border-2 
          backdrop-blur-md transition-all duration-300 ease-out 
          flex items-center justify-center 
          ${checked ? colorClass : "bg-white/10 border-white/20 group-hover:border-white/40"}
          peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-white/40
        `}
      >
        <Check
          size={14}
          className={`text-white transition-all duration-300 ${
            checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          strokeWidth={3}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-white/80 cursor-pointer select-none group-hover:text-white transition-colors"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default GlassCheckbox;
