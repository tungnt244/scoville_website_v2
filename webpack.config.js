var path = require('path');

module.exports = {
  entry: './client/app.js',

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public/javascripts/')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};