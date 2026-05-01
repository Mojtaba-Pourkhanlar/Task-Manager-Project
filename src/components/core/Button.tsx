import { ButtonHTMLAttributes ,  } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  lable: string | number;
  onClick: () => void;
  className?: string;
}

export const Button = ({ lable, onClick, className, ...rest }: ButtonProps) => {
  return (
    <>
      <button
        className={`px-4 pt-1 h-9 rounded-xl text-white cursor-pointer ${className}`}
        onClick={onClick}
        {...rest}
      >
        {lable}
      </button>
    </>
  );
};
