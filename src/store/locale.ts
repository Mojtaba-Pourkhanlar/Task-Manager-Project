import { create } from "zustand";
import { persist } from "zustand/middleware";

type Locale = "fa" | "en";
interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    set => ({
      locale: "fa",
      setLocale: locale => set({ locale }),
    }),
    { name: "locale" },
  ),
);
