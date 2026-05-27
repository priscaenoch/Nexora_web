import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef4ff",
          100: "#d9e7ff",
          200: "#bcd3ff",
          300: "#8eb5fe",
          400: "#598afc",
          500: "#3461f9",
          600: "#1d3ef0",
          700: "#1730dd",
          800: "#1928b3",
          900: "#1a278d",
          950: "#141856",
        },
        secondary: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde58a",
          300: "#fcd14e",
          400: "#fbbb25",
          500: "#f59d0b",
          600: "#d97706",
          700: "#b45309",
          800: "#923f09",
          900: "#78340f",
          950: "#451a03",
        },
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "stellar-gradient": "linear-gradient(135deg, #3461f9 0%, #8b5cf6 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
