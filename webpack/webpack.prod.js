/* Production build:
  ========================================================================== */
const { merge } = require('webpack-merge')

// default config
const commonConfig = require('./webpack.common.js')

const buildWebpackConfig = merge(commonConfig, {
  mode: 'production',
  plugins: []
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})
