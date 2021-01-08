require('@babel/polyfill');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    application: ['@babel/polyfill', './js/application.js'],
    'template.cart': ['@babel/polyfill', './js/templates/template.cart.js'],
    'template.product': ['@babel/polyfill', './js/templates/template.product.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

