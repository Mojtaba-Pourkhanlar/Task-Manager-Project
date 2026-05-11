import {
  ButtonHTMLAttributes,
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

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
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

// Table.tsx
type Column<T> = {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
};
export type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyText?: string;
  rowClassName?: (item: T) => string;
  maxHeight?: string | number;
  onClick: () => void;
};
// TextInput.tsx
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
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
  priority: "low" | "medium" | "high";
  done: boolean;
  deleting?: boolean;
}
export interface TaskColumn {
  key: keyof Task | string;
  header: React.ReactNode;
  render?: (row: Task, index: number) => React.ReactNode;
  width?: string;
}
