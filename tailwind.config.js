/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bgDanger: '#ff0055',
        heading: '#1E2022',
        subtitle: '#989090',
        background: '#ffffff',
        logo: '#CF2D2D',
        stroke: '#B0BABF',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.5rem',
      },
    },
  },
  plugins: [],
};
