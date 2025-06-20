import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    // extend: {
    //   colors: {
    //     primary: '#2e1ad9',   // Deep blue from the left side
    //     accent: '#d4f365',    // Bright lime from the right side
    //   }
    // },
  },
  plugins: [],
};

export default config;
