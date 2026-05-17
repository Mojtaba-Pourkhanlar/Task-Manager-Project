import { useLocaleStore } from "@/store/locale";
import { useTranslations } from "next-intl";

interface HistoryItem {
  date: string;
  total: number;
  done: number;
}

export const MonthlyHistory = ({ data }: { data: HistoryItem[] }) => {
  const t = useTranslations("public");
  const { locale } = useLocaleStore();

  if (data.length === 0) {
    return (
      <p className="text-center py-10 text-zinc-500">{t("emptyHistory")}</p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percent = item.total > 0 ? (item.done / item.total) * 100 : 0;

        return (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-200 mb-1">
              <span>
                {new Date(item.date + "-01").toLocaleDateString(locale, {
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <span>
                {item.done} {t("as")} {item.total} {t("isDone")}
              </span>
            </div>

            <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
