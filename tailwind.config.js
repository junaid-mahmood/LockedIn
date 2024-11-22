/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        secondary: '#8b5cf6',
        background: {
          DEFAULT: '#f8fafc',
          light: '#f1f5f9',
          dark: '#e2e8f0',
          blue: '#eff6ff',
        },
        accent: {
          purple: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#22c55e',
        },
        text: {
          DEFAULT: '#334155',
          light: '#64748b',
          dark: '#1e293b',
        },
        border: {
          DEFAULT: '#e2e8f0',
          light: '#f1f5f9',
        }
      }
    },
  },
  plugins: [],
}




