/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primaryColor : "#266070",
        secondaryColor : "#11D7E0",
        greenLight : "#CEF7F1"
      }
    },

  },
  plugins: [],
}

