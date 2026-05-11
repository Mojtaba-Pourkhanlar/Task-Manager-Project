"use client";

import AddTask from "@/components/app/AddTask";
import CoreTable from "@/components/app/CoreTable";
import Headers from "@/components/app/Headers";
import ImportExportActions from "@/components/app/ImportExportActions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const DayTasksClient = () => {
  const deleteTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const td = useTranslations("day");
  const [tasks, setTasks] = useLocalStorage<Task[]>("day-tasks", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };
  const toggleDoneById = (id: string, value: boolean) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: value } : t)));
  };

  const deleteById = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, deleting: true } : t)),
    );
    deleteTimers.current[id] = setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
      delete deleteTimers.current[id];
    }, 4000);
  };

  const undoDelete = (id: string) => {
    const timer = deleteTimers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete deleteTimers.current[id];
    }
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, deleting: false } : t)),
    );
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  return (
    <div className="px-5 md:px-11 py-6 max-w-3xl mx-auto">
      <Headers
        name={td("header")}
        onClick={() => setIsModalOpen(true)}
        actions={
          <ImportExportActions
            section="day"
            tasks={tasks}
            onImportConfirm={handleImportTasks}
          />
        }
      />
      <CoreTable
        tasks={tasks}
        onToggleDone={toggleDoneById}
        onDelete={deleteById}
        onUndoDelete={undoDelete}
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
