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
        "fixed bottom-3 left-4 right-4 mx-auto max-w-lg rounded-3xl",
        "bg-black/10 backdrop-blur-sm backdrop-saturate-150",
        "border border-white/20 shadow-2xl",
        "z-49 overflow-hidden",
      )}
    >
      <ul className="flex justify-around items-center h-16">
        {navLinks.map(link => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href} className="relative flex-1">
              <Link
                href={link.href as Route}
                className={cls(
                  "relative z-10 flex items-center justify-center transition-all duration-300 ease-out",
                  isActive
                    ? "scale-110 text-white"
                    : "text-gray-400  hover:text-gray-200 ",
                )}
              >
                <span
                  className={cls(
                    "text-[16px] tracking-wider",
                    isActive ? "font-semibold text-[18px]" : "",
                  )}
                >
                  {link.label}
                </span>
                {isActive && (
                  <span className="absolute inset-0 -z-10 mx-auto my-auto w-12 h-12 bg-white/10 blur-md rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
