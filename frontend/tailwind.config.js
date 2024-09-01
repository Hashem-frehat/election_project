const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-rtl": "slide-rtl 20s linear infinite",
      },

      colors: {
        "jordan-red": "#CE1126",
        "jordan-green": "#007A3D",
        "jordan-black": "#000000",
        "jordan-white": "#FFFFFF",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
