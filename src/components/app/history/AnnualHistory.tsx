"use client";
import { useTaskReview } from "@/hooks/useTaskReview";
import { useLocaleStore } from "@/store/locale";
import { useTranslations } from "next-intl";
import NotTasks from "../tasks/components/Header/NotTasks";
import { emptyStyles as s } from "./history.style";
import Empty from "./Empty";

export const AnnualHistory = () => {
  const t = useTranslations("public");
  const { locale } = useLocaleStore();

  const { history, validHistory } = useTaskReview("year");

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <NotTasks name={t("yearHistorys")} />
      {validHistory.length === 0 ? (
        <Empty />
      ) : (
        <div className={s.wrapper}>
          {history
            .filter(h => h.date)
            .map((item, index) => {
              const percent =
                item.total > 0 ? (item.done / item.total) * 100 : 0;

              return (
                <div key={index} className="my-3">
                  <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-200 mb-1">
                    <span>
                      {new Date(item.date).toLocaleDateString(locale, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    <span>
                      {item.done} {t("as")} {item.total} {t("isDone")}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all duration-700"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
