import { ButtonProps } from "@/types";

export const Button = ({ label, onClick, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`px-4 pt-1 h-9 rounded-xl text-white cursor-pointer
            outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
            focus-visible:rounded-xl
        ${className}`}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
};
