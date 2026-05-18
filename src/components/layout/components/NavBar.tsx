import { cls } from "@/utils";
import { Route } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const t = useTranslations("public");
  const pathname = usePathname();

  const navLinks = [
    { href: "/day/", label: t("day") },
    { href: "/month/", label: t("month") },
    { href: "/year/", label: t("year") },
  ];

  return (
    <nav
      className={cls(
        "fixed bottom-3 left-1 right-1 mx-auto w-[95%] md:max-w-xl rounded-2xl md:rounded-2xl",
        "backdrop-blur-sm backdrop-saturate-150",
        "bg-white/70 border border-gray-200/80 shadow-xl",
        "dark:bg-black/10 dark:border-white/20 dark:shadow-2xl",
        "z-49 overflow-hidden",
      )}
    >
      <ul className="flex justify-around items-center h-13">
        {navLinks.map(link => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="relative flex-1">
              <Link
                href={link.href as Route}
                className={cls(
                  "relative z-10 flex items-center justify-center",
                  "transition-all duration-300 ease-out",

                  isActive
                    ? "scale-110 text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200",
                )}
              >
                <span
                  className={cls(
                    "text-[16px] tracking-wider",
                    isActive && "font-semibold text-[18px]",
                  )}
                >
                  {link.label}
                </span>

                {isActive && (
                  <span
                    className={cls(
                      "absolute inset-0 -z-10 mx-auto my-auto",
                      "w-12 h-12 rounded-full blur-md",
                      "bg-gray-300/60 dark:bg-white/10",
                    )}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
