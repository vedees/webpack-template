/* Base config:
  ========================================================================== */

//
const defines = require('./webpack-defines')

// copy files from dev (i.g. `assets/img/*`) to dist (i.g `static/img/*`)
const CopyWebpackPlugin = require('copy-webpack-plugin')
// extract css from js to another files
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// html support
const HtmlWebpackPlugin = require('html-webpack-plugin')

// helpers:
// I want one rule for development and production I use `isDev` to check the process
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: `${defines.src}/index.ts`
  },
  output: {
    path: defines.dist,
    filename: `${defines.assets}js/[name].[contenthash].js`
  },
  module: {
    rules: [
      // js(x) & ts(x)
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',

          options: {
            // react-refresh example:
            // plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean)
          }
        }
      },

      // sass & css
      {
        test: /\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // add more postcss plugins here
                    // ...

                    // https://www.npmjs.com/package/postcss-preset-env
                    // it's including autoprefixer by default (config is in `package.json`)
                    // pass `autoprefixer: false` to disable autoprefixer
                    'postcss-preset-env'
                  ]
                ],
                postcssOptions: {
                  parser: 'postcss-js'
                },
                execute: true
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },

      // svg in js(x) & ts(x)
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          // https://react-svgr.com/docs/webpack/
          '@svgr/webpack'
        ]
      },

      // fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },

      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    // html pages:
    new HtmlWebpackPlugin({
      title: 'My app',
      favicon: defines.src + '/shared/misc/favicon.ico',
      template: defines.public + '/index.html',
      filename: 'index.html' // output file
    }),

    // extract css from js / ts files (it's a basic setup to keep css in `css` folder)
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: `${defines.assets}/css/[name].css`,
      chunkFilename: '[id].css'
    }),

    // copy files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        // `shared/img` to `dist/static/img`
        {
          from: `${defines.src}/shared/img`,
          to: `${defines.dist}/${defines.static}`
        },

        // others:
        // `shared/fonts` to `dist/static/fonts`
        // {
        //   from: `${defines.src}/shared/fonts`,
        //   to: `${defines.dist}/${defines.static}`
        // },

        // misc
        // `shared/misc` to `dist/`
        {
          from: `${defines.src}/shared/img`,
          to: `${defines.dist}/${defines.static}`
        }
      ]
    })
  ],

  resolve: {
    alias: {
      // no need since I use `tsconfig` & `jsconfig`
      // '@': defines.src
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}
