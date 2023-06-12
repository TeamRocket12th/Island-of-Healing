/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        sm: '0.75rem',
        lg: '0.75rem',
        xl: '0.75rem',
        '2xl': '0.75rem',
        '3xl': '18.75rem'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px'
      }
    },
    extend: {
      screens: {
        '3xl': '1920px'
      }
    }
  },
  plugins: [require('daisyui')],
  content: [
    './components/**/*.{vue,js,ts}',
    './containers/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ]
}
