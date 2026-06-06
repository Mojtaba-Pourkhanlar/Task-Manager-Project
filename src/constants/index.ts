import { Task } from "@/types";

export const VERSION = "V_0.1.1";
export const TIMER: number = 3000;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^(?=.*[a-zA-Z\u0600-\u06FF]).{5,}$/;
export const priorityWeight: Record<Task["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};
