"use client";

import { Button } from "@/components/core/Button";
import { Modal } from "@/components/core/Modal";
import { TextInput } from "@/components/core/TextInput";
import { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: string) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const [taskName, setTaskName] = useState("");

  if (!isOpen) return null;
  const isDisabled = taskName.trim().length === 0;

  const handleAdd = () => {
    if (isDisabled) return;
    onAdd(taskName);
    setTaskName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} header="ایجاد تسک جدید">
      <TextInput
        placeholder="نام تسک رو وارد کنید"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleAdd()}
      />
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
