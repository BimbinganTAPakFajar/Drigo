/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        "gradient-pink": "#B06AB3",
        "gradient-blue": "#4568DC",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("flowbite/plugin"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
  },
};
