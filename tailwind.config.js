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
        "primary-10": "var(--primary-10)",
        "primary-20": "var(--primary-20)",
        "primary-30": "var(--primary-30)",
        "primary-40": "var(--primary-40)",
        "primary-50": "var(--primary-50)",
        "primary-60": "var(--primary-60)",
        "primary-70": "var(--primary-70)",
        "primary-80": "var(--primary-80)",
        "primary-90": "var(--primary-90)",
        "primary-dark": "var(--primary-dark)",
        secondary: "var(--secondary)",
        "secondary-10": "var(--secondary-10)",
        "secondary-20": "var(--secondary-20)",
        "secondary-30": "var(--secondary-30)",
        "secondary-40": "var(--secondary-40)",
        "secondary-50": "var(--secondary-50)",
        "secondary-60": "var(--secondary-60)",
        "secondary-70": "var(--secondary-70)",
        "secondary-80": "var(--secondary-80)",
        "secondary-90": "var(--secondary-90)",
        "secondary-dark": "var(--secondary-dark)",
      },
    },
  },
  plugins: [],
};