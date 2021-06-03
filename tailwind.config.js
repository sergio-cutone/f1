module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'red-f1':'#e01224',
      },
      rotate: {
        '-270':'-270deg'
      },
      translate: {
        '-150': '-150%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
