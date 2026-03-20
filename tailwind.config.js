/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C76B',
          dark: '#B5952F',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blink-name': 'blink-name 1.5s infinite linear',
        'blink-yellow': 'blink-yellow 1s infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
      },
      keyframes: {
        'blink-name': {
          '0%, 100%': { color: '#D4AF37' },
          '33%': { color: '#FFFF00' },
          '66%': { color: '#FFFFFF' },
        },
        'blink-yellow': {
          '0%, 100%': { color: '#D4AF37' },
          '50%': { color: '#FFFF00' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
