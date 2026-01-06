/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kaist-blue': '#004098',
        'kaist-light-blue': '#0066CC',
        'kaist-red': '#E31937',
      },
    },
  },
  plugins: [],
}
