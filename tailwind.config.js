/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Asegúrate de incluir este si usas Vite
    "./src/**/*.{js,jsx,ts,tsx}", // Todas las rutas de tus componentes React
  ],
  theme: {
    extend: {},
    screens: {
      xs: "390px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
