const path = require('path');


module.exports = {
  // Entry main JS
  entry: {
    app: './src/index.js'
  },
  // Output main JS
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  },
  // Server
  devServer: {
    // Help message !!!
    overlay: true
  },
  module: {
    rules: [
      {
        // Babel
        test: /\.js$/,
        loader: 'babel-loader',
        // Prevent node_modules !!!
        exclude: '/node_modules/'
      }
    ]
  }
}
