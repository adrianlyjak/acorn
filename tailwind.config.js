// const { colors } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const customColors = {
  terracotta: {
    50: "#EDBC87",
    100: "#E5A361",
    200: "#D9873F",
    300: "#C77133",
    400: "#AD5925",
    500: "#93441A",
    600: "#763413",
    700: "#62290F",
    800: "#4B1C0B",
    900: "#3C1406",
  },
  sand: {
    50: "#FFFBEB",
    100: "#FCF5D9",
    200: "#F2EAC5",
    300: "#E9DDAA",
    400: "#DDCC88",
    500: "#BFA95A",
    600: "#A89043",
    700: "#8E752E",
    800: "#7A621F",
    900: "#654E20",
  },
  sage: {
    50: "#DFEDE8",
    100: "#D2E6DE",
    200: "#B7D7CB",
    300: "#9DC9B8",
    400: "#79B5A6",
    500: "#579E8C",
    600: "#437A69",
    700: "#31594F",
    800: "#24423D",
    900: "#1B3131",
  },
};

module.exports = {
  // purge: ["./src/**/*.css", "./src/**/*.tsx"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      listStyleType: {
        none: "none",
        roman: "lower-roman",
        alpha: "lower-alpha",
      },
      colors: {
        primary: customColors.terracotta,
        secondary: customColors.sage,
        tertiary: customColors.sand,
        gray: colors.stone,
        ...customColors,
      },
      fontFamily: {
        body: ["sans-serif"],
        info: ["sans-serif"],
        display: ["sans-serif"],
      },
      borderWidth: {
        16: "16px",
      },
    },
  },
  variants: {},
  safelist: Object.keys(customColors)
    .concat(["gray"])
    .map((name) => ({ pattern: new RegExp("bg-" + name) })),

  plugins: [],
};
