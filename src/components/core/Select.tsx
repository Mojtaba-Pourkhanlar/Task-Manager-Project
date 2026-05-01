"use client";

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
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as T)}
      className="
        w-full
        px-3 py-2
        rounded-xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        text-white
        outline-none
        focus:ring-2 focus:ring-blue-500
      "
    >
      {options.map(op => (
        <option key={op.value} value={op.value} className="text-black">
          {op.label}
        </option>
      ))}
    </select>
  );
}
