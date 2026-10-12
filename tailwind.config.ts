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
          base: "#0B0C0E",        // Volcanic Slate Canvas
          surface: "#131518",     // Structured Surface Panel
          surfaceHover: "#1B1E22",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.16)",
          accent: "#D97706",      // Single Signature Solar Ochre
          accentLight: "#F59E0B",
          accentDark: "#B45309",
          muted: "#7A818C",       // Muted Technical Slate
          light: "#F4F5F6",       // Crisp Chalk White
          // Backward-compat aliases mapped strictly to disciplined palette
          dark: "#0B0C0E",
          darker: "#060708",
          card: "#131518",
          cardHover: "#1B1E22",
          gold: "#D97706",
          orange: "#D97706",
          sky: "#9CA3AF",
          green: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        solar: "0 0 35px rgba(217, 119, 6, 0.22)",
        subtle: "0 10px 40px rgba(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
