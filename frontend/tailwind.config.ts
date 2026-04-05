import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Trebuchet MS"', '"Segoe UI"', "system-ui", "sans-serif"],
        display: ['"Bahnschrift"', '"Arial Narrow"', '"Trebuchet MS"', "sans-serif"],
      },
      colors: {
        smartgreen: {
          night: "#061311",
          forest: "#0f766e",
          neon: "#34d399",
          mist: "#d1fae5",
          alert: "#f59e0b",
          danger: "#ef4444"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(52, 211, 153, 0.25), 0 18px 60px rgba(16, 185, 129, 0.18)",
        soft: "0 24px 80px rgba(2, 6, 23, 0.55)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
