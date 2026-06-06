"use client";

import { useEffect, useRef, useState } from "react";
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

  const [tasks, setTasks, isTasksLoaded] = useLocalStorage<Task[]>(
    `${storagePrefix}-tasks`,
    [],
    { secure: true },
  );

  const [history, setHistory, isHistoryLoaded] = useLocalStorage<HistoryItem[]>(
    `${storagePrefix}-history`,
    [],
    { secure: true },
  );

  const [lastPeriod, setLastPeriod, isPeriodLoaded] = useLocalStorage<string>(
    `${storagePrefix}-last-period`,
    "",
    { secure: true },
  );

  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const isLoaded = isTasksLoaded && isHistoryLoaded && isPeriodLoaded;

  const hasChecked = useRef(false);

  useEffect(() => {
    if (!isLoaded || hasChecked.current) return;
    hasChecked.current = true;
    const currentPeriod = getPeriodKey(scope);
    if (lastPeriod && lastPeriod !== currentPeriod) {
      const total = tasks.length;
      const doneCount = tasks.filter(t => t.done).length;

      setHistory(
        [...history, { date: lastPeriod, total, done: doneCount }].slice(-365),
      );

      const tasksToCarryOver = tasks.filter(t => !t.done);
      if (tasksToCarryOver.length > 0) {
        setTimeout(() => {
          setPendingTasks(tasksToCarryOver);
          setIsReviewOpen(true);
        }, 0);
      } else {
        setTasks([]);
      }
    }

    setLastPeriod(currentPeriod);
  }, [isLoaded]);

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

  const validHistory = history.length > 0 ? history?.filter(h => h.date) : [];

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
