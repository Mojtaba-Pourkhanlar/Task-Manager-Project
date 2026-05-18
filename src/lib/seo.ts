import { Metadata } from "next";

import enMessages from "@/messages/en.json";
import faMessages from "@/messages/fa.json";

type PageKey = keyof typeof enMessages.seo;

const baseUrl = "https://stak.mojtabapourkhanlar.ir";

// function getLocale(): "fa" | "en" {
//   if (typeof window !== "undefined") {
//     return (localStorage.getItem("locale") as "fa" | "en") || "fa";
//   }
//   return "fa";
// }

function getMessages(locale: "fa" | "en") {
  return locale === "fa" ? faMessages : enMessages;
}

export function createSeo(page: PageKey, path?: string): Metadata {
  const locale = "en";
  // const locale = getLocale();
  const messages = getMessages(locale);

  const seo = messages.seo[page];
  const pagePath = path ?? page;

  const url = `${baseUrl}/${pagePath}`;

  return {
    title: seo.title,
    description: seo.description,

    alternates: {
      canonical: url,
      languages: {
        fa: `${baseUrl}/${pagePath}`,
        en: `${baseUrl}/${pagePath}`,
      },
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: "Planico",
      locale: locale === "en" ? "en_US" : "fa_IR",
      type: "website",
    },
  };
}
