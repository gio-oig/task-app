import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#1a1a2e",
          50: "#f0f0f7",
          400: "#5555aa",
          500: "#1a1a2e",
          600: "#16162a",
        },
        cream: "#faf8f4",
        "warm-gray": "#8b8680",
      },
    },
  },
};

export default config;
