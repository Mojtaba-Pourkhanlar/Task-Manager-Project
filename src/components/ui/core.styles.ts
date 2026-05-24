import { Priority } from "@/types";

/* ---------------- Modal ---------------- */

export const modalStyles = {
  backdrop: `
    fixed inset-0 z-50 flex items-center justify-center
    transition-transform duration-300 ease-out
    bg-[var(--overlay)]
    backdrop-blur-sm
  `,

  container: `
    w-80 rounded-2xl p-4
    bg-[var(--modal-bg)]
    backdrop-blur-xl
    border border-[var(--modal-border)]
    shadow-[var(--modal-shadow)]
  `,

  header: `
    text-lg font-semibold text-center
    text-[var(--foreground)]
  `,

  styleHR: `
    bg-none mt-2 mb-4
    border-b-2 border-(--navy-500)/20 dark:border-white/20
  `,

  content: `
    text-[var(--muted-foreground)]
  `,
};

/* ---------------- Table ---------------- */

export const tableStyles = {
  wrapper: `
    rounded-2xl
    border border-[var(--table-border)]
    bg-[var(--table-bg)]
    backdrop-blur-xl
    shadow-[var(--shadow-soft)]
    overflow-hidden
  `,

  table: `
    w-full text-sm
    text-[var(--foreground)]
    border-collapse
  `,

  thead: `
    sticky top-0 z-10
    bg-[var(--table-head-bg)]
    backdrop-blur-xl
  `,

  th: `
    p-2 font-semibold
    border-b border-[var(--table-row-border)]
  `,

  row: `
    border-b border-[var(--table-row-border)]
    transition-colors duration-300
    `,
  // hover:bg-[var(--row-hover)]

  emptyWrapper: `
    flex flex-col items-center gap-4
    px-8 py-6 rounded-2xl
    bg-[var(--empty-card-bg)]
    backdrop-blur-lg
    border border-[var(--table-border)]
    text-center
    shadow-[var(--shadow-soft)]
  `,

  emptyIconWrapper: `
    w-14 h-14 flex items-center justify-center
    rounded-full
    bg-[var(--empty-icon-bg)]
    border border-[var(--table-border)]
  `,

  emptyText: `
    text-[var(--muted-foreground)]
    font-semibold text-base whitespace-nowrap
  `,

  primaryButton: `
    bg-emerald-500/40
    hover:bg-emerald-500/30
    text-[var(--muted-foreground)]!
    dark:text-emerald-200!
    border border-emerald-400/20
    backdrop-blur-md
    shadow-[0_0_12px_rgba(16,185,129,0.25)]
    hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]
    transition-all duration-200
    font-semibold
  `,
};

/* ---------------- Select ---------------- */

export const selectStyles = {
  wrapper: `
    relative w-full
    outline-none
    focus-visible:ring-2
    focus-visible:ring-(--navy-400)
    focus-visible:rounded-xl
  `,

  trigger: `
    cursor-pointer
    px-3 py-2
    rounded-xl
    border
    border-gray-300 dark:border-white/20
    bg-white dark:bg-neutral-900
    text-gray-800 dark:text-gray-100
    flex justify-between items-center
    transition duration-200
    hover:bg-gray-100 dark:hover:bg-white/10
    select-none
  `,

  arrow: `
    text-gray-500 dark:text-white/70
    transition-transform duration-200
  `,

  dropdown: `
    absolute left-0 mt-2 w-full
    bg-white/70 dark:bg-neutral-900/90
    border border-gray-300 dark:border-white/20
    rounded-xl
    shadow-lg
    text-gray-800 dark:text-gray-100
    z-50
    overflow-hidden
  `,

  option: `
    px-3 py-2
    cursor-pointer
    text-center
    transition
    font-bold
    outline-none
    hover:bg-gray-100 dark:hover:bg-white/10
  `,

  optionFocused: `
    bg-black/30 dark:bg-white/20
  `,

  optionSelected: `
    font-semibold
  `,
};

/* ---------------- Input ---------------- */

