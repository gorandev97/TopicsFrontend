// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#276BEC", // You can name it anything like custom-blue
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@codaworks/react-glow/tailwind"),
  ],
};
