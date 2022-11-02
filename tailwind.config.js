/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,jsx,js,html}"],
  theme: {
    extend: {
      screens: {
        xs: "640px",
      },
    },
  },
  plugins: [],
};
