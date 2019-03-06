const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ["babel-polyfill", './src/index.jsx'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                `${__dirname}/sass/_resources.scss`,
              ],
            },
          },
        ],
      },
    ],
  },
  performance: { hints: false },
  mode: process.env.NODE_ENV,
  plugins: [
    new Dotenv(),
  ],
};
