import { useEffect, useState } from "react";
import { secureGetItem, secureSetItem } from "@/lib/secure-storage";

type Updater<T> = T | ((prev: T) => T);

type UseLocalStorageOptions = {
  secure?: boolean;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {},
) {
  const { secure = false } = options;

  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        if (typeof window === "undefined") return;

        if (secure) {
          const stored = await secureGetItem<T>(key);
          if (!cancelled && stored !== null) setValue(stored);
        } else {
          const stored = localStorage.getItem(key);
          if (!cancelled && stored !== null) {
            setValue(JSON.parse(stored) as T);
          }
        }
      } catch (error) {
        console.error("Error reading from localStorage", error);
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [key, secure]);

  useEffect(() => {
    if (!isLoaded) return;

    const save = async () => {
      try {
        if (typeof window === "undefined") return;

        if (secure) {
          await secureSetItem(key, value);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        console.error("Error saving to localStorage", error);
      }
    };

    save();
  }, [key, value, isLoaded, secure]);

  const setStoredValue = (update: Updater<T>) => {
    setValue(prev =>
      typeof update === "function" ? (update as (prev: T) => T)(prev) : update,
    );
  };

  return [value, setStoredValue, isLoaded] as const;
}
