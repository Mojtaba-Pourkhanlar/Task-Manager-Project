import typography from "@tailwindcss/typography";

module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        yekan: ["var(--font-yekanBakh)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "var(--navy-50)",
          100: "var(--navy-100)",
          200: "var(--navy-200)",
          300: "var(--navy-300)",
          400: "var(--navy-400)",
          500: "var(--navy-500)",
          600: "var(--navy-600)",
          700: "var(--navy-700)",
          800: "var(--navy-800)",
          900: "var(--navy-900)",
          950: "var(--navy-950)",
        },
      },
    },
  },
  plugins: [typography],
};
