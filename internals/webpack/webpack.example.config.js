const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const babelRc = require('../babel/.babelrc');
const paths = require('../../src/paths');

module.exports = {
  entry: {
    app: [
      path.resolve(paths.examples, 'src/example.js'),
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelRc,
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.webpack, 'index.html'),
    }),
  ],
  resolve: {
    extensions: [
      '.js', 
      '.jsx',
      '.ts',
      '.tsx',
    ],
  },
  target: 'web',
};
