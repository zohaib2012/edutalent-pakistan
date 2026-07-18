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
        secondary: {
          DEFAULT: '#0D47A1',
          50: '#E3EDFB',
          100: '#B8D1F4',
          200: '#8AB5ED',
          300: '#5C99E6',
          400: '#2E7DDF',
          500: '#0D47A1',
          600: '#0A3982',
          700: '#072B63',
          800: '#051D44',
          900: '#020E25',
        },
        success: '#2ECC71',
        gold: {
          DEFAULT: '#F1C40F',
          50: '#FEF9E0',
          100: '#FDF1B3',
          200: '#FBE983',
          300: '#F9E547',
          400: '#F7D94A',
          500: '#F1C40F',
          600: '#D4A90A',
          700: '#B78E06',
          800: '#9A7304',
          900: '#7D5802',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
