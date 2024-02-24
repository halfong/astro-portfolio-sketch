const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      lineHeight: {
        '54': '54px',
      },
      colors: {
        'primary-600': '#FAE44C',
        'primary-400': '#FAE44C',

      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
};
