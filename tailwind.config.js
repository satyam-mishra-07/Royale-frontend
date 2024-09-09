/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Italianno: ["Italianno", "cursive"],
        Suse: ["SUSE", "sans-serif"],
        Gilroy: ["Gilroy", "sans-serif"],
      },
      colors: {
        bgColor: '#FFF1DB', // Changed to your new color scheme
        navBg: '#00000047', // Keeping this as is
        btnColor1: '#FF7F50', // Keeping this as is
        btnColor2: '#2F4F4F', // Keeping this as is
        cardColor: '#FFF0F5', // Keeping this as is

        primaryColor: '#EF5A6F', // Changed to your new primary color
        secondaryColor: '#D4BDAC', // Changed to your new secondary color
        tertiaryColor: '#536493', // Changed to your new tertiary color
        tertiaryColor2: '#002379', // Keeping this as is
        tertiaryColor3: '#784a2f', // Keeping this as is
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
