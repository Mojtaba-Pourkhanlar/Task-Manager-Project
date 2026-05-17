import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { DailyHistory } from "./DailyHistory";
import { MonthlyHistory } from "./MonthlyHistory";
import { YearlyHistory } from "./YearlyHistory";

interface HistoryItem {
  date: string;
  total: number;
  done: number;
}

const HistoryModal = ({
  data,
  onClose,
}: {
  data: HistoryItem[];
  onClose: () => void;
}) => {
  const t = useTranslations("public");

  const [tab, setTab] = useState<"daily" | "monthly" | "yearly">("daily");

  const monthlyHistory = useMemo(() => {
    const map: Record<string, HistoryItem> = {};

    data.forEach(item => {
      const key = item.date.slice(0, 7);

      if (!map[key]) map[key] = { date: key, total: 0, done: 0 };

      map[key].total += item.total;
      map[key].done += item.done;
    });

    return Object.values(map);
  }, [data]);

  const yearlyHistory = useMemo(() => {
    const map: Record<string, HistoryItem> = {};

    data.forEach(item => {
      const key = item.date.slice(0, 4);

      if (!map[key]) map[key] = { date: key, total: 0, done: 0 };

      map[key].total += item.total;
      map[key].done += item.done;
    });

    return Object.values(map);
  }, [data]);

  return (
    <Modal isOpen={true} onClose={onClose} header={t("history")}>
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          onClick={() => setTab("daily")}
          className={` w-full ${
            tab === "daily"
              ? "bg-gray-900 text-white dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
          title={t("day")}
          label={t("day")}
          aria-label={t("ariaLableIunderstand")}
        />

        <Button
          onClick={() => setTab("monthly")}
          className={` w-full ${
            tab === "monthly"
              ? "bg-gray-900 text-white dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
          title={t("month")}
          label={t("month")}
          aria-label={t("ariaLableIunderstand")}
        />

        <Button
          onClick={() => setTab("yearly")}
          className={` w-full ${
            tab === "yearly"
              ? "bg-gray-900 text-white dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
          title={t("year")}
          label={t("year")}
          aria-label={t("ariaLableIunderstand")}
        />
      </div>

      {/* Render tab content */}
      {tab === "daily" && <DailyHistory data={data} />}
      {tab === "monthly" && <MonthlyHistory data={monthlyHistory} />}
      {tab === "yearly" && <YearlyHistory data={yearlyHistory} />}

      <Button
        onClick={onClose}
        title={t("Iunderstand")}
        label={t("Iunderstand")}
        aria-label={t("ariaLableIunderstand")}
        className="bg-gray-900 dark:bg-gray-600 w-full hover:bg-gray-800 dark:hover:bg-gray-500 mt-6"
      />
    </Modal>
  );
};

export default HistoryModal;
