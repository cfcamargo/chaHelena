/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "purple" : "#CDB4DB",
        "pink" : "#FFC8DD",
        "pink-dark" : "#FFAFCC",
        "blue" : "#BDE0FE",
        "blue-dark" : "#A2D2FF",
      },
      fontFamily : {
        "cursive" : ["Ingrid Darling", "cursive"],
      }
    },
  },
  plugins: [],
}

