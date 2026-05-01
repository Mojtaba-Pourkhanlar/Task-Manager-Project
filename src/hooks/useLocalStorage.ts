import { useEffect, useState } from "react";

type Updater<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy init: فقط یکبار در mount می‌خواند، بدون setState داخل effect
  const [value, setValue] = useState<T>(() => {
    try {
      const stored =
        typeof window !== "undefined" ? localStorage.getItem(key) : null;
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // هر بار key یا value عوض شد، localStorage را sync کن
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, value]);

  // یک setter که هم مقدار مستقیم هم تابع را می‌پذیرد
  const setStoredValue = (update: Updater<T>) => {
    setValue(prev => {
      const next =
        typeof update === "function" ? (update as (p: T) => T)(prev) : update;
      return next;
    });
  };

  return [value, setStoredValue] as const;
}
