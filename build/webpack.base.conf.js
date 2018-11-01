const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // Entry main JS
  entry: {
    app: './src/index.js'
  },
  // Output main JS
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist'
  },
  // Server
  devServer: {
    // Help message !!!
    overlay: true
  },
  module: {
    rules: [{
        /* Babel */
        test: /\.js$/,
        loader: 'babel-loader',
        // Prevent node_modules !!!
        exclude: '/node_modules/'
      }, {
        /* Stylus */
        test: /\.(css|styl)$/,
        // loader: 'style-loader!css-loader!postcss-loader!stylus-loader',
        loader: ExtractTextPlugin.extract(['css-loader', 'stylus-loader'])
      }
    ]
  },
  // Plugins
  plugins: [
    // Extract css
    new ExtractTextPlugin("styles.css"),
  ]
}
