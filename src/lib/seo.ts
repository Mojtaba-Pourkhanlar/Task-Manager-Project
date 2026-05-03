import { Metadata } from "next";

type SeoInput = {
  data: {
    title: string;
    description: string;
    path: string;
  };
};

const baseUrl = "https://stak.mojtabapourkhanlar.ir";

export function createSeo({ data }: SeoInput): Metadata {
  const url = `${baseUrl}/${data.path}`;
  return {
    title: data.title,
    description: data.description,

    alternates: {
      canonical: url,
      languages: {
        fa: `${baseUrl}/${data.path}`,
        en: `${baseUrl}/${data.path}`,
      },
    },

    openGraph: {
      title: data.title,
      description: data.description,
      url,
      siteName: "Mojtaba Pourkhanlar",
      locale: "fa_IR",
      type: "website",
    },
  };
}
