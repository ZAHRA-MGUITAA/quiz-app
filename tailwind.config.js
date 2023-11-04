/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#000000",
        secondaryColor: "rgb(209 213 219)",
        greenLight: "#CEF7F1",
      },
    },
  },
  plugins: [],
};
