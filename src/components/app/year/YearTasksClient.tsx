"use client";

import { useTaskReview } from "@/hooks/useTaskReview";
import { useTranslations } from "next-intl";
import DailyReviewModal from "../components/Modals/DailyReviewModal";
import MainPage from "../components";

export default function YearTasksClient() {
  const td = useTranslations("year");

  const {
    tasks,
    setTasks,
    pendingTasks,
    isReviewOpen,
    handleReviewDecision,
    handleShowHistory,
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
    </>
  );
}
