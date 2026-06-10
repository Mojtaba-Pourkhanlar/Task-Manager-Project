"use client";

import { useTaskReview } from "@/hooks/useTaskReview";
import { useTranslations } from "next-intl";
import { TaskSection } from "@/types/task-transfer";
import MainPage from "..";
import DailyReviewModal from "../Modals/DailyReviewModal";

interface Props {
  section: TaskSection;
}

const TasksClient = ({ section }: Props) => {
  const t = useTranslations(section);

  const { tasks, setTasks, pendingTasks, isReviewOpen, handleReviewDecision } =
    useTaskReview(section);

  return (
    <>
      <MainPage
        header_name={t("header")}
        tasks={tasks}
        setTasks={setTasks}
        section={section}
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

export default TasksClient;
