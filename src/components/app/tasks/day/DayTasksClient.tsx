"use client";

import { useTaskReview } from "@/hooks/useTaskReview";
import { useTranslations } from "next-intl";
import DailyReviewModal from "../components/Modals/DailyReviewModal";
import MainPage from "../components";

const DayTasksClient = () => {
  const td = useTranslations("day");

  const { tasks, setTasks, pendingTasks, isReviewOpen, handleReviewDecision } =
    useTaskReview("day");

  return (
    <>
      <MainPage header_name={td("header")} tasks={tasks} setTasks={setTasks} section="day" />

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

export default DayTasksClient;
