export const coreStyles = {
  // Headers.tsx
  headerBTN: `
    bg-(--surface)
    hover:bg-(--surface-hover)
    border border-(--border)
    px-2! md:px-4!
    text-blue-950!
    dark:text-white!
    font-medium
`,
  // ImportExportActions.tsx
  button: `
    p-2 rounded-xl cursor-pointer border
    bg-[var(--surface)]
    hover:bg-[var(--surface-hover)]
    border-[var(--border)]
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--navy-400)]
    transition-colors
  `,

  previewBox: `
    max-h-48 overflow-y-auto rounded-lg border p-3
    border-[var(--border)]
    bg-[var(--surface)]
  `,

  mutedText: `text-[var(--muted)] text-xs whitespace-nowrap`,
  mutedForeground: `text-[var(--muted-foreground)] text-xs mt-3`,

  warning: `text-[var(--warning)] text-xs `,

  buttonSuccess: `
    bg-[var(--success)]
    hover:bg-[var(--success-hover)]
    border-[var(--border)]
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--navy-400)]
    transition-colors
  `,
  buttonCancel: `
    bg-[var(--muted)]
    hover:bg-[var(--muted-foreground)]
    border-[var(--border)]
    focus:outline-none
    focus:ring-2
    focus:ring-[var(--navy-400)]
    transition-colors
  `,
  // CoreTable.tsx

  tableActionButton: (color: "danger" | "info" | "warning") => `
  flex items-center justify-center
  p-1.5 rounded-lg
  bg-[var(--surface)]
  hover:bg-[var(--surface-hover)]
  border border-[var(--border)]
  cursor-pointer
  transition-colors duration-200
  focus:outline-none
  focus:ring-2
  ${
    color === "danger"
      ? "focus:ring-red-500"
      : color === "info"
        ? "focus:ring-blue-500"
        : "focus:ring-yellow-500"
  }
`,

  tableDeleteIcon: `
    text-[var(--danger)]
    transition-colors
    `,
  tableViewIcon: `
    text-blue-500
    transition-colors
    `,
  tableEditIcon: `
    text-yellow-500
    transition-colors
    `,

  priorityHigh: `
    px-2 py-1 rounded-md text-xs font-semibold
    bg-[var(--priority-high-bg)]
    text-[var(--priority-high-text)]
    `,

  priorityMedium: `
    px-2 py-1 rounded-md text-xs font-semibold
    bg-[var(--priority-medium-bg)]
    text-[var(--priority-medium-text)]
    `,

  priorityLow: `
    px-2 py-1 rounded-md text-xs font-semibold
    bg-[var(--priority-low-bg)]
    text-[var(--priority-low-text)]
    `,

  progressCard: `
    mt-4 px-4 py-3 rounded-xl
    bg-[var(--card-bg)]
    backdrop-blur-md
    border border-[var(--card-border)]
    space-y-3
    `,

  progressLabel: `
    flex justify-between text-xs
    text-[var(--muted)] font-bold
    `,

  progressBarBg: `
    h-2 w-full rounded-full
    bg-[var(--progress-bg)]
    overflow-hidden
    `,
  //.............AuthForm.tsx
  page: `
    flex items-center justify-center
    min-h-screen
    dark:bg-neutral-900
    px-4
    `,

  card: `
    w-full max-w-sm
    rounded-2xl
    bg-[var(--modal-bg)]
    dark:bg-neutral-700/70
    shadow-xl 
    p-6
    animate-fade-in
    `,

  headerRow: `
    flex items-end justify-center
    relative
    `,

  backBtn: `
    absolute right-0 cursor-pointer
    text-lg
    text-[var(--muted-foreground)]
    dark:text-[var(--muted-foreground)]
    hover:text-[var(--foreground)]
    dark:hover:text-[var(--foreground)]
    transition
    `,

  header: `
    text-[22px] font-semibold
    text-[var(--foreground)]
    dark:text-[var(--foreground)]
    `,

  submitBtn: (disabled: boolean) =>
    `
    w-full mt-8
    transition
    ${
      disabled
        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    }
    `,
};
