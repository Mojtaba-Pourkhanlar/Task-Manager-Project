import { Task } from "@/types";

export const VERSION = "V_0.3.0";
export const TIMER: number = 3000;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^(?=.*[a-zA-Z\u0600-\u06FF]).{5,}$/;
export const priorityWeight: Record<Task["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const clearUserData = () => {
  const keys = [
    "auth_user",
    "day-history",
    "day-last-period",
    "day-tasks",
    "month-history",
    "month-last-period",
    "month-tasks",
    "year-history",
    "year-last-period",
    "year-tasks",
  ];

  keys.forEach(key => localStorage.removeItem(key));
};
