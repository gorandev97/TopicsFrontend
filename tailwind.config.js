// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#276BEC", // You can name it anything like custom-blue
        "text-gray": "#585858",
        "light-blue": "#B2DFDB",
        "blue-hover": "#1B4BA5",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@codaworks/react-glow/tailwind"),
  ],
};
