module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
    	colors: {
    	  spotify: '#1DB954',
        card: 'rgba(9, 9, 9, 0.9)',
    	}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
