/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

type Updater<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.error("Error reading from localStorage ", error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, value, isLoaded]);

  const setStoredValue = (update: Updater<T>) => {
    setValue(prev =>
      typeof update === "function" ? (update as (prev: T) => T)(prev) : update,
    );
  };

  return [value, setStoredValue, isLoaded] as const;
}
