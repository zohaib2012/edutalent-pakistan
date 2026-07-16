/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A73E8',
          50: '#E8F0FE',
          100: '#D2E3FC',
          200: '#A8C9FA',
          300: '#7AAFF7',
          400: '#4C95F5',
          500: '#1A73E8',
          600: '#155CB6',
          700: '#104584',
          800: '#0A2E52',
          900: '#051729',
        },
        success: '#2ECC71',
        gold: '#F1C40F',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
