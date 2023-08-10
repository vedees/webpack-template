/* Production build:
  ========================================================================== */
const { merge } = require('webpack-merge')

// default config
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: []
})
