/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/*.html","./script/*.js"],
  theme: {
    extend: {
      spacing:{
        '120':'50rem'
      }
    },
  },
  plugins: [],
}