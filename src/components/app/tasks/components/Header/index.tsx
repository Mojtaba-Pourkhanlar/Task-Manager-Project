import { Tabs } from "@/components/ui/Tabs";
import LanguageSwitcher from "@/utils/LanguageSwitcher";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const ThemeToggle = dynamic(
  () => import("@/utils/ThemeToggle").then(mod => mod.ThemeToggle),
  { ssr: false },
);

interface Props {
  // onClick: () => void;
  name: string;
  actions: ReactNode;
}

const Headers = ({ name, actions }: Props) => {
  const t = useTranslations("public");

  const tabLinks = [
    { key: "day", href: "/tasks/day/", label: t("day") },
    { key: "month", href: "/tasks/month/", label: t("month") },
    { key: "year", href: "/tasks/year/", label: t("year") },
  ];

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
        <Tabs tabs={tabLinks} />
        {actions}
      </div>
    </>
  );
};

export default Headers;
