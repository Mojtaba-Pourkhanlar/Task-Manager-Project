// Task Page
export interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  done: boolean;
}
export interface TaskColumn {
  key: keyof Task | string;
  header: React.ReactNode;
  render?: (row: Task, index: number) => React.ReactNode;
  width?: string;
}
