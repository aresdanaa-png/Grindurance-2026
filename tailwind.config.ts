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
          base: "#0D0E11",        // Sleek athletic dark canvas
          surface: "#15171C",     // Deep athletic surface card
          surfaceHover: "#1D2027",
          border: "rgba(255, 255, 255, 0.12)",
          borderHover: "rgba(255, 255, 255, 0.24)",
          accent: "#FA6D0B",      // Exact GRINDURANCE Fiery Orange
          accentDark: "#DE5A00",
          muted: "#9CA3AF",       // Sleek contemporary grey
          light: "#F3F4F6",       // Crisp white
          // Aliases mapped cleanly
          dark: "#0D0E11",
          darker: "#08090A",
          card: "#15171C",
          cardHover: "#1D2027",
          gold: "#FA6D0B",
          orange: "#FA6D0B",
          sky: "#9CA3AF",
          green: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        nacelle: ["var(--font-nacelle)", "sans-serif"],
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        mono: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"], // Zero monospace: safely maps to sleek proportional sans
      },
      boxShadow: {
        solar: "0 0 45px rgba(250, 109, 11, 0.45)",
        card: "0 10px 30px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
