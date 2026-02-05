/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          100: '#dbeafe',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a5f',
        },
        'brand-yellow': {
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
    },
  },
  plugins: [],
}
