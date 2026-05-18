"use client";

import { useTaskReview } from "@/hooks/useTaskReview";
import { useTranslations } from "next-intl";
import DailyReviewModal from "../components/DailyReviewModal";
import HistoryModal from "../components/history";
import MainPage from "../components/MainPage";

export default function YearTasksClient() {
  const td = useTranslations("year");

  const {
    tasks,
    setTasks,
    history,
    pendingTasks,
    isReviewOpen,
    handleReviewDecision,
    handleShowHistory,
    isHistoryOpen,
    setIsHistoryOpen,
    validHistory,
  } = useTaskReview("year");

  return (
    <>
      <MainPage
        header_name={td("header")}
        tasks={tasks}
        setTasks={setTasks}
        onShowHistory={handleShowHistory}
      />
      {isReviewOpen && (
        <DailyReviewModal
          count={pendingTasks.length}
          onConfirm={() => handleReviewDecision(true)}
          onDiscard={() => handleReviewDecision(false)}
        />
      )}

      {isHistoryOpen && validHistory.length > 0 && (
        <HistoryModal
          data={history.filter(h => h.date)}
          onClose={() => setIsHistoryOpen(false)}
        />
      )}
    </>
  );
}
