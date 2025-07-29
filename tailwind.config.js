export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      textShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '0 3px 6px rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        outline: '0 0 5px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        '.text-shadow-sm': { textShadow: theme('textShadow.sm') },
        '.text-shadow': { textShadow: theme('textShadow.DEFAULT') },
        '.text-shadow-lg': { textShadow: theme('textShadow.lg') },
      });
    },
  ],
};
