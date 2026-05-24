"use client";

import { useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useToast } from "@/context/ToastContext";
import { useTranslations } from "next-intl";

type Scope = "day" | "month" | "year";

export interface HistoryItem {
  date: string;
  total: number;
  done: number;
}

const getPeriodKey = (scope: Scope) => {
  const now = new Date();

  if (scope === "day") {
    return now.toLocaleDateString("en-CA");
  }

  if (scope === "month") {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  }

  return `${now.getFullYear()}`;
};

export const useTaskReview = (scope: Scope) => {
  const storagePrefix = scope;
  const t = useTranslations("public");

  const { showToast } = useToast();

  const [tasks, setTasks, isLoaded] = useLocalStorage<Task[]>(
    `${storagePrefix}-tasks`,
    [],
  );

  const [history, setHistory] = useLocalStorage<HistoryItem[]>(
    `${storagePrefix}-history`,
    [],
  );

  const [lastPeriod, setLastPeriod] = useLocalStorage<string>(
    `${storagePrefix}-last-period`,
    "",
  );

  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const currentPeriod = getPeriodKey(scope);

    if (lastPeriod && lastPeriod !== currentPeriod) {
      const total = tasks.length;
      const done = tasks.filter(t => t.done).length;

      const newEntry = {
        date: lastPeriod,
        total,
        done,
      };

      const updatedHistory = [...history, newEntry].slice(-365);

      setHistory(updatedHistory);

      const unfinished = tasks.filter(t => !t.done && !t.isPaused);

      if (unfinished.length > 0) {
        setTimeout(() => {
          setPendingTasks(unfinished);
          setIsReviewOpen(true);
        }, 0);
      } else {
        setTasks([]);
      }
    }

    setLastPeriod(currentPeriod);
  }, [isLoaded, lastPeriod]);

  const handleReviewDecision = (keep: boolean) => {
    if (keep) {
      setTasks(pendingTasks.map(t => ({ ...t, done: false })));
    } else {
      setTasks([]);
    }

    setIsReviewOpen(false);
  };

  const handleShowHistory = () => {
    const validHistory = history.filter(
      h => h.date && (h.total > 0 || h.done > 0),
    );

    if (validHistory.length === 0) {
      showToast("error", t("historyErr"));
      return;
    }

    setIsHistoryOpen(true);
  };

  const validHistory = history.filter(h => h.date);

  return {
    tasks,
    setTasks,
    history,
    pendingTasks,
    isReviewOpen,
    handleReviewDecision,
    isHistoryOpen,
    handleShowHistory,
    validHistory,
    setIsHistoryOpen,
  };
};
