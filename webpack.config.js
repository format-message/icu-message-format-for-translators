var webpack = require('webpack')

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    index: [
      './lib/main.js'
    ]
  },
  module: {
    loaders: [],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: __dirname,
    publicPath: ''
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // please don't use IE8
        unsafe: true,
        warnings: false // don't puke warnings when you drop code
      },
      mangle: {
        screw_ie8: true
      }
    })
  ]
}
