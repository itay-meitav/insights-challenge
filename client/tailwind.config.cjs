/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    theme: {},
    extend: {
      screens: { mbp: { raw: "(max-width:430px)" } },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    require("tw-elements/dist/plugin"),
  ],
});
