import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0A0F1D",
          darker: "#060913",
          card: "#121A2F",
          cardHover: "#182340",
          border: "#202C4B",
          gold: "#F59E0B",
          goldLight: "#FCD34D",
          orange: "#F97316",
          green: "#10B981",
          sky: "#38BDF8",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(245, 158, 11, 0.25)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
