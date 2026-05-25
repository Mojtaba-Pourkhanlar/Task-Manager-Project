"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import GlassSelect from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { TextInput } from "@/components/ui/TextInput";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  task?: Task | null;
  onAdd: (task: Task) => void;
  onUpdate: (task: Task) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
  task,
  mode,
  onUpdate,
}: AddTaskModalProps) {
  const t = useTranslations("public");

  const [taskName, setTaskName] = useState(task?.title || "");
  const [taskDesc, setTaskDesc] = useState(task?.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    task?.priority || "medium",
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!isOpen) return null;

  const isDisabled = taskName.trim().length === 0;

  const handleSubmit = () => {
    if (isDisabled) return;

    if (mode === "create") {
      onAdd({
        id: uuidv4(),
        title: taskName,
        description: taskDesc,
        priority,
        done: false,
      });
    }

    if (mode === "edit" && task) {
      onUpdate({
        ...task,
        title: taskName,
        description: taskDesc,
        priority,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={mode === "create" ? t("creatNewTask") : t("editTask")}
    >
      <div className="space-y-4">
        <TextInput
          label={t("taskNameAria")}
          id="task-title"
          placeholder={t("taskName")}
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          ref={inputRef}
          aria-required="true"
          aria-label={t("taskNameAria")}
          aria-describedby="task-title-desc"
          autoComplete="off"
        />

        <GlassSelect
          label={t("tableColumnsPriority")}
          value={priority}
          onChange={setPriority}
          options={[
            { label: t("low"), value: "low" },
            { label: t("medium"), value: "medium" },
            { label: t("high"), value: "high" },
          ]}
        />

        <TextArea
          label={t("taskDescAria")}
          id="task-desc"
          placeholder={t("taskDesc")}
          value={taskDesc}
          onChange={e => setTaskDesc(e.target.value)}
          aria-required="true"
          aria-label={t("taskDescAria")}
          aria-describedby="task-desc"
          autoComplete="off"
        />
      </div>

      <div className="flex justify-between gap-3 mt-5">
        <Button
          className="bg-gray-400 dark:bg-gray-600"
          onClick={onClose}
          label={t("formBTN")}
          title={t("formBTNTitle")}
          aria-label={t("formBTNAria")}
        />
        <Button
          className={
            isDisabled ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-600"
          }
          onClick={handleSubmit}
          label={mode === "create" ? t("formBTNCreat") : t("updateTask")}
          disabled={isDisabled}
          title={isDisabled ? t("formBTNCreatTitle") : t("creatNewTask")}
          aria-label={
            isDisabled ? t("formBTNCreatAria") : t("formBTNCreatAriaConfirm")
          }
        />
      </div>
    </Modal>
  );
}
