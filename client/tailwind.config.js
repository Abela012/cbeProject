/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a21caf",
        secondary: "#fbbd20",
        light: {
          gray: "#f1f1f1",
        },
      },
    },
  },
  plugins: [],
};
