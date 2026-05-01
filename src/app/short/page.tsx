"use client";

import AddTaskModal from "@/components/app/long/AddTaskModal";
import { Button } from "@/components/core/Button";
import GlassTable from "@/components/core/Table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";

export default function ShortTasks() {
  const [tasks, setTasks] = useLocalStorage<string[]>("short-tasks", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task: string) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
  };

  const columns = [
    {
      key: "index",
      header: "#",
      render: (_: string, index: number) => index + 1,
    },
    {
      key: "task",
      header: "عنوان",
      render: (task: string) => <span className="font-medium">{task}</span>,
    },
    {
      key: "actions",
      header: "عملیات",
      render: (task: string, index: number) => (
        <button
          onClick={() => {
            const newTasks = tasks.filter((_, i) => i !== index);
            setTasks(newTasks);
          }}
          className="text-red-400 hover:text-red-300 font-medium"
        >
          حذف
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">لیست تسک ها 📝</h1>
        <Button
          className="bg-blue-600"
          onClick={() => setIsModalOpen(true)}
          lable={"تسک جدید"}
        />
      </div>
      <hr className="bg-none my-3 border-b-2 border-white/20" />

      <GlassTable
        data={tasks}
        columns={columns}
        emptyText="یه فکری به حال خودت بکن😒 اینجا هیچی نیست."
      />

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
