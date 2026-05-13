"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import MainPage from "../components/MainPage";

export default function YearTasksClient() {
  const td = useTranslations("year");
  const [tasks, setTasks] = useLocalStorage<Task[]>("yers-tasks", []);

  return (
    <MainPage header_name={td("header")} tasks={tasks} setTasks={setTasks} />
  );
}
