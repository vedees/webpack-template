const path = require('path');


module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  },
  devServer: {
    // Help message
    overlay: true
  }
}
