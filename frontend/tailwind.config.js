/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCEDC6",
        darkerprimary: "#e2d5b2",
        secondary: "#99A660",
        accent1: "#C94C4C",
        accent2: "#7F8942",
        accent3: "#466060",
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
  },
};
