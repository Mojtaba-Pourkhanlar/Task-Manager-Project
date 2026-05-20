import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import LanguageSwitcher from "@/utils/LanguageSwitcher";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { HeadersStyle as s } from "../app.styles";

const ThemeToggle = dynamic(
  () => import("@/utils/ThemeToggle").then(mod => mod.ThemeToggle),
  { ssr: false },
);

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
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </header>

      <hr className="bg-none my-2 border-b-2 border-(--navy-200) dark:border-white/20" />

      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        {actions}
        <Button
          className={s.headerBTN}
          onClick={onClick}
          label={t("newTask")}
          title={t("newTask")}
          aria-label={t("creatNewTask")}
        />
      </div>
    </>
  );
};

export default Headers;
