"use client";

import { useLocaleStore } from "@/store/locale";
import UKFlag from "/public/svg/ukFlag.svg";
import IranFlag from "/public/svg/iranFlag.svg";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocaleStore();

  const toggleLanguage = () => {
    setLocale(locale === "fa" ? "en" : "fa");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center cursor-pointer select-none p-2 rounded-lg hover:bg-[#494949] transition-colors duration-200"
      aria-label="Toggle language"
      title={locale === "fa" ? "Switch to English" : "تغییر به فارسی"}
    >
      {locale === "fa" ? <IranFlag /> : <UKFlag />}
    </button>
  );
};

export default LanguageSwitcher;
