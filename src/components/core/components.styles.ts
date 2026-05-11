export const componentsStyles = {
  // Modal.tsx
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
    mb-4 text-lg font-semibold
    text-[var(--foreground)]
  `,

  content: `
    text-[var(--muted-foreground)]
  `,
  // Table.tsx
  tableWrapper: `
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
    px-4 py-3 text-start font-semibold
    border-b border-[var(--table-row-border)]
    `,

  row: `
    border-b border-[var(--table-row-border)]
    transition-colors duration-300
    hover:bg-[var(--row-hover)]
    `,

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
  // Select.tsx
  selectWrapper: `
    relative w-full
    outline-none
    focus-visible:ring-2
    focus-visible:ring-blue-500
    focus-visible:rounded-xl
    `,

  selectTrigger: `
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

  selectArrow: `
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
    bg-black/30 dark:bg-white/20 outline-none
    `,

  optionSelected: `
    font-semibold
    `,
};
