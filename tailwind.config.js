/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html","./script/*.js"],
  theme: {
    extend: {
      spacing:{
        '120':'50rem'
      },
      colors:{
        "tymon":{1:"rgb(176, 180, 219)"}
      }
    },
  },
  plugins: [],
}