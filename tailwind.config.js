// const { colors } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const themeColors = {
  primary: {
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
  tertiary: {
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
  secondary: {
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
  neutral: colors.stone,
};

module.exports = {
  // purge: ["./src/**/*.css", "./src/**/*.tsx"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      listStyleType: {
        none: "none",
        roman: "lower-roman",
        alpha: "lower-alpha",
        circle: "circle",
      },
      colors: themeColors,
      fontFamily: {
        body: ["Charter", "Palatino", "Georgia", "serif"],
        mono: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "Menlo",
          "Consolas",
          "Monaco",
          "Liberation Mono",
          "monospace",
        ],
        display: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        info: [
          "JetBrains Mono",
          "IBM Plex Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderWidth: {
        16: "16px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
          },
        },
      },
    },
    variables: {
      DEFAULT: {
        colors: themeColors,
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@mertasan/tailwindcss-variables"),
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant("active-state", "&.active");
      addVariant("group-active-state", ":merge(.group).active &");
    }),
  ],
};
