/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        'primary': '#E75C62',
        'black': '#1C1C1C',
        'custom': '#3c4858',
      },
      gridTemplateColumns: {
        'chapter-grid': 'auto 150px',
      },
      boxShadow: {
        'primaryButton': '0 0 24px -6px #E75C62',
      },
    },
  },
  plugins: [],
}