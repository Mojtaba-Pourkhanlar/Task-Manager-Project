import { create } from "zustand";

type Locale = "fa" | "en";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>(set => ({
  locale: "fa",
  setLocale: locale => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
    set({ locale });
  },
}));
