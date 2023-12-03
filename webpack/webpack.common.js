/* Base config:
  ========================================================================== */

//
const defines = require('./webpack-defines')
const pages = require('./webpack-pages')

// copy files from dev (i.g. `assets/img/*`) to dist (i.g `static/img/*`)
const CopyWebpackPlugin = require('copy-webpack-plugin')
// extract css from js to another files
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// html support
const HtmlWebpackPlugin = require('html-webpack-plugin')

// helpers:
// I want one rule for development and production, so I use `isDev` to check the process
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: `${defines.src}/index.ts`
    // another app example:
    // auth: `${defines.src}/_auth/index.ts`
  },
  output: {
    path: defines.dist,
    // if you need hash:
    // filename: `${defines.assets}js/[name].[contenthash].js`
    // if you don't need hash:
    filename: `${defines.assets}js/[name].js`
  },

  // optimization (chunks)
  optimization: {
    chunkIds: 'named',
    mergeDuplicateChunks: true,

    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          name: 'vendors', // or comment name to make chunks works
          chunks: 'all',
          // the way to keep kit in the vendors
          test: /[\\/]node_modules[\\/]|[\\/]ui-kit[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
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
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
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

    // can be manually (one by one):
    // new HtmlWebpackPlugin({
    //   title: 'Home page',
    //   favicon: defines.src + '/shared/misc/favicon.ico',
    //   template: defines.public + '/index.html',
    //   filename: 'index.html' // output file
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'About page',
    //   favicon: defines.src + '/shared/misc/favicon.ico',
    //   template: defines.public + '/about.html',
    //   filename: 'about.html' // output file
    // }),

    // or by config (from `webpack-pages.js`):
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          title: page.title,
          template: defines.public + '/' + page.template,
          filename: page.filename,
          // default:
          favicon: defines.src + '/shared/misc/favicon.ico'
        })
    ),

    // extract css from js / ts files (it's a basic setup to keep css in `css` folder)
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      // if you need hash:
      // filename: `${defines.assets}css/[name].[contenthash].css`,
      // if you don't need hash:
      filename: `${defines.assets}css/[name].css`,
      chunkFilename: '[id].css'
    }),

    // copy files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        // `shared/img` to `dist/static/img`
        {
          from: `${defines.src}/shared/img`,
          to: `${defines.dist}/${defines.static}/img`
        },

        // others:
        // `shared/fonts` to `dist/static/fonts`
        // {
        //   from: `${defines.src}/shared/fonts`,
        //   to: `${defines.dist}/${defines.static}/fonts`
        // },

        // misc
        // `shared/misc` to `dist/`
        {
          from: `${defines.src}/shared/misc`,
          to: `${defines.dist}`
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
