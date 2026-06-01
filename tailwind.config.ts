import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        mist: "#eef4f6",
        sage: "#8aa69b",
        coral: "#e26d5a",
        amber: "#f2bd60"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 32, 38, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
