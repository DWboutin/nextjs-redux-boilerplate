// next.config.js
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');

module.exports = withSass({
  webpack(config, options) {
    config.plugins.push(new Dotenv({
      path: './variables.env',
    }));

    return config;
  },
});
