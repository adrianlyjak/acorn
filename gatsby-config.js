// redirects to the gatsby config directory and addstypescript support
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-ts-config",
      options: {
        configDir: "./gatsby",
      },
    },
  ],
};
