"use client";

import { useLocaleStore } from "@/store/locale";
import Image from "next/image";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useLocaleStore();

  const toggleLanguage = () => {
    setLocale(locale === "fa" ? "en" : "fa");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`
        p-1.25 rounded-xl cursor-pointer 
        bg-(--surface)
        hover:bg-(--surface-hover)
        border border-(--border)
        focus:outline-none
        focus:ring-2
        focus:ring-(--navy-400)
        transition-colors
      `}
      aria-label="Toggle language"
      title={locale === "fa" ? "Switch to English" : "تغییر به فارسی"}
    >
      {locale === "fa" ? (
        <Image src="/svg/iranFlag.svg" width={24} height={24} alt="Persian" />
      ) : (
        <Image src="/svg/ukFlag.svg" width={24} height={24} alt="English" />
      )}
    </button>
  );
};

export default LanguageSwitcher;
