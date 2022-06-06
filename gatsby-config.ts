import path from "path";
import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {  
  siteMetadata: {
    title: "Adrian Lyjak",
    pageSize: 2,
  },
  plugins: [
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
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              
            }
          }
        ],
      },
    }
  ],
};
module.exports = config;
