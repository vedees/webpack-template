/* Production build:
  ========================================================================== */
const { merge } = require('webpack-merge')
const defines = require('./webpack-defines')

// plugins for production build only:
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// default config
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    path: defines.dist
  },
  plugins: [
    // compress example:
    // new CompressionPlugin({
    //   exclude: /\/static/,
    // }),
  ],
  module: {
    rules: []
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new JsonMinimizerPlugin(),
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          // no ie please!
          // targets: { ie: 11 },
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  }
})
