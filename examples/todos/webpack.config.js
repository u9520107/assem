module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  }
};