var webpack = require('webpack')

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    editor: [
      './lib/main.js'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: __dirname,
    publicPath: ''
  },
  devtool: 'source-map',
  mode: 'production'
}
