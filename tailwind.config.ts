import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "var(--color-brand-pink)",
          blue: "var(--color-brand-blue)",
          ink: "var(--color-brand-ink)",
        },
      },
      borderRadius: {
        pill: "var(--radius-pill)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },
    },
  },
  plugins: [],
};

export default config;
