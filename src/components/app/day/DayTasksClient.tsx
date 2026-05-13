"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import MainPage from "../components/MainPage";

const DayTasksClient = () => {
  const td = useTranslations("day");
  const [tasks, setTasks] = useLocalStorage<Task[]>("day-tasks", []);

  return (
    <MainPage header_name={td("header")} tasks={tasks} setTasks={setTasks} />
  );
};

export default DayTasksClient;
