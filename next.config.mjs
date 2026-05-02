// next.config.mjs
import { default as withPWAInit } from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
});

const nextConfig = {
  output: "export", // چون static deploy داری

  turbopack: {}, // اختیاری
  typedRoutes: true,
  trailingSlash: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    unoptimized: true,
  },

  experimental: {
    webpackBuildWorker: true, // فعال کردن اجرای webpack plugin‌ها
    turbo: false, // برای اطمینان از عدم غیرفعال شدن پلاگین PWA
  },
};

export default withPWA(nextConfig);
