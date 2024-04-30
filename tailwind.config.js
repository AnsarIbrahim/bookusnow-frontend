/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        heading: '#1E2022',
        subtitle: '#989090',
        background: '#ffffff',
        logo: '#CF2D2D',
        stroke: '#B0BABF',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
