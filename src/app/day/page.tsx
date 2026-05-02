"use client";

import AddTaskModal from "@/components/app/AllPage/AddTaskModal";
import { Button } from "@/components/core/Button";
import GlassCheckbox from "@/components/core/Checkbox";
import GlassTable from "@/components/core/Table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, TaskColumn } from "@/types";
import { useMemo, useState } from "react";

const priorityWeight: Record<Task["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function DayTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("day-tasks", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const toggleDoneById = (id: string, value: boolean) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: value } : t)));
  };

  const deleteById = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

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

  const columns: TaskColumn[] = [
    {
      key: "done",
      header: "",
      render: (task: Task) => (
        <GlassCheckbox
          checked={task.done}
          onChange={val => toggleDoneById(task.id, val)}
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
            className={`px-2 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${colorMap[task.priority]}`}
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
          onClick={() => deleteById(task.id)}
          className="text-red-400 hover:text-red-300 font-medium"
        >
          حذف
        </button>
      ),
    },
  ];

  const isDone = viewTasks?.filter((item: Task) => item.done);

  return (
    <div className="px-5 md:px-11 py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">لیست تسک های روزانه </h1>

        <Button
          className="bg-blue-950 border border-white/20"
          onClick={() => setIsModalOpen(true)}
          lable={"تسک جدید"}
        />
      </div>

      <hr className="bg-none my-3 border-b-2 border-white/20" />

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

      {isModalOpen && (
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}
