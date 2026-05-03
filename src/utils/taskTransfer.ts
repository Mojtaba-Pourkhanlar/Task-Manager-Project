import { Task } from "@/types";
import { TaskExportFile, TaskSection } from "@/types/task-transfer";
import { v4 as uuidv4 } from "uuid";

const validPriorities = new Set(["low", "medium", "high"]);

function isTask(item: unknown): item is Task {
  if (typeof item !== "object" || item === null) return false;

  const task = item as Task;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    validPriorities.has(task.priority) &&
    typeof task.done === "boolean"
  );
}

export function buildExportFile(
  section: TaskSection,
  tasks: Task[],
): TaskExportFile {
  return {
    type: "task-manager-tasks",
    section,
    version: 1,
    exportedAt: new Date().toISOString(),
    tasks,
  };
}

export function downloadTasksAsJson(section: TaskSection, tasks: Task[]) {
  const data = buildExportFile(section, tasks);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `task-manager-${section}-${date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export async function parseTaskImportFile(file: File): Promise<TaskExportFile> {
  const text = await file.text();

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("فایل JSON معتبر نیست.");
  }

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("ساختار فایل نامعتبر است.");
  }

  const data = parsed as Partial<TaskExportFile>;

  if (data.type !== "task-manager-tasks") {
    throw new Error("این فایل متعلق به اپلیکیشن تسک منیجر نیست.");
  }

  if (!data.section || !["day", "month", "year"].includes(data.section)) {
    throw new Error("بخش فایل نامعتبر است.");
  }

  if (data.version !== 1) {
    throw new Error("نسخه فایل پشتیبانی نمی‌شود.");
  }

  if (!Array.isArray(data.tasks)) {
    throw new Error("لیست تسک‌ها نامعتبر است.");
  }

  const invalidTask = data.tasks.find(task => !isTask(task));
  if (invalidTask) {
    throw new Error("بعضی از تسک‌های فایل ساختار معتبر ندارند.");
  }

  return data as TaskExportFile;
}

export function normalizeImportedTasks(
  importedTasks: Task[],
  currentTasks: Task[],
) {
  const usedIds = new Set(currentTasks.map(task => task.id));

  return importedTasks.map(task => {
    let nextId = task.id;

    if (usedIds.has(nextId)) {
      nextId = uuidv4();
    }

    usedIds.add(nextId);

    return {
      ...task,
      id: nextId,
      title: task.title.trim(),
    };
  });
}
