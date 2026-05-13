"use client";

import AddTask from "@/components/app/components/AddTask";
import CoreTable from "@/components/app/components/CoreTable";
import Headers from "@/components/app/components/Headers";
import ImportExportActions from "@/components/app/components/ImportExportActions";
import { TIMER } from "@/constants";
import { SetTasks, Task } from "@/types";
import { useEffect, useRef, useState } from "react";

interface Props {
  tasks: Task[];
  setTasks: SetTasks;
  header_name: string;
}

const MainPage = ({ header_name, setTasks, tasks }: Props) => {
  const deleteTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    tasks.forEach(task => {
      if (!task.deletingUntil) return;
      if (deleteTimers.current[task.id]) return;
      const remaining = task.deletingUntil - Date.now();
      if (remaining <= 0) {
        setTasks(prev => prev.filter(t => t.id !== task.id));
        return;
      }
      deleteTimers.current[task.id] = setTimeout(() => {
        setTasks(prev => prev.filter(t => t.id !== task.id));
        delete deleteTimers.current[task.id];
      }, remaining);
    });
  }, [tasks, setTasks]);

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };
  const toggleDoneById = (id: string, value: boolean) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: value } : t)));
  };

  const deleteById = (id: string) => {
    const deletingUntil = Date.now() + TIMER;
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, deletingUntil } : t)),
    );
    deleteTimers.current[id] = setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
    }, TIMER);
  };

  const undoDelete = (id: string) => {
    const timer = deleteTimers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete deleteTimers.current[id];
    }
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, deletingUntil: undefined } : t)),
    );
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  return (
    <div className="px-5 md:px-11 py-6 max-w-3xl mx-auto">
      <Headers
        name={header_name}
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

export default MainPage;
