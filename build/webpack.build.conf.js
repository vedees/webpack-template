const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD SETTINGS

  // Source map
  // devtool: 'eval-soucemap'
});

module.exports = new Promise((resolve, reject) => {

resolve(buildWebpackConfig)
})
