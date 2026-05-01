import { cls } from "@/utils";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/short/", label: "کوتاه‌مدت", icon: <span>📝</span> },
  { href: "/long/", label: "بلندمدت", icon: <span>⏱</span> },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={cls(
        "fixed bottom-3 left-4 right-4 mx-auto max-w-lg rounded-3xl",
        "bg-black/10 backdrop-blur-sm backdrop-saturate-150",
        "border border-white/20 shadow-2xl",
        "z-49 overflow-hidden",
      )}
    >
      <ul className="flex justify-around items-center h-16 px-2">
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
                    isActive ? "font-[600] text-[18px]" : "",
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
