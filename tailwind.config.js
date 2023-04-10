/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    gridTemplateColumns: {
      'auto-fill': 'repeat(auto-fill, 20rem)',
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
    themes: ['light', 'dark'],
  },
};
