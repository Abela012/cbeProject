/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#85257C",
          light: "#B351A9",
          third: "#a21caf",
        },
        secondary: {
          dark: "#CDA352",
          light: "#E4CA86",
          third: "#fbbd20",
        },
        light: {
          gray: "#f1f1f1",
        },
        br: {
          gray: "#dddddd",
        },
        blacksh: "#10101094",
      },
    },
  },
  plugins: [],
};
