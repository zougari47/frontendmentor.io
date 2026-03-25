/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    fontFamily: {
      barlow: ['Barlow Condensed', 'sans-serif'],
      bellefair: ['Bellefair', 'sans-serif'],
    },
    colors: {
      dark: '#0B0D17',
      'light-blueish-gray': '#D0D6F9',
      white: '#FFFFFF',
      transparent: 'transparent', // NOTE May delete it later
    },
    extend: {
      animation: {
        'fade-in': 'fade-in 1s forwards',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
}
