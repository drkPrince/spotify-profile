module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
    	colors: {
    	spotify: '#1DB954',
        card: 'rgba(8, 8, 8, 0.8)',
    	}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
