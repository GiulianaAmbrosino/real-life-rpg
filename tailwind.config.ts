import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#211D16",
        parchment: "#EDE6D6",
        parchmentDark: "#E1D7BE",
        moss: "#4F6F52",
        mossDark: "#3B5540",
        ember: "#C98A3D",
        emberDark: "#A96E29",
        plum: "#5B3A5C",
        rest: "#3C6E8F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "6px",
      },
    },
  },
  plugins: [],
};
export default config;
