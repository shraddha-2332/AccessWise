/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#10b981',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      }
    },
  },
  plugins: [],
}
