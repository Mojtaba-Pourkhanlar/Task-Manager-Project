"use client";

import AddTask from "@/components/app/AllPage/AddTask";
import CoreTable from "@/components/app/AllPage/CoreTable";
import Headers from "@/components/app/AllPage/Headers";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useState } from "react";

export default function MonthTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("month-tasks", []);
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

  return (
    <div className="px-5 md:px-11 py-6 max-w-3xl mx-auto">
      <Headers
        name="لیست تسک های ماهانه"
        onClick={() => setIsModalOpen(true)}
      />
      <CoreTable
        tasks={tasks}
        onToggleDone={toggleDoneById}
        onDelete={deleteById}
      />
      {isModalOpen && (
        <AddTask
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}
