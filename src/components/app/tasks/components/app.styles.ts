/* ---------------- Headers ---------------- */
export const HeadersStyle = {
  headerBTN: `
    bg-(--surface)
    hover:bg-(--surface-hover)
    border border-(--border)
    px-2! md:px-4!
    text-blue-950!
    dark:text-white!
    font-medium
`,
};

/* ---------------- ImportExportActions ---------------- */
export const ImportExportActionsStyle = {
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
  primaryButton: `
  p-2 rounded-xl cursor-pointer
    bg-emerald-500/70
    hover:bg-emerald-500/50
    text-black!
    dark:text-white!
    border border-emerald-400/20
    backdrop-blur-md
    shadow-[0_0_12px_rgba(16,185,129,0.25)]
    hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]
    transition-all duration-200
    font-semibold
  `,
};

/* ---------------- AuthForm ---------------- */
export const AuthFormStyle = {
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
    w-full mt-8 font-bold
    transition
    ${
      disabled
        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    }
    `,
};

/* ---------------- CoreTable ---------------- */
export const CoreTableStyle = {
  tableActionButton: (color: "danger" | "info" | "warning") => `
  flex items-center justify-center
  p-1.5 rounded-lg
  bg-[var(--surface)]
  hover:bg-[var(--surface-hover)]
  border border-[var(--border)]
  cursor-pointer
  transition-colors duration-200
  focus:outline-none
  focus:ring-2 focus:ring-blue-500
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
  tableIconDisabled: `
    text-gray-400
    transition-colors
    `,

  priorityHigh: `
    px-1 py-1 rounded-md text-xs font-semibold
    bg-[var(--priority-high-bg)]
    text-[var(--priority-high-text)]
    `,

  priorityMedium: `
    px-1 py-1 rounded-md text-xs font-semibold
    bg-[var(--priority-medium-bg)]
    text-[var(--priority-medium-text)]
    `,

  priorityLow: `
    px-1 py-1 rounded-md text-xs font-semibold
    bg-[var(--priority-low-bg)]
    text-[var(--priority-low-text)]
    `,

  progressCard: `
    mt-4 px-2 py-3 rounded-2xl
    border border-[var(--table-border)]
    bg-[var(--table-bg)]
    backdrop-blur-md
    space-y-3
    mb-20
    `,

  progressLabel: `
    flex justify-between text-xs
    text-[var(--muted)] font-bold
    `,
  progressClose: `
    flex justify-center items-center text-xs
    absolute -top-4 right-[50%] translate-x-[50%]
    w-8 h-8 rounded-full
    bg-[var(--danger)]  cursor-pointer
    text-white shadow-[var(--modal-shadow)]
    `,

  progressBarBg: `
    h-2 w-full rounded-full
    bg-[var(--progress-bg)]
    overflow-hidden
    `,
  statusBTN: `
    bg-[var(--progress-bg)]
    hover:bg-(--surface-hover)
    border border-(--border)
    w-full mt-2
    text-blue-950!
    dark:text-white!
    font-bold
`,
};

/* ---------------- TaskActionsCell ---------------- */
export const TaskActionsCellStyles = {
  taskDelete: `
      flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600
      hover:bg-(--surface-hover)
      transition-colors cursor-pointer
    `,

  taskEdit: `
  flex w-full items-center gap-2 px-3 py-2 text-sm text-yellow-600
      hover:bg-(--surface-hover)
      transition-colors border-t-1 border-b-1 border-(--border) cursor-pointer
    `,

  taskView: `
  flex w-full items-center gap-2 px-3 py-2 text-sm text-blue-600
      hover:bg-(--surface-hover)
      transition-colors cursor-pointer
    `,

  tableActionButton: (color: "danger" | "info" | "warning") => `
    flex items-center justify-center
    p-1.5 rounded-lg
    bg-[var(--surface)]
    hover:bg-[var(--surface-hover)]
    border border-[var(--border)]
    cursor-pointer
    transition-colors duration-200
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
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
  tableIconDisabled: `
    text-gray-400
    transition-colors
    `,
};
