const path = require('path');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    return {
      ...config,
      output: {
        ...config.output,
        publicPath: '/',
        // publicPath: '/money/',
      },
    };
  },
};
