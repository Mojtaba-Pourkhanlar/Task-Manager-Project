"use client";
import Accordion from "@/components/ui/Accordion";
import { useTaskReview } from "@/hooks/useTaskReview";
import { useLocaleStore } from "@/store/locale";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import NotTasks from "../tasks/components/Header/NotTasks";
import { emptyStyles as s } from "./history.style";
import { History } from "lucide-react";

interface HistoryListProps {
  type: "day" | "month" | "year";
  titleKey: string;
}

export const HistoryList = ({ type, titleKey }: HistoryListProps) => {
  const t = useTranslations("public");
  const { locale } = useLocaleStore();
  const [activeKeys, setActiveKeys] = useState<string[]>([""]);

  const handleChange = (key: string) => {
    setActiveKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
    );
  };

  const { history, validHistory } = useTaskReview(type);

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <NotTasks name={t(titleKey)} />
      {validHistory.length === 0 ? (
        <div className="flex items-center justify-center mt-6 ">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={s.emptyWrapper}
          >
            <div className={s.emptyIconWrapper}>
              <History className="text-(--muted)" size={28} />
            </div>
            <p className={s.emptyText}>{t("emptyHistory")}</p>
          </motion.div>
        </div>
      ) : (
        <div
          className="mt-6 overflow-auto"
          style={{ height: "calc(100vh - 230px)" }}
        >
          {history
            .filter(h => h.date)
            .map((item, index) => {
              const percent =
                item.total > 0 ? (item.done / item.total) * 100 : 0;

              return (
                <Accordion
                  key={index}
                  activeKeys={activeKeys}
                  onChange={handleChange}
                  items={[
                    {
                      eventKey: item.date,
                      header: (
                        <>
                          {new Date(item.date).toLocaleDateString(locale, {
                            month: "short",
                            day: "numeric",
                          })}
                        </>
                      ),
                      children: (
                        <>
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
                          <div className="mt-3 space-y-1">
                            {item.tasks?.map(task => (
                              <div
                                key={task.id}
                                className={`text-xs px-2 py-1 rounded 
                                    ${
                                      task.done
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                        : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                                    }`}
                              >
                                {task.title}
                              </div>
                            ))}
                          </div>
                        </>
                      ),
                    },
                  ]}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};
