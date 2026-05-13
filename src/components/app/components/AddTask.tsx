"use client";

import { Button } from "@/components/core/Button";
import { Modal } from "@/components/core/Modal";
import GlassSelect from "@/components/core/Select";
import { TextInput } from "@/components/core/TextInput";
import { Task } from "@/types";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const t = useTranslations("public");

  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!isOpen) return null;

  const isDisabled = taskName.trim().length === 0;

  const handleAdd = () => {
    if (isDisabled) return;

    const newTask: Task = {
      id: uuidv4(),
      title: taskName,
      priority,
      done: false,
    };

    onAdd(newTask);

    setTaskName("");
    setPriority("medium");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={t("creatNewTask")}>
      <div className="space-y-4">
        <TextInput
          id="task-title"
          placeholder={t("taskName")}
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          ref={inputRef}
          aria-required="true"
          aria-label={t("taskNameAria")}
          aria-describedby="task-title-desc"
          autoComplete="off"
        />

        <GlassSelect
          value={priority}
          onChange={setPriority}
          options={[
            { label: t("low"), value: "low" },
            { label: t("medium"), value: "medium" },
            { label: t("high"), value: "high" },
          ]}
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
          className={isDisabled ? "bg-gray-400 dark:bg-gray-600" : "bg-blue-600"}
          onClick={handleAdd}
          label={t("formBTNCreat")}
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
