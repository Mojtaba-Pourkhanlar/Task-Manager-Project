"use client";

import { useTaskReview } from "@/hooks/useTaskReview";
import { useTranslations } from "next-intl";
import DailyReviewModal from "../components/Modals/DailyReviewModal";
import MainPage from "../components";

const MonthTasksClient = () => {
  const td = useTranslations("month");

  const { tasks, setTasks, pendingTasks, isReviewOpen, handleReviewDecision } =
    useTaskReview("month");

  return (
    <>
      <MainPage header_name={td("header")} tasks={tasks} setTasks={setTasks} section="month" />

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
