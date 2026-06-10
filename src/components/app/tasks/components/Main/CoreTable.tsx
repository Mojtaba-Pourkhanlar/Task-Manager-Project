import GlassCheckbox from "@/components/ui/Checkbox";
import GlassTable from "@/components/ui/Table";
import { priorityWeight } from "@/constants";
import { ColumnTable, CoreTableProps, Task } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { CoreTableStyle as s } from "../app.styles";
import Progress from "./Progress";
import TaskActionsCell from "./TaskActionsCell";
import { Button } from "@/components/ui/Button";

const CoreTable = ({
  tasks,
  onToggleDone,
  onDelete,
  onClick,
  onUndoDelete,
  onView,
  onEdit,
  onTogglePause,
  onFocus,
}: CoreTableProps) => {
  const t = useTranslations("public");
  const [now, setNow] = useState(() => Date.now());
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (show) {
      window.scroll({ top: 100, behavior: "instant" });
    } else {
      window.scroll({ top: 0, behavior: "instant" });
    }
  }, [show]);

  const viewTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    const deleting = tasks?.filter(
      t => t.deletingUntil && t.deletingUntil > now,
    );
    const notDeleting = tasks.filter(
      t => !t.deletingUntil || t.deletingUntil <= now,
    );

    const activeTasks = notDeleting.filter(t => !t.isPaused && !t.done);
    const pausedTasks = notDeleting.filter(t => t.isPaused && !t.done);
    const doneTasks = notDeleting.filter(t => t.done);

    const sortByPriorityThenTitle = (a: Task, b: Task) => {
      const pw = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (pw !== 0) return pw;
      return a.title.localeCompare(b.title, "fa");
    };
    const sortedActive = [...activeTasks].sort(sortByPriorityThenTitle);
    const sortedPaused = [...pausedTasks].sort((a, b) =>
      a.title.localeCompare(b.title, "fa"),
    );
    const sortedDone = [...doneTasks].sort(sortByPriorityThenTitle);
    return [...sortedActive, ...sortedPaused, ...sortedDone, ...deleting];
  }, [tasks]);

  const columns: ColumnTable<Task>[] = [
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
          disabled={task.isPaused}
        />
      ),
      align: "text-start",
    },
    {
      key: "title",
      header: t("tableColumnsTitle"),
      render: (task: Task) => (
        <p className="truncate w-45 md:w-full font-bold" title={task.title}>
          {task.title}
        </p>
      ),
      align: "text-start",
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
            className={`${colorMap[task.priority]} flex items-center justify-center whitespace-nowrap select-none `}
          >
            {map[task.priority]}
          </span>
        );
      },
      align: "text-center",
    },
    {
      key: "deletingUntil",
      header: t("tableColumnsActions"),
      align: "text-center",
      render: (task: Task) => (
        <TaskActionsCell
          task={task}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          onUndoDelete={onUndoDelete}
          onTogglePause={onTogglePause}
          onFocus={onFocus}
        />
      ),
    },
  ];

  const activeNotPaused = viewTasks.filter(
    t => !t.isPaused && (!t.deletingUntil || t.deletingUntil <= now),
  );
  const isDone = activeNotPaused.filter(t => t.done);

  const total = activeNotPaused.length;
  const doneCount = isDone.length;
  const progress = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  let progressColor = "from-yellow-400 to-yellow-500";
  if (progress >= 40 && progress < 100)
    progressColor = "from-green-400 to-emerald-500";
  if (progress === 100) progressColor = "from-lime-300 to-emerald-400";

  const handleDonate = () => {
    const donationLink = "https://zarinp.al/mojtaba_dev";
    window.open(donationLink, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <GlassTable
        data={viewTasks}
        columns={columns}
        rowClassName={(task: Task) => {
          if (task.deletingUntil && task.deletingUntil > Date.now()) {
            return "opacity-50 bg-red-500/20 animate-pulse";
          }
          if (task.isPaused) {
            return "opacity-50 bg-gray-500/20";
          }
          return task.done ? "bg-green-500/20" : "hover:bg-white/5";
        }}
        emptyText={t("tableEmpty")}
        onClick={onClick}
      />

      {viewTasks.length > 0 && !show && (
        <Button
          className={s.statusBTN}
          onClick={() => setShow(prev => !prev)}
          label={t("tasksStatus")}
          title={t("tasksStatus")}
          aria-label={t("tasksStatus")}
        />
      )}

      {show && (
        <Progress
          doneCount={doneCount}
          handleDonate={handleDonate}
          progress={progress}
          progressColor={progressColor}
          total={total}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
};

export default CoreTable;
