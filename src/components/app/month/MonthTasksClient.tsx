"use client";

import { useTaskReview } from "@/hooks/useTaskReview";
import { useTranslations } from "next-intl";
import DailyReviewModal from "../components/DailyReviewModal";
import MainPage from "../components/MainPage";

const MonthTasksClient = () => {
  const td = useTranslations("month");

  const {
    tasks,
    setTasks,
    pendingTasks,
    isReviewOpen,
    handleReviewDecision,
    handleShowHistory,
  } = useTaskReview("month");

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
};

export default MonthTasksClient;
