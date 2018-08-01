const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
      filename: "main.js",
      path: path.resolve(__dirname, "public/dist")
  },
  node: {
      fs: "empty",
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  },
  performance: { hints: false },
  mode: process.env.NODE_ENV
};
