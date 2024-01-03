/** @type {import('tailwindcss').Config} */
export default {
  content: ['./docs/**/*.{html,js,vue,ts,md}', './docs/.vitepress/**/*.{html,js,vue,ts,md}'],
  theme: {
    colors: {
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db'
    },
    extend: {}
  },
  plugins: []
}
