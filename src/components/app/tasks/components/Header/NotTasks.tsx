import { Tabs } from "@/components/ui/Tabs";
import LanguageSwitcher from "@/utils/LanguageSwitcher";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(
  () => import("@/utils/ThemeToggle").then(mod => mod.ThemeToggle),
  { ssr: false },
);

interface Props {
  name: string;
  notTab?: boolean;
}

const NotTasks = ({ name, notTab }: Props) => {
  const t = useTranslations("public");

  const tabLinks = [
    { key: "day", href: "/history/day/", label: t("day") },
    { key: "month", href: "/history/month/", label: t("month") },
    { key: "year", href: "/history/year/", label: t("year") },
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

      {!notTab && (
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <Tabs tabs={tabLinks} />
        </div>
      )}
    </>
  );
};

export default NotTasks;
