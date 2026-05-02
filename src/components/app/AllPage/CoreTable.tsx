import GlassCheckbox from "@/components/core/Checkbox";
import GlassTable from "@/components/core/Table";
import { Task, TaskColumn } from "@/types";
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
          checked={task.done}
          onChange={val => onToggleDone(task.id, val)}
        />
      ),
      width: "w-[10px]",
    },
    // {
    //   key: "index",
    //   header: "ردیف",
    //   render: (_: Task, index: number) => <p className="pr-2">{index + 1}</p>,
    // },
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
          className="text-red-400 hover:text-red-300 font-medium cursor-pointer"
        >
          حذف
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

  return (
    <>
      <GlassTable
        data={viewTasks}
        columns={columns}
        rowClassName={(task: Task) =>
          task.done ? "bg-green-500/20" : "hover:bg-white/5"
        }
        emptyText="یه فکری به حال خودت بکن😒 اینجا هیچی نیست."
      />

      {viewTasks.length > 0 && (
        <div className="flex items-center justify-between h-15 px-3">
          <p className="text-blue-400">تمامی تسک ها : {viewTasks.length}</p>
          <p className="text-green-600">
            تسک های انجام شده : {isDone?.length > 0 ? isDone.length : 0}
          </p>
        </div>
      )}
    </>
  );
};

export default CoreTable;
