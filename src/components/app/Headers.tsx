import { ReactNode } from "react";
import { Button } from "@/components/core/Button";
import LanguageSwitcher from "@/utils/LanguageSwitcher";

interface Props {
  onClick: () => void;
  name: string;
  actions?: ReactNode;
}

const Headers = ({ onClick, name, actions }: Props) => {
  return (
    <>
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-[18px] md:text-xl font-bold">{name}</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {actions}
          <Button
            className="bg-white/20 hover:bg-white/10 border border-white/20 px-2! md:px-4!"
            onClick={onClick}
            label={"تسک جدید"}
            title="تسک جدید"
            aria-label="ایجاد تسک جدید"
          />
          <LanguageSwitcher />
        </div>
      </header>

      <hr className="bg-none my-3 border-b-2 border-white/20" />
    </>
  );
};

export default Headers;
