"use client";

import AddTask from "@/components/app/AddTask";
import CoreTable from "@/components/app/CoreTable";
import Headers from "@/components/app/Headers";
import ImportExportActions from "@/components/app/ImportExportActions";
import { useToast } from "@/context/ToastContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";

const DayTasksClient = () => {
  const t = useTranslations("task");
  const { showUndoToast } = useToast();
  const pendingDeleteRef = useRef<Task | null>(null);
  const [tasks, setTasks] = useLocalStorage<Task[]>("day-tasks", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };
  const toggleDoneById = (id: string, value: boolean) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: value } : t)));
  };
  const deleteById = (id: string) => {
    const deletedTask = tasks.find(t => t.id === id);
    if (!deletedTask) return;
    setTasks(prev => prev.filter(t => t.id !== id));
    pendingDeleteRef.current = deletedTask;
    showUndoToast("تسک با موفقیت حذف شد", undoDelete);
    setTimeout(() => {
      pendingDeleteRef.current = null;
    }, 2300);
  };

  const undoDelete = () => {
    const task = pendingDeleteRef.current;
    if (!task) return;
    setTasks(prev => [...prev, task]);
    pendingDeleteRef.current = null;
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  return (
    <div className="px-5 md:px-11 py-6 max-w-3xl mx-auto">
      <Headers
        name="لیست تسک های روزانه"
        onClick={() => setIsModalOpen(true)}
        actions={
          <ImportExportActions
            section="day"
            tasks={tasks}
            onImportConfirm={handleImportTasks}
          />
        }
      />
      <button>{t("add")}</button>
      <CoreTable
        tasks={tasks}
        onToggleDone={toggleDoneById}
        onDelete={deleteById}
        onClick={() => setIsModalOpen(true)}
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
};

export default DayTasksClient;
