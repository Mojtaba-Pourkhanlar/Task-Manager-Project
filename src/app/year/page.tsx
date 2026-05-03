"use client";

import AddTask from "@/components/app/AddTask";
import CoreTable from "@/components/app/CoreTable";
import Headers from "@/components/app/Headers";
import ImportExportActions from "@/components/app/ImportExportActions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createSeo } from "@/lib/seo";
import { Task } from "@/types";
import { useState } from "react";

export async function generateMetadata() {
  return createSeo({
    data: {
      title: "Year | Task Manager",
      description: "This app created by Mojtaba Pourkhanlar",
      path: "/year",
    },
  });
}

export default function YearTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("yers-tasks", []);
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
  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  return (
    <div className="px-5 md:px-11 py-6 max-w-3xl mx-auto">
      <Headers
        name="لیست تسک های سالانه"
        onClick={() => setIsModalOpen(true)}
        actions={
          <ImportExportActions
            section="year"
            tasks={tasks}
            onImportConfirm={handleImportTasks}
          />
        }
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
