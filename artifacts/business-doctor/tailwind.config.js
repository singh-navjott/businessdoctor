/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0B3B5C', dark: '#082A42', light: '#154B73' },
        accent: { DEFAULT: '#F97316', hover: '#EA580C' },
        growth: { DEFAULT: '#0EA36B', light: '#E6F7EF' },
        neutral: {
          50: '#F8FAFB',
          100: '#F1F5F8',
          200: '#E4EAEF',
          600: '#5B6B7A',
          800: '#1E2A33',
          900: '#0F171D',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Sora', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 16px 40px rgba(11, 59, 92, 0.08)',
        'card-hover': '0 24px 54px rgba(11, 59, 92, 0.14)',
      },
    },
  },
  plugins: [],
};