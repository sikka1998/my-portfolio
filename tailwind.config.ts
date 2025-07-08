import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "header-gradient": `linear-gradient(to right, #2e1ad9 67.5%, #d4f365 32.5%)`,
      },
    },
  },
  plugins: [],
};

export default config;
