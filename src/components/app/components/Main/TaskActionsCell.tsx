"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import UndoTimerButton from "@/components/ui/UndoTimerButton";
import { Task } from "@/types";
import { TaskActionsCellStyles as s } from "../core.styles";

type TaskActionsCellProps = {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onUndoDelete: (id: string) => void;
};

const TaskActionsCell = ({
  task,
  onView,
  onEdit,
  onDelete,
  onUndoDelete,
}: TaskActionsCellProps) => {
  const t = useTranslations("public");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const isDeleting = !!(task.deletingUntil && task.deletingUntil > now);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center gap-2">
        {isDeleting ? (
          <>
            <button
              className={s.tableActionButton("info")}
              title={t("tableColumnsView")}
              aria-label={`${t("tableColumnsViewDetail")} : ${task.title}`}
              disabled
            >
              <Eye
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className={s.tableIconDisabled}
              />
            </button>

            <button
              className={s.tableActionButton("warning")}
              title={t("tableColumnsEdit")}
              aria-label={`${t("tableColumnsEditDetail")} : ${task.title}`}
              disabled
            >
              <Pencil
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className={s.tableIconDisabled}
              />
            </button>

            <UndoTimerButton onUndo={() => onUndoDelete(task.id)} />
          </>
        ) : (
          <>
            <button
              onClick={() => onView(task)}
              className={s.tableActionButton("info")}
              title={t("tableColumnsView")}
              aria-label={`${t("tableColumnsViewDetail")} : ${task.title}`}
              aria-haspopup="dialog"
            >
              <Eye
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className={s.tableViewIcon}
              />
            </button>

            <button
              onClick={() => onEdit(task)}
              className={s.tableActionButton("warning")}
              title={t("tableColumnsEdit")}
              aria-label={`${t("tableColumnsEditDetail")} : ${task.title}`}
              aria-haspopup="dialog"
            >
              <Pencil
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className={s.tableEditIcon}
              />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className={s.tableActionButton("danger")}
              title={t("tableColumnsDelete")}
              aria-label={`${t("tableColumnsDeleteDetail")} : ${task.title}`}
              aria-haspopup="dialog"
            >
              <Trash2
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className={s.tableDeleteIcon}
              />
            </button>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden justify-center">
        {isDeleting ? (
          <div className="flex items-center justify-center">
            <UndoTimerButton onUndo={() => onUndoDelete(task.id)} />
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setOpen(prev => !prev)}
              className={s.tableActionButton("info")}
              aria-label={`${t("tableColumnsActions")} : ${task.title}`}
              aria-haspopup="menu"
              aria-expanded={open}
              title={t("tableColumnsActions")}
            >
              <MoreVertical
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className={s.tableViewIcon}
              />
            </button>

            {open && (
              <div
                className="
                  absolute left-0 top-full z-30 mt-2
                  min-w-32
                  rounded-xl border border-(--border)
                  bg-(--surface)
                  backdrop-blur-xl 
                  shadow-lg
                  overflow-hidden
                "
                role="menu"
              >
                <button
                  type="button"
                  onClick={() => {
                    onView(task);
                    closeMenu();
                  }}
                  className={s.taskView}
                  role="menuitem"
                >
                  <Eye size={17} strokeWidth={2.5} className="text-blue-500" />
                  <span className="font-bold">{t("tableColumnsView")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onEdit(task);
                    closeMenu();
                  }}
                  className={s.taskEdit}
                  role="menuitem"
                >
                  <Pencil
                    size={17}
                    strokeWidth={2.5}
                    className="text-yellow-500"
                  />
                  <span className="font-bold">{t("tableColumnsEdit")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDelete(task.id);
                    closeMenu();
                  }}
                  className={s.taskDelete}
                  role="menuitem"
                >
                  <Trash2
                    size={16}
                    strokeWidth={2.5}
                    className="text-(--danger)"
                  />
                  <span className="font-bold">{t("tableColumnsDelete")}</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskActionsCell;
