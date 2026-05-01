"use client";

import { Button } from "@/components/core/Button";
import { Modal } from "@/components/core/Modal";
import GlassSelect from "@/components/core/Select";
import { TextInput } from "@/components/core/TextInput";
import { Task } from "@/types";
import { useEffect, useRef, useState } from "react";

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
      id: crypto.randomUUID(),
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
    <Modal isOpen={isOpen} header="ایجاد تسک جدید">
      <div className="space-y-4">
        <TextInput
          placeholder="نام تسک رو وارد کنید"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAdd()}
          ref={inputRef}
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
        <Button className="bg-gray-600" onClick={onClose} lable={"انصراف"} />
        <Button
          className={isDisabled ? "bg-blue-900" : "bg-blue-600"}
          onClick={handleAdd}
          lable={"ایجاد"}
          disabled={isDisabled}
        />
      </div>
    </Modal>
  );
}
