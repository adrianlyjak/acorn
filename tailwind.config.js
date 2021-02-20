// const { colors } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.css", "./src/**/*.tsx"],
  theme: {
    extend: {
      listStyleType: {
        none: "none",
        roman: "lower-roman",
        alpha: "lower-alpha",
      },
      colors: {
        primary: colors.pink,
        warmgray: colors.warmGray,
      },
      fontFamily: {
        body: ["serif"],
        info: ["sans-serif"],
        display: ["serif"],
      },
    },
  },
  variants: {},
  plugins: [],
};
