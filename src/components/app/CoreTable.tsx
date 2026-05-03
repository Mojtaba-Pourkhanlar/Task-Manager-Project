import GlassCheckbox from "@/components/core/Checkbox";
import GlassTable from "@/components/core/Table";
import { Task, TaskColumn } from "@/types";
import { Trash2, ListTodo, CheckCircle2 } from "lucide-react";
import { useMemo } from "react";

interface Props {
  tasks: Task[];
  onToggleDone: (id: string, value: boolean) => void;
  onDelete: (id: string) => void;
}

const priorityWeight: Record<Task["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const CoreTable = ({ tasks, onToggleDone, onDelete }: Props) => {
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
      header: "عنوان",
      render: (task: Task) => <span className="font-medium">{task.title}</span>,
    },
    {
      key: "priority",
      header: "اولویت",
      render: (task: Task) => {
        const map = {
          low: "کم",
          medium: "مهم",
          high: "خیلی مهم",
        } as const;
        const colorMap: Record<Task["priority"], string> = {
          high: "bg-red-500/20 text-red-300",
          medium: "bg-yellow-500/20 text-yellow-300",
          low: "bg-green-500/20 text-green-300",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap select-none ${colorMap[task.priority]}`}
          >
            {map[task.priority]}
          </span>
        );
      },
      width: "w-[10px]",
    },
    {
      key: "actions",
      header: "عملیات",
      width: "w-[70px]",
      render: (task: Task) => (
        <button
          onClick={() => onDelete(task.id)}
          className="
            flex items-center justify-center 
            p-1.5 rounded-lg 
            bg-white/15 hover:bg-white/25
            border border-white/20
            cursor-pointer
            transition-colors duration-200 ease-out
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-transparent
          "
          title="حذف تسک"
          aria-label={`پاک کردن تسک: ${task.title}`}
        >
          <Trash2
            size={16}
            className="text-red-500 group-hover:text-red-300 transition-colors duration-200"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </button>
      ),
    },
  ];

  const viewTasks = useMemo(() => {
    if (!tasks) return [];
    const copy = [...tasks];
    copy.sort((a, b) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }
      const pw = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (pw !== 0) return pw;
      return a.title.localeCompare(b.title, "fa");
    });
    return copy;
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
        rowClassName={(task: Task) =>
          task.done ? "bg-green-500/20" : "hover:bg-white/5"
        }
        emptyText=" یه تسک اضافه کن تا زندگی معنی‌دار بشه 😌"
        // emptyText="یه فکری به حال خودت بکن😒 اینجا هیچی نیست."
      />

      {viewTasks.length > 0 && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-3">
          {/* info row */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-blue-300">
              <ListTodo size={16} />
              <span>
                تمامی تسک‌ها
                <span className="mr-2 font-semibold text-blue-400">
                  {total}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-green-300">
              <CheckCircle2 size={16} />
              <span>
                انجام شده
                <span className="mr-2 font-semibold text-green-400">
                  {doneCount}
                </span>
              </span>
            </div>
          </div>

          {/* progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-white/60">
              <span>پیشرفت</span>
              <span>{progress}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`
            h-full rounded-full 
            transition-all duration-500 ease-out
            bg-gradient-to-r ${progressColor}
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
