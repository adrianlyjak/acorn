const path = require("path");

const config = {
  siteMetadata: {
    title: "Homecraft: Life is Art",
    pageSize: 24,
  },
  plugins: [
    // redirects to the gatsby config directory and addstypescript support
    {
      resolve: "gatsby-plugin-ts-config",
      options: {
        configDir: "./gatsby",
      },
    },
    "gatsby-plugin-postcss", // for tailwind
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.resolve(`${__dirname}/content/`),
      },
    },

    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 768,
            },
          },
        ],
      },
    },
  ],
};
module.exports = config;
