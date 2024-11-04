// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // You can add custom colors here
        'purple': {
          300: '#C8ACD6',
        },
        'gray': {
          700: '#433D8B',
          800: '#2E236C',
          900: '#17153B',
        }
      },
    },
  },
  plugins: [],
}