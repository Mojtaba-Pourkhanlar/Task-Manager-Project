import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CustomLayout from "@/components/layout";

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
  keywords: ["productivity", "utilities", "task-management"],
  openGraph: {
    siteName: "Task Manager",
    type: "website",
  },
  icons: {
    icon: [{ url: "/icons/favicon.png" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" className={yekanBakh.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icons/192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-TileImage" content="/icons/192.png" />
        <meta name="msapplication-TileColor" content="#292B2E" />
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
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
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
