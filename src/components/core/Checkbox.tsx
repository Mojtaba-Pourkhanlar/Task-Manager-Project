"use client";

interface GlassCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function GlassCheckbox({
  checked,
  onChange,
}: GlassCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      className="
      w-4 h-4
      accent-green-500
      cursor-pointer
      "
    />
  );
}
