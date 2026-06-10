"use client";

import { NextIntlClientProvider } from "next-intl";
import { useMemo, useEffect } from "react";
import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";
import { useLocaleStore } from "@/store/locale";

const messages = { fa: faMessages, en: enMessages };

export default function IntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useLocaleStore();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const currentMessages = useMemo(
    () => messages[locale] ?? faMessages,
    [locale],
  );

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={currentMessages}
      timeZone="Asia/Tehran"
    >
      {children}
    </NextIntlClientProvider>
  );
}
