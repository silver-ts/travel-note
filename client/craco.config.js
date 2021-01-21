// Read more: https://tailwindcss.com/docs/guides/create-react-app#configure-tailwind-to-remove-unused-styles-in-production
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
