import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#faf7f3",
        ink: "#111111",
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "Archivo", "sans-serif"],
      },
      maxWidth: {
        page: "1180px",
        prose: "1080px",
      },
      borderRadius: {
        card: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
