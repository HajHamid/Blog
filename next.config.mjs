import webpack from 'webpack';

export default {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ignore 'fs' module on the client-side
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^fs$/ })
      );
    }
    return config;
  },
};