export const inputStyles = {
  wrapper: "w-full space-y-1",

  label: `
    text-sm font-semibold
    text-gray-700 dark:text-gray-200
    select-none
  `,

  base: `
    w-full
    px-3 pt-1 h-10
    rounded-xl outline-none
    border
    bg-white dark:bg-neutral-900
    text-gray-800 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:ring-2
    transition-all duration-200
    font-semibold
  `,

  normal: `
    border-gray-300
    dark:border-white/20
    focus:ring-(--navy-400)
  `,

  error: `
    border-red-500
    focus:ring-red-400
  `,

  errorText: `
    text-xs
    text-red-500
    font-medium
    mt-1
  `,
};

/* ---------------- Checkbox ---------------- */

export const checkboxStyles = {
  wrapper: "relative flex items-center gap-3 group",

  input: "peer w-6 h-6 opacity-0 cursor-pointer absolute z-10",

  circle: `
    w-5 h-5 rounded-full border-2
    backdrop-blur-md
    transition-all duration-300 ease-out
    flex items-center justify-center
    peer-focus-visible:ring-2
    peer-focus-visible:ring-offset-2
    peer-focus-visible:ring-gray-400
    dark:peer-focus-visible:ring-white/40
  `,

  unchecked: `
    bg-gray-100 dark:bg-white/10
    border-gray-300 dark:border-white/20
    group-hover:border-gray-400
    dark:group-hover:border-white/40
  `,

  icon: `
    text-gray-800 dark:text-white
    transition-all duration-300
  `,

  label: `
    text-sm font-medium text-white/80
    cursor-pointer select-none
    group-hover:text-white
    transition-colors
  `,
};

export const checkboxPriorityStyles: Record<Priority, string> = {
  low: "border-green-400 bg-green-400/30 shadow-[0_0_12px_rgba(34,197,94,0.5)]",
  medium:
    "border-yellow-400 bg-yellow-400/30 shadow-[0_0_12px_rgba(250,204,21,0.5)]",
  high: "border-red-400 bg-red-400/30 shadow-[0_0_12px_rgba(239,68,68,0.5)]",
};

/* ---------------- Tabs ---------------- */

export const TabsStyles = {
  container: `flex overflow-hidden rounded-xl
    bg-(--surface)
    border border-(--border)
    h-9
  `,
  href: `hover:bg-(--surface-hover) px-3 pt-1 flex items-center rounded-0 transition`,
  active: `
    text-(--navy-900) 
    bg-(--navy-200) 
    dark:text-(--navy-900) 
    dark:bg-(--navy-50) 
    font-semibold
  `,
  inactive: `
    text-gray-700
    dark:text-(--navy-700)
    bg-(--navy-50)
    dark:bg-[#1F1F1F]
  `,
};

/* ---------------- Accordion ---------------- */
export const accordionStyles = {
  container: "flex flex-col gap-2 w-full",

  itemWrapper:
    "bg-[var(--surface)] rounded-xl px-0 pt-2 select-none transition-all duration-300 my-1",

  headerRow:
    "relative w-full flex items-center justify-between cursor-pointer pb-1",

  dashedLine:
    "absolute top-4 lg:top-5 left-8 border-b-2 border-[#ccc] dark:border-gray-600 border-dashed w-[90%]",

  button:
    "text-[14px] lg:text-[16px] font-bold  bg-[var(--surface)] border border-[#ccc] dark:border-gray-600 text-navy-900 dark:text-gray-100 rounded-xl mx-3 px-2 h-8 lg:h-9 flex items-center z-10",

  icon: "mx-2 transition-all duration-300 dark:text-gray-200",

  contentWrapper: (isOpen: boolean) =>
    `overflow-hidden transition-all duration-300 border-dashed border-2 w-[96%] border-[#ccc] dark:border-gray-600 rounded-xl lg:mx-3 mx-2 ${
      isOpen ? "opacity-100 max-h-[500px] my-5" : "opacity-0 max-h-0 border-0"
    }`,

  contentInner:
    "p-4.5 lg:text-[16px] text-[12px] text-gray-800 dark:text-gray-300",
};
