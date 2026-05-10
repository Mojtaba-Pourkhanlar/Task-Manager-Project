import { ReactNode } from "react";
import { Button } from "@/components/core/Button";
import LanguageSwitcher from "@/utils/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface Props {
  onClick: () => void;
  name: string;
  actions?: ReactNode;
}

const Headers = ({ onClick, name, actions }: Props) => {
  const t = useTranslations("public");

  return (
    <>
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-[18px] md:text-xl font-bold">{name}</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {actions}
          <Button
            className="bg-white/20 hover:bg-white/10 border border-white/20 px-2! md:px-4!"
            onClick={onClick}
            label={t("newTask")}
            title={t("newTask")}
            aria-label={t("creatNewTask")}
          />
          <LanguageSwitcher />
        </div>
      </header>

      <hr className="bg-none my-3 border-b-2 border-white/20" />
    </>
  );
};

export default Headers;
