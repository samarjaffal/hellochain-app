module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'white-opacity-70': 'rgba(255, 255, 255, 0.7)',
        'primary': "#4C3F91",
        'secondary': "#FF5677",
        'third': "#B958A5"
      }
    },
  },
  plugins: [],
}
