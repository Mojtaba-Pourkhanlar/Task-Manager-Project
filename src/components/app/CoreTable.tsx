import GlassCheckbox from "@/components/core/Checkbox";
import GlassTable from "@/components/core/Table";
import UndoTimerButton from "@/components/core/UndoTimerButton";
import { Task, TaskColumn } from "@/types";
import { Trash2, ListTodo, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { coreStyles as s } from "./core.styles";

interface Props {
  tasks: Task[];
  onToggleDone: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
  onUndoDelete: (id: string) => void;
}

const priorityWeight: Record<Task["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const CoreTable = ({
  tasks,
  onToggleDone,
  onDelete,
  onClick,
  onUndoDelete,
}: Props) => {
  const t = useTranslations("public");

  const columns: TaskColumn[] = [
    {
      key: "done",
      header: "",
      render: (task: Task) => (
        <GlassCheckbox
          id={task.id}
          checked={task.done}
          onChange={val => onToggleDone(task.id, val)}
          label=""
          priority={task.priority}
        />
      ),
      width: "w-[10px]",
    },
    {
      key: "task",
      header: t("tableColumnsTitle"),
      render: (task: Task) => <span className="font-medium">{task.title}</span>,
    },
    {
      key: "priority",
      header: t("tableColumnsPriority"),
      render: (task: Task) => {
        const map = {
          low: t("low"),
          medium: t("medium"),
          high: t("high"),
        } as const;
        const colorMap: Record<Task["priority"], string> = {
          high: s.priorityHigh,
          medium: s.priorityMedium,
          low: s.priorityLow,
        };

        return (
          <span
            className={`${colorMap[task.priority]} whitespace-nowrap select-none`}
          >
            {map[task.priority]}
          </span>
        );
      },
      width: "w-[10px]",
    },
    {
      key: "actions",
      header: t("tableColumnsActions"),
      width: "w-[70px]",
      render: (task: Task) => {
        if (task.deleting) {
          return <UndoTimerButton onUndo={() => onUndoDelete(task.id)} />;
        }
        return (
          <button
            onClick={() => onDelete(task.id)}
            className={s.tableDeleteButton}
            title={t("tableColumnsDelete")}
            aria-label={`${t("tableColumnsDeleteDetail")} : ${task.title}`}
          >
            <Trash2
              size={16}
              className={s.tableDeleteIcon}
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </button>
        );
      },
    },
  ];

  const viewTasks = useMemo(() => {
    if (!tasks) return [];

    const deleting = tasks.filter(t => t.deleting);
    const normal = tasks.filter(t => !t.deleting);

    const sorted = [...normal].sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      const pw = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (pw !== 0) return pw;
      return a.title.localeCompare(b.title, "fa");
    });

    return [...sorted, ...deleting];
  }, [tasks]);

  const isDone = viewTasks?.filter((item: Task) => item.done);

  const total = viewTasks.length;
  const doneCount = isDone?.length ?? 0;
  const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  let progressColor = "from-yellow-400 to-yellow-500";
  if (progress >= 40 && progress < 100)
    progressColor = "from-green-400 to-emerald-500";
  if (progress === 100) progressColor = "from-lime-300 to-emerald-400";

  return (
    <>
      <GlassTable
        data={viewTasks}
        columns={columns}
        rowClassName={(task: Task) => {
          if (task.deleting) return "opacity-50 bg-red-500/20 animate-pulse";
          return task.done ? "bg-green-500/20" : "hover:bg-white/5";
        }}
        emptyText={t("tableEmpty")}
        onClick={onClick}
      />

      {viewTasks.length > 0 && (
        <div className={s.progressCard}>
          {/* info row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-start gap-1 text-blue-600 dark:text-blue-300 font-bold">
              <ListTodo size={16} />
              {t("allTasks")} :
              <span className="mx-2 text-blue-600 dark:text-blue-400 font-bold">
                {" " + total}
              </span>
            </div>

            <div className="flex items-start gap-1 text-green-600 dark:text-green-300 font-bold">
              <CheckCircle2 size={16} />
              {t("isDones")} :
              <span className="mx-2 text-green-600 dark:text-green-400 font-bold">
                {" " + doneCount}
              </span>
            </div>
          </div>

          {/* progress bar */}
          <div className="space-y-1">
            <div className={s.progressLabel}>
              <span>{t("Progress")}</span>
              <span>{progress}%</span>
            </div>

            <div className={s.progressBarBg}>
              <div
                className={`
            h-full rounded-full 
            transition-all duration-500 ease-out
            bg-linear-to-r ${progressColor}
            ${progress === 100 ? "shadow-[0_0_15px_rgba(163,255,119,0.5)]" : ""}
          `}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoreTable;
