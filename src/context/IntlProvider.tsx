"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useMemo } from "react";

import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

import { useLocaleStore } from "@/store/locale";

const messages = {
  fa: faMessages,
  en: enMessages,
};

export default function IntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale, setLocale } = useLocaleStore();

  useEffect(() => {
    const savedLocale = (localStorage.getItem("locale") as "fa" | "en") || "fa";

    if (savedLocale !== locale) {
      setLocale(savedLocale);
    }

    document.documentElement.lang = savedLocale;
    document.documentElement.dir = savedLocale === "fa" ? "rtl" : "ltr";
  }, [locale, setLocale]);

  const currentMessages = useMemo(() => {
    return messages[locale];
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={currentMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
