const { colors } = require("tailwindcss/defaultTheme");

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
