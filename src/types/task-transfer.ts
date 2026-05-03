import { Task } from "@/types";

export type TaskSection = "day" | "month" | "year";

export interface TaskExportFile {
  type: "task-manager-tasks";
  section: TaskSection;
  version: 1;
  exportedAt: string;
  tasks: Task[];
}
