import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TextInput = ({
  placeholder,
  value,
  onChange,
  className,
  ...rest
}: InputProps) => {
  return (
    <input
      className={`w-full border border-white/20 px-3 py-2 h-10 rounded-xl ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};
