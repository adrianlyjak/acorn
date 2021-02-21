// const { colors } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const customColors = {
  terracotta: {
    50: "#F4DBD4",
    100: "#F1D1C8",
    200: "#EBBCB0",
    300: "#E5A797",
    400: "#DF937F",
    500: "#D97E66",
    600: "#D05F41",
    700: "#B64A2D",
    800: "#913B24",
    900: "#6C2C1B",
  },
  neutral: {
    50: "#fbf7e5",
    100: "#f4efd7",
    200: "#ece4c1",
    300: "#e5daae",
    400: "#d6cda3",
    500: "#c4b98d",
    600: "#a99f7e",
    700: "#8e856b",
    800: "#776e55",
    900: "#595142",
  },
  warm: {
    50: "#fbf7e5ff",
    100: "#f9f1cdff",
    200: "#f5e6a9ff",
    300: "#f5da7aff",
    400: "#f9cc5bff",
    500: "#ecb229ff",
    600: "#d59a11ff",
    700: "#c08527ff",
    800: "#aa6c08ff",
    900: "#894b07ff",
  },
};

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
        primary: customColors.terracotta,
        gray: customColors.neutral,
        warmgray: colors.warmGray,
        amber: colors.amber,
        ...customColors,
      },
      fontFamily: {
        body: ["sans-serif"],
        info: ["sans-serif"],
        display: ["sans-serif"],
      },
      borderWidth: {
        "16": "16px",
      },
    },
  },
  variants: {},
  plugins: [],
};
