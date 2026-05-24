/* ---------------- Empty ---------------- */

export const emptyStyles = {
  wrapper: `
    rounded-2xl
    border border-[var(--table-border)]
    bg-[var(--table-bg)]
    backdrop-blur-xl
    shadow-[var(--shadow-soft)]
    overflow-hidden
    px-4 py-2 mt-16
  `,

  emptyWrapper: `
    bg-[var(--table-bg)]
    w-full h-40
    flex flex-col items-center gap-4 justify-center rounded-2xl
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
};
