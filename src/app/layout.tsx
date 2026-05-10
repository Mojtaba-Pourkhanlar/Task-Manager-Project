import CustomLayout from "@/components/layout";
import IntlProvider from "@/context/IntlProvider";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const yekanBakh = localFont({
  src: [
    {
      path: "../assets/fonts/Yekan-Bakh-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--font-yekanBakh",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://task.mojtabapourkhanlar.ir/"),
  title: "Task Manager",
  description:
    "A personal task manager built by Mojtaba Pourkhanlar to organize daily tasks, track progress, and stay productive.",
  keywords: [
    "productivity",
    "utilities",
    "task-management",
    "Next.js",
    "React",
    "Frontend Developer",
    "Mojtaba Pourkhanlar",
  ],
  openGraph: {
    siteName: "Task Manager",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icons/favicon.png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    languages: {
      en: "/",
      fa: "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={yekanBakh.variable}
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileImage" content="/icons/192.png" />
        <meta name="msapplication-TileColor" content="#292B2E" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              try {
                var locale = localStorage.getItem("locale") || "fa";
                var dir = locale === "fa" ? "rtl" : "ltr";
                document.documentElement.lang = locale;
                document.documentElement.dir = dir;
              } catch (e) {}
            })();
            `,
          }}
        />
        <script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mojtaba Pourkhanlar",
              jobTitle: "Frontend Developer",
              url: "https://task.mojtabapourkhanlar.ir",
              image:
                "https://task.mojtabapourkhanlar.ir/images/mojtaba-pourkhanlar.png",
              sameAs: [
                "https://github.com/Mojtaba-Pourkhanlar",
                "https://www.linkedin.com/in/mojtaba-pourkhanlar-778370251/",
              ],
            }),
          }}
        />
      </head>
      <body>
        <IntlProvider>
          <CustomLayout>{children}</CustomLayout>
        </IntlProvider>
      </body>
    </html>
  );
}
