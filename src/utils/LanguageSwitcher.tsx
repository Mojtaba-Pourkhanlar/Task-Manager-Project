"use client";

import { useLocaleStore } from "@/store/locale";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocaleStore();

  const toggleLanguage = () => {
    setLocale(locale === "fa" ? "en" : "fa");
  };

  return (
    <button onClick={toggleLanguage} className="flex items-center gap-2">
      {locale === "fa" ? (
        <>
          <span className="text-xl">🇮🇷</span>
          <span>FA</span>
        </>
      ) : (
        <>
          <span className="text-xl">🇺🇸</span>
          <span>EN</span>
        </>
      )}
    </button>
  );
};

export default LanguageSwitcher;
