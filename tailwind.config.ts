import typography from "@tailwindcss/typography";

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          50: "var(--color-navy-50)",
          100: "var(--color-navy-100)",
          200: "var(--color-navy-200)",
          300: "var(--color-navy-300)",
          400: "var(--color-navy-400)",
          500: "var(--color-navy-500)",
          600: "var(--color-navy-600)",
          700: "var(--color-navy-700)",
          800: "var(--color-navy-800)",
          900: "var(--color-navy-900)",
          950: "var(--color-navy-950)",
        },
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
        "soft-dark": "0 8px 30px rgba(0,0,0,0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      keyframes: {
        blink: {
          "0%, 50%, 100%": { opacity: "1", transform: "scale(1)" },
          "25%, 75%": { opacity: "0.3", transform: "scale(0.8)" },
        },
      },
      animation: {
        blink: "blink 0.8s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};
