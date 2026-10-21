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
        },
      },
      fontFamily: {
        sans: ["var(--font-neue-haas)", "Neue Haas Grotesk Display Pro", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-neue-haas)", "Neue Haas Grotesk Display Pro", "system-ui", "-apple-system", "sans-serif"],
        neuehaas: ["Neue Haas Grotesk Display Pro", "sans-serif"],
        nacelle: ["Neue Haas Grotesk Display Pro", "sans-serif"],
        avantgarde: ["Neue Haas Grotesk Display Pro", "sans-serif"],
        typewriter: ["var(--font-typewriter)", "Courier New", "Courier", "monospace"],
        mono: ["var(--font-neue-haas)", "Neue Haas Grotesk Display Pro", "ui-monospace", "monospace"],
      },
      boxShadow: {
        solar: "0 0 45px rgba(250, 109, 11, 0.45)",
        card: "0 10px 30px rgba(0, 0, 0, 0.7)",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.04)' },
        },
        sheenSweep: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(260%) skewX(-20deg)' },
        },
        beaconDot: {
          '0%': { boxShadow: '0 0 0 0 rgba(250, 109, 11, 0.85)' },
          '70%': { boxShadow: '0 0 0 8px rgba(250, 109, 11, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(250, 109, 11, 0)' },
        },
        popInSpring: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        radarHalo: {
          '0%': { transform: 'scale(0.85)', opacity: '0.95' },
          '70%': { transform: 'scale(2.2)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        raceSpeedFlow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-48px)' },
        },
        raceSpeedFlowReverse: {
          '0%': { transform: 'translateY(-48px)' },
          '100%': { transform: 'translateY(0)' },
        },
        racePulseGlow: {
          '0%, 100%': { opacity: '0.55', filter: 'drop-shadow(0 0 3px rgba(250, 109, 11, 0.4))' },
          '50%': { opacity: '0.95', filter: 'drop-shadow(0 0 10px rgba(250, 109, 11, 0.9))' },
        },
        laserSweep: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '70%': { opacity: '0.6' },
          '100%': { transform: 'translateY(1000%)', opacity: '0' },
        },
        scrollPill: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '25%': { opacity: '1' },
          '75%': { transform: 'translateY(8px)', opacity: '1' },
          '100%': { transform: 'translateY(12px)', opacity: '0' },
        },
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-fast': 'marquee 20s linear infinite',
        'slide-up-fade': 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'sheen-sweep': 'sheenSweep 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'beacon-dot': 'beaconDot 2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'pop-in-spring': 'popInSpring 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'radar-halo': 'radarHalo 2.2s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'race-flow': 'raceSpeedFlow 2.5s linear infinite',
        'race-flow-fast': 'raceSpeedFlow 1.2s linear infinite',
        'race-flow-reverse': 'raceSpeedFlowReverse 2.5s linear infinite',
        'race-glow': 'racePulseGlow 2.5s ease-in-out infinite',
        'laser-sweep': 'laserSweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'scroll-pill': 'scrollPill 1.6s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
