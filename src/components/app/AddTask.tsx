"use client";

import { Button } from "@/components/core/Button";
import { Modal } from "@/components/core/Modal";
import GlassSelect from "@/components/core/Select";
import { TextInput } from "@/components/core/TextInput";
import { Task } from "@/types";
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
    <Modal isOpen={isOpen} onClose={onClose} header="ایجاد تسک جدید">
      <div className="space-y-4">
        <TextInput
          id="task-title"
          placeholder="نام تسک را وارد کنید"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          ref={inputRef}
          aria-required="true"
          aria-label="نام تسک"
          aria-describedby="task-title-desc"
          autoComplete="off"
        />

        <GlassSelect
          value={priority}
          onChange={setPriority}
          options={[
            { label: "کم", value: "low" },
            { label: "مهم", value: "medium" },
            { label: "خیلی مهم", value: "high" },
          ]}
        />
      </div>

      <div className="flex justify-between gap-3 mt-4">
        <Button
          className="bg-gray-600"
          onClick={onClose}
          label={"انصراف"}
          title="انصراف و بستن فرم"
          aria-label="انصراف از ایجاد تسک جدید و بستن مودال"
        />
        <Button
          className={isDisabled ? "bg-gray-600" : "bg-blue-600"}
          onClick={handleAdd}
          label={"ایجاد"}
          disabled={isDisabled}
          title={
            isDisabled ? "لطفاً ابتدا نام تسک را وارد کنید" : "ایجاد تسک جدید"
          }
          aria-label={
            isDisabled
              ? "دکمه ایجاد تسک غیرفعال است چون نام تسک وارد نشده"
              : "تایید و ایجاد تسک جدید"
          }
        />
      </div>
    </Modal>
  );
}
