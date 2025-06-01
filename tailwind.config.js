module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // this looks in all .js/.jsx/.ts/.tsx inside src
  ],
  theme: {
    extend: {
      fontFamily: {
        tino: ['"Tinos", serif'],
      },
      screens: {
        'max-365': { 'max': '365px' }, // Custom max-width breakpoint
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
    },
  },
  plugins: [],
}