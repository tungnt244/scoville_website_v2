var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
  entry: './client/App.js',

  output: {
    filename: 'App.js',
    path: path.join(__dirname, 'public/javascripts/')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use:'css-loader'
        })
      },
    ]
  }
};