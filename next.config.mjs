import { default as withPWAInit } from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  output: "export",

  turbopack: {},
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
    webpackBuildWorker: true,
    turbo: false,
  },
};

export default withPWA(nextConfig);
