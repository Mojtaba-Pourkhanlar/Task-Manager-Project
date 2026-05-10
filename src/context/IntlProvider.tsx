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

  // load locale from localStorage once
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as "fa" | "en" | null;
    if (savedLocale && savedLocale !== locale) {
      setLocale(savedLocale);
    }
  }, []);

  // sync html attributes when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const currentMessages = useMemo(() => {
    return messages[locale];
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={currentMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
