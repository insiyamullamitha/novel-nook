/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCEDC6",
        darkerprimary: "#e2d5b2",
        secondary: "#99A660",
        accent1: "#CD6153",
        accent2: "#b48534",
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
  },
};
