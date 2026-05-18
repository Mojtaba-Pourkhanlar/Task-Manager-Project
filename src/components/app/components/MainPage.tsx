"use client";

import AddTask from "@/components/app/components/AddEditTaskModal";
import CoreTable from "@/components/app/components/CoreTable";
import Headers from "@/components/app/components/Headers";
import ImportExportActions from "@/components/app/components/ImportExportActions";
import { TIMER } from "@/constants";
import { SetTasks, Task } from "@/types";
import { useEffect, useRef, useState } from "react";
import TaskViewModal from "./TaskViewModal";

interface Props {
  tasks: Task[];
  setTasks: SetTasks;
  header_name: string;
  onShowHistory: () => void;
}

const MainPage = ({ header_name, setTasks, tasks, onShowHistory }: Props) => {
  const deleteTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {},
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");

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

  const updateTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  const createTask = () => {
    setMode("create");
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <Headers
        name={header_name}
        onClick={createTask}
        actions={
          <ImportExportActions
            section="day"
            tasks={tasks}
            onImportConfirm={handleImportTasks}
            onShowHistory={onShowHistory}
          />
        }
      />
      <CoreTable
        tasks={tasks}
        onToggleDone={toggleDoneById}
        onDelete={deleteById}
        onUndoDelete={undoDelete}
        onClick={createTask}
        onView={task => {
          setMode("view");
          setSelectedTask(task);
          setIsModalOpen(true);
        }}
        onEdit={task => {
          setMode("edit");
          setSelectedTask(task);
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && mode !== "view" && (
        <AddTask
          key={selectedTask?.id || "create"}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTask}
          onUpdate={updateTask}
          mode={mode}
          task={selectedTask}
        />
      )}
      {mode === "view" && (
        <TaskViewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default MainPage;
