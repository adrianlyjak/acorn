import path from "path";
import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Gatsby Acorn",
    foo: "bar",
  },
  plugins: [
    "gatsby-plugin-postcss", // for tailwind
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "pages",
    //     path: path.resolve(`${__dirname}/../content/posts/`),
    //   },
    // },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: path.resolve(`${__dirname}/../content/posts/`),
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
export default config;
