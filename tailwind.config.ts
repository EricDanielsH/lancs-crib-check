import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./public/index.html",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
    },
  },
  plugins: [require("daisyui")],
};
export default config;
