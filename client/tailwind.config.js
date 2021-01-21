// Read more: https://tailwindcss.com/docs/guides/create-react-app#configure-tailwind-to-remove-unused-styles-in-production
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
