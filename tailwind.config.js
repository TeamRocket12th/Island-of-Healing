/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './containers/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
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
      fontFamily: {
        'sans-tc': ['Noto Sans TC', 'sans-serif'],
        'serif-tc': ['Noto Serif TC', 'sans-serif']
      },
      screens: {
        '3xl': '1920px'
      },
      fontSize: {
        '3xl-plus': '32px',
        '4xl-plus': '40px'
      },
      colors: {
        primary: {
          DEFAULT: '#4E2A09',
          dark: '#3D1F03'
        },
        sand: {
          100: '#FAF9F3',
          200: '#EEEAE1',
          300: '#C1B6A4'
        },
        secondary: '#796959',
        assistant: '#9F816C',
        graydate: '#828282'
      }
    }
  },
  plugins: [require('daisyui')]
}
