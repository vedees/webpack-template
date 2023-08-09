/* Development build:
  ========================================================================== */
const { merge } = require('webpack-merge')

// default config
const commonConfig = require('./webpack.common.js')

const devWebpackConfig = merge(commonConfig, {
  mode: 'development',
  // how source maps are generated
  devtool: 'inline-source-map',

  // spin up a server for quick development
  devServer: {
    compress: true,
    open: false,
    hot: true,
    port: 8084,
    client: {
      progress: false,
      overlay: {
        errors: false,
        warnings: false
      }
    },

    // fix CORS:
    historyApiFallback: true
  }
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})
