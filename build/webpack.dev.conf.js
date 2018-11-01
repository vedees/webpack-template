const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV SETTINGS

  // Source map
  devtool: 'eval-soucemap'

});

module.exports = new Promise((resolve, reject) => {

resolve(devWebpackConfig)
})
