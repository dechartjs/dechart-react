const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const babelRc = require('../babel/.babelrc');
const paths = require('../../src/paths');

console.info('webpack configuration with NODE_ENV: %s', process.env.NODE_ENV);

module.exports = {
  entry: {
    app: [
      path.resolve(paths.examples, 'src/example.js'),
    ],
  },
  mode: process.env.NODE_ENV || 'development',
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
  output: {
    path: paths.docs,
    filename: '[name].[hash].js',
    publicPath: '',
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
