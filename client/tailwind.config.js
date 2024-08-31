/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  themes: [
    {
      mytheme: {
      
"primary": "#001fff",
      
"secondary": "#d69f00",
      
"accent": "#00c1a7",
      
"neutral": "#100703",
      
"base-100": "#f0fff9",
      
"info": "#00c1ff",
      
"success": "#00c562",
      
"warning": "#c78a00",
      
"error": "#ff93a4",
      },
    },
  ],
  plugins: [require("daisyui")],
};
