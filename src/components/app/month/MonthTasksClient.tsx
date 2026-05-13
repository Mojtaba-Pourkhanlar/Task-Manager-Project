"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import MainPage from "../components/MainPage";

const MonthTasksClient = () => {
  const td = useTranslations("month");
  const [tasks, setTasks] = useLocalStorage<Task[]>("month-tasks", []);

  return (
    <MainPage header_name={td("header")} tasks={tasks} setTasks={setTasks} />
  );
};

export default MonthTasksClient;
