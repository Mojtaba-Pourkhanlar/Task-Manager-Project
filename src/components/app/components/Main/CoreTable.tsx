import GlassCheckbox from "@/components/ui/Checkbox";
import GlassTable from "@/components/ui/Table";
import { priorityWeight } from "@/constants";
import { ColumnTable, CoreTableProps, Task } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { CoreTableStyle as s } from "../core.styles";
import Progress from "./Progress";
import TaskActionsCell from "./TaskActionsCell";

const CoreTable = ({
  tasks,
  onToggleDone,
  onDelete,
  onClick,
  onUndoDelete,
  onView,
  onEdit,
}: CoreTableProps) => {
  const t = useTranslations("public");
  const tf = useTranslations("footer");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const viewTasks = useMemo(() => {
    if (!tasks) return [];
    const deleting = tasks.filter(
      t => t.deletingUntil && t.deletingUntil > now,
    );
    const normal = tasks.filter(
      t => !t.deletingUntil || t.deletingUntil <= now,
    );
    const sorted = [...normal].sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      const pw = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (pw !== 0) return pw;
      return a.title.localeCompare(b.title, "fa");
    });
    return [...sorted, ...deleting];
  }, [tasks, now]);

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
        />
      ),
      align: "text-start",
    },
    {
      key: "title",
      header: t("tableColumnsTitle"),
      render: (task: Task) => (
        <p className="truncate w-42 md:w-full font-bold" title={task.title}>
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
        />
      ),
    },
  ];

  const isDone = viewTasks?.filter((item: Task) => item.done);

  const total = viewTasks.length;
  const doneCount = isDone?.length ?? 0;
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
          if (task.deletingUntil && task.deletingUntil > Date.now())
            return "opacity-50 bg-red-500/20 animate-pulse";
          return task.done ? "bg-green-500/20" : "hover:bg-white/5";
        }}
        emptyText={t("tableEmpty")}
        onClick={onClick}
      />

      {viewTasks.length > 0 && (
        <Progress
          doneCount={doneCount}
          handleDonate={handleDonate}
          progress={progress}
          progressColor={progressColor}
          total={total}
        />
      )}
    </>
  );
};

export default CoreTable;
