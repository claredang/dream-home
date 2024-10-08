/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#30AF5B",
          90: "#292C27",
        },
        gray: {
          10: "#EEEEEE",
          20: "#A2A2A2",
          30: "#7B7B7B",
          50: "#585858",
          90: "#141414",
        },
        orange: {
          30: "#e88630",
          50: "#FF814C",
        },
        blue: {
          70: "#021639",
          100: "#26456d",
        },
        yellow: {
          50: "#fcf8a8",
          100: "#fad480",
          200: "#FEC601",
        },
        beige: {
          50: "#F3F0EB",
          70: "#f5e8dd",
        },
      },
      backgroundImage: {
        "bg-img-1": "url('/img-1.png')",
        "bg-img-2": "url('/img-2.png')",
        "home-cover-1": "url('/home-cover-1.jpg')",
        "home-cover-2": "url('/home-cover-2.jpg')",
        "home-cover-3": "url('/home-cover-3.jpg')",
        "feature-bg": "url('/feature-bg.png')",
        pattern: "url('/pattern.png')",
        "pattern-2": "url('/pattern-bg.png')",
        "pattern-3": "url('/img8.jpg')",
      },
      screens: {
        xs: "400px",
        "3xl": "1680px",
        "4xl": "2200px",
      },
      maxWidth: {
        "10xl": "1512px",
      },
      borderRadius: {
        "5xl": "40px",
      },
    },
  },
  plugins: [],
};
