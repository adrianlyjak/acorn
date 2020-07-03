// redirects to the gatsby config directory and addstypescript support
module.exports = {
  siteMetadata: {
    title: "Gatsby Typescript Starter",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-ts-config",
      options: {
        configDir: "./gatsby",
      },
    },
  ],
};
