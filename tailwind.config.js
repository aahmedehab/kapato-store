/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-30": "var(--primary-30)",
        "primary-80": "var(--primary-80)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        "secondary-20": "var(--secondary-20)",
        "secondary-60": "var(--secondary-60)",
        "secondary-70": "var(--secondary-70)",
        "secondary-80": "var(--secondary-80)",
        "secondary-90": "var(--secondary-90)",
        "secondary-hover": "var(--secondary-hover)",
      },
    },
  },
  plugins: [],
};