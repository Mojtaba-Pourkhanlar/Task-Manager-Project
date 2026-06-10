"use client";

import { TIMER } from "@/constants";
import { SetTasks, Task } from "@/types";
import { useEffect, useRef, useState } from "react";
import TaskViewModal from "./Modals/TaskViewModal";
import Headers from "./Header";
import CoreTable from "./Main/CoreTable";
import AddTaskModal from "./Modals/AddEditTaskModal";
import ImportExportActions from "./Header/ImportExportActions";
import { TaskSection } from "@/types/task-transfer";
import { useFocusMode } from "@/hooks/useFocusMode";
import FocusModeModal from "./Modals/FocusModeModal";
import FocusTimerOverlay from "./Main/FocusTimerOverlay";
import ClientOnly from "./Main/ClientOnly";
import { useTranslations } from "next-intl";

interface Props {
  section: TaskSection;
  tasks: Task[];
  setTasks: SetTasks;
  header_name: string;
}

const MainPage = ({ header_name, setTasks, tasks, section }: Props) => {
  const t = useTranslations("focus.Notification");

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

  const createTask = () => {
    setMode("create");
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleImportTasks = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  const togglePauseById = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              isPaused: !t.isPaused,
              ...(t.isPaused === false ? {} : { done: false }),
            }
          : t,
      ),
    );
  };

  const { session, remaining, isFinished, start, reset } = useFocusMode({
    title: t("title"),
    body: (taskTitle: string) => t("body", { title: taskTitle }),
  });
  const [focusTask, setFocusTask] = useState<Task | null>(null);

  return (
    <div className="p-3 max-w-3xl mx-auto">
      <Headers
        name={header_name}
        actions={
          <ImportExportActions
            section={section}
            tasks={tasks}
            onImportConfirm={handleImportTasks}
            creatTask={createTask}
          />
        }
      />
      <CoreTable
        tasks={tasks}
        onToggleDone={toggleDoneById}
        onTogglePause={togglePauseById}
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
        onFocus={task => setFocusTask(task)}
      />
      {isModalOpen && mode !== "view" && (
        <AddTaskModal
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

      {focusTask && !session && (
        <FocusModeModal
          taskTitle={focusTask.title}
          onStart={secs => {
            start(focusTask.id, focusTask.title, secs);
            setFocusTask(null);
          }}
          onClose={() => setFocusTask(null)}
        />
      )}

      <ClientOnly>
        {session && (
          <FocusTimerOverlay
            remaining={remaining}
            totalSeconds={session.totalSeconds}
            taskTitle={session.taskTitle}
            isFinished={isFinished}
            onReset={reset}
          />
        )}
      </ClientOnly>
    </div>
  );
};

export default MainPage;
