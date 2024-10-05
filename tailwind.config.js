/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ds-blue': '#0F2942',
        'md-blue': '#176FB2',
        'bs': '#3498DB',
        'lp-blue': '#C1DFF6',
        'vl-blue': '#F2F8FD',
        'vd-grey': '#1D1D1F',
        'md-grey': '#666A6D',
        'white': '#FFFFFF',  // Add comma here
        'green': '#00FF00',
        'yellow': '#FFFF00'
      }
    },
  },
  plugins: [],
}
