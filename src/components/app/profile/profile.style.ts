export const profileStyles = {
  pageWrapper: "p-3 max-w-3xl mx-auto",
  card: "p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-10 transition-all",

  // بخش پروفایل
  headerFlex: "flex items-center gap-6 mt-8",
  avatar:
    "w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-inner",
  infoWrapper: "flex flex-col gap-1",
  nameText: "text-2xl font-extrabold text-gray-900 dark:text-white",
  emailText: "text-gray-500 dark:text-gray-400 font-medium",

  // بخش دکمه‌ها و عملیات
  actionSection: "mt-8 border-t border-gray-100 dark:border-gray-700 pt-6",
  logoutBtn:
    "text-sm text-red-600 hover:text-red-800 font-semibold underline cursor-pointer",

  // دکمه ورود (برای حالتی که کاربر لاگین نیست)
  signInBtn: `
    bg-emerald-500/40 hover:bg-emerald-500/30
    text-(--muted-foreground)! dark:text-emerald-200!
    border border-emerald-400/20 backdrop-blur-md
    shadow-[0_0_12px_rgba(16,185,129,0.25)] hover:shadow-[0_0_18px_rgba(16,185,129,0.35)]
    transition-all duration-200 font-semibold px-4 py-2 rounded-lg cursor-pointer
  `,
  emptyStateWrapper: "flex justify-center",
};
