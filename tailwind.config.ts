import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "mta-black": "#1A1A1A",
        "mta-gold": "#D4A017",
        "mta-light-gold": "#F5D980",
        "mta-dark-gold": "#A07C10",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
