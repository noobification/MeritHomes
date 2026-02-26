/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',     // Deep black
        foreground: '#ffffff',     // Stark white
        surface: '#171717',        // Slate gray
        accent: {
          DEFAULT: '#BC9B6A',      // Subtle gold/bronze
          hover: '#9E8155',
        },
        muted: '#525252',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
