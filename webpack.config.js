const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background/background.js',
    popup: './src/popup/popup.js',
    content: './src/content/content-script.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
