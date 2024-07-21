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
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".red-grad": {
          backgroundImage: "linear-gradient(to right, #ef4444, #b91c1c)",
          backgroundClip: "text",
          textFillColor: "transparent",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

export default config;
