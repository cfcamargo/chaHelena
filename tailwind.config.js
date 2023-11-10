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
      },
      backgroundImage: {
        'nuvens' : "url('/bg.jpg')",
      },
      screens: {
        'xs': '360px',

        'sm': '640px',

        'md': '768px',

        'lg': '1024px',

        'xl': '1280px',

        '2xl': '1536px',
    }
    },
  },
  plugins: [],
}

