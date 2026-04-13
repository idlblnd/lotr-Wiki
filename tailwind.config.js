/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lotr: ["Cinzel", "serif"],
        display: ["Cinzel", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(251, 191, 36, 0.22)",
        panel: "0 20px 60px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.06) 35%, transparent 70%)",
      },
      letterSpacing: {
        epic: "0.16em",
      },
    },
  },
  plugins: [],
};
