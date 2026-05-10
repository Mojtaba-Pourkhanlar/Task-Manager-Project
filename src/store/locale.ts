import { create } from "zustand";

type Locale = "fa" | "en";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>(set => ({
  locale: "fa",

  setLocale: locale => {
    localStorage.setItem("locale", locale);

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";

    set({ locale });
  },
}));
