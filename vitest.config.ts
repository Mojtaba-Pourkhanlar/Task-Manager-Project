import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom", // شبیه‌سازی محیط مرورگر
    globals: true, // فعال کردن توابعی مثل describe, test, expect بدون نیاز به import مداوم
    setupFiles: "./src/utils/vitest-setup.ts", // فایلی که قبل از هر تست اجرا می‌شه
  },
});
