import { create } from "zustand";
import { secureSetItem } from "@/lib/secure-storage";

type Locale = "fa" | "en";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>(set => ({
  locale: "fa",
  setLocale: locale => {
    if (typeof window !== "undefined") {
      void secureSetItem("locale", locale);
    }
    set({ locale });
  },
}));
