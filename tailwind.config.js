/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode toggling
  theme: {
    extend: {
      colors: {
        dark: "#1E293B", // Background color
        card: "#0F172A", // Card background
        white: "#ffffff", // White text
        grayText: "#cfcfcf", // Light gray text
        borderGray: "#333333", // Border colors
        highlight: "#2563EB", // Teal accent color for buttons or highlights
        highlightHover: "#1D4ED8", //
        modalBackground: "#1e293b",

        // Light Theme Colors
        lightBackground: "#f9f9f9", // Light background
        lightCard: "#ffffff", // Light card background
        darkText: "#1f1f1f", // Dark text color for light theme
        lightBorder: "#d1d1d1", // Light border color
        lightHighlight: "#007bff", // Blue accent for buttons in light theme
        lightHighlightHover: "#0056b3" // Darker blue hover
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font
      },
      screens: {
        custom: "1270px",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

