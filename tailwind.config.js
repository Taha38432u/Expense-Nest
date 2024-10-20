/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Bai Jamjuree", "sans-serif"],
      },
      keyframes: {
        rotate: {
          to: {
            transform: "rotate(1turn)",
          },
        },
      },
      animation: {
        rotate: "rotate 1.5s infinite linear",
      },
    },
  },
  plugins: [],
};
