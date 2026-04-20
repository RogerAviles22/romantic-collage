/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        romantic: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        rose: {
          soft: '#FFD6D6',
          deep: '#C0396B',
          blush: '#FF6B9D',
          dark: '#8B1A4A',
        },
        plum: '#4A1942',
        champagne: '#F9E4B7',
      },
      animation: {
        'float-slow': 'floatUp 8s ease-in-out infinite',
        'float-medium': 'floatUp 6s ease-in-out infinite',
        'float-fast': 'floatUp 4s ease-in-out infinite',
        'heart-rise': 'heartRise 6s ease-in infinite',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        heartRise: {
          '0%': { transform: 'translateY(100vh) scale(0.5)', opacity: '0.8' },
          '100%': { transform: 'translateY(-100px) scale(1.5)', opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(120px, -60px)' },
          '50%': { transform: 'translate(-80px, 80px)' },
          '75%': { transform: 'translate(60px, 40px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}
