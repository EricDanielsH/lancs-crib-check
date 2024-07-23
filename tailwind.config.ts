import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

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
  darkMode: "media",
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    function({ addUtilities }: PluginAPI) {
      const newUtilities = {
        ".red-grad": {
          backgroundImage: "linear-gradient(to right, #ef4444, #b91c1c)",
          backgroundClip: "text",
          textFillColor: "transparent",
        },
      };
      // Use only the options supported by addUtilities
      addUtilities(newUtilities, {
        respectPrefix: false,
        respectImportant: false,
      });
    },
  ],
};

export default config;
