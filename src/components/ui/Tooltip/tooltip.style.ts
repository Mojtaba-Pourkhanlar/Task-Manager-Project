import { cls } from "@/utils";

export type Position = "top" | "bottom" | "left" | "right";

export const tooltipPositionStyles: Record<Position, string> = {
  top: `
    bottom-full left-1/2 -translate-x-1/2 mb-2
    before:absolute before:left-1/2 before:top-full
    before:-translate-x-1/2
    before:border-4 before:border-transparent
    before:border-t-zinc-900
    dark:before:border-t-zinc-100
  `,

  bottom: `
    top-full left-1/2 -translate-x-1/2 mt-2
    before:absolute before:left-1/2 before:bottom-full
    before:-translate-x-1/2
    before:border-4 before:border-transparent
    before:border-b-zinc-900
    dark:before:border-b-zinc-100
  `,

  left: `
    right-full top-1/2 -translate-y-1/2 mr-3
    before:absolute before:left-full before:top-1/2
    before:-translate-y-1/2
    before:border-4 before:border-transparent
    before:border-l-zinc-900
    dark:before:border-l-zinc-100
  `,

  right: `
    left-full top-1/2 -translate-y-1/2 ml-3
    before:absolute before:right-full before:top-1/2
    before:-translate-y-1/2
    before:border-4 before:border-transparent
    before:border-r-zinc-900
    dark:before:border-r-zinc-100
  `,
};

export const tooltipBaseStyles = cls(
  "absolute z-50 rounded-md px-3 py-1.5 text-sm font-medium",
  "bg-zinc-900 text-white shadow-lg",
  "dark:bg-zinc-300 dark:text-zinc-900",
  "transition-all duration-150",
  "before:content-[''] before:absolute",
  "max-w-[260px] whitespace-normal break-words",
);
