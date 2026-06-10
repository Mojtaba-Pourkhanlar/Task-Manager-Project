import CustomLayout from "@/components/layout";
import SplashHandler from "@/components/ui/SplashHandler";
import { Metadata, Viewport } from "next";
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
  title: "Planico",
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
    siteName: "Planico",
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export default function SiteLayout({
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
        <link rel="apple-touch-icon" href="/icons/favicon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              try {
                var locale = localStorage.getItem("locale") || "fa";
                document.documentElement.lang = locale;
                document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";

                if (!sessionStorage.getItem("planico_initialized")) {
                  var splash = document.getElementById("planico-splash");
                  if (splash) splash.style.display = "flex";
                  sessionStorage.setItem("planico_initialized", "true");
                }
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
              url: "https://mojtabapourkhanlar.ir",
              image:
                "https://task.mojtabapourkhanlar.ir/images/mojtaba-pourkhanlar.png",
              sameAs: [
                "https://github.com/Mojtaba-Pourkhanlar",
                "https://www.linkedin.com/in/mojtaba-pourkhanlar-778370251/",
              ],
            }),
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          #planico-splash {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--background, #ffffff); 
            display: none; /* پیش‌فرض مخفی باشه */
            flex-direction: column;
            justify-content: center; align-items: center;
            z-index: 99999;
            transition: opacity 0.5s ease-in-out;
          }
          .loader-logo { width: 80px; height: 80px; margin-bottom: 20px; animation: pulse 1.5s infinite; }
          @keyframes pulse { 0%, 100% { transform: scale(0.95); } 50% { transform: scale(1.05); } }
          .loader-bar { width: 120px; height: 4px; background: #ddd; border-radius: 10px; overflow: hidden; }
          .loader-progress { width: 100%; height: 100%; background: var(--navy-500, #292B2E); animation: loading 2s infinite ease-in-out; transform-origin: left; }
          @keyframes loading { 0% { transform: scaleX(0); } 50% { transform: scaleX(1); } 100% { transform: scaleX(0); transform-origin: right; } }
          .fade-out { opacity: 0 !important; pointer-events: none; }
        `,
          }}
        />
      </head>
      <body>
        <SplashHandler />

        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
