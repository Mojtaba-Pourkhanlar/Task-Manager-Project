import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

// --------------------------------------Core Components
// Button.tsx
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | number;
  onClick?: () => void;
  className?: string;
}
// Checkbox.tsx
export type Priority = "low" | "medium" | "high";
export interface GlassCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  priority?: Priority;
  disabled?: boolean;
}
// Modal.tsx
export interface ModalProps {
  isOpen: boolean;
  header: string;
  children: ReactNode;
  onClose: () => void;
}
// Select.tsx
interface Option<T extends string> {
  label: string;
  value: T;
}
export interface GlassSelectProps<T extends string> {
  label?: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

// Table.tsx
export type ColumnTable<T> = {
  key?: keyof T;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
  align: "text-start" | "text-center" | "text-end";
};

export type TableProps<T> = {
  data: T[];
  columns: ColumnTable<T>[];
  emptyText?: string;
  rowClassName?: (item: T) => string;
  maxHeight?: string | number;
  onClick: () => void;
};

// TextInput.tsx
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
}
// Toastify.tsx
export type ToastType = "info" | "success" | "warning" | "error";
export type ResolvableProps = {
  message: string;
  type: ToastType;
  theme?: "light" | "dark" | "system";
  open: boolean;
  duration?: number;
  onClose: () => void;
};
export interface ToastContextType {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}
export interface ToastProviderProps {
  children: ReactNode;
}

// --------------------------------------------Task Page
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  done: boolean;
  deletingUntil?: number;
  isPaused?: boolean;
}

export type SetTasks = React.Dispatch<React.SetStateAction<Task[]>>;

// -------------------------------------------- CoreTable.tsx

export interface CoreTableProps {
  tasks: Task[];
  onToggleDone: (id: string, value: boolean) => void;
  onTogglePause: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
  onUndoDelete: (id: string) => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
}
