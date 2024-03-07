/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: ["Raleway", "sans-serif"],
      comfortaa: ["Comfortaa", "sans-serif"],
    },
    extend: {
      colors: {
        info: "#2F80ED",
        success: "#27AE60",
        warning: "#F3C947",
        error: "#CD0C0C",
        "primary-blue": "#0072FF",
        "primary-blue-hover": "#0094FF",
        "primary-blue-pressed": "#005BCC",
        "primary-rich-black": "#061425",
        black: {
          100: "#000000",
          200: "#1D1D1D",
          300: "#282828",
        },
        grey: {
          100: "#333333",
          200: "#4F4F4F",
          300: "#828282",
          400: "#BDBDBD",
          500: "#E0E0E0",
          600: "#F6F6F6",
          700: "#808080",
        },
        backgray: "#EFEFEF",
      },
      backgroundImage: (theme) => ({
        "primary-Linear-Gradient": "linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)",
        "primary-Linear-Gradient-hover": "linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)",
        "primary-Linear-Gradient-pressed": "linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(90deg, #00C6FF 0%, #0072FF 100%)",
      })
    },
  },
  plugins: [],
}