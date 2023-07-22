/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js"],
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
};
