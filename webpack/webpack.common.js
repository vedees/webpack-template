/* Base config:
  ========================================================================== */
const path = require('path')

//
const defines = require('./webpack-defines')

// copy files from dev (i.g. `assets/img/*`) to dist (i.g `static/img/*`)
const CopyWebpackPlugin = require('copy-webpack-plugin')
// extract css from js to another files
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// html support
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Main const
const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist2'),
  public: path.join(__dirname, '../public'),
  assets: 'assets/'
}

const isDev = process.env.NODE_ENV !== 'production'

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = paths.src
// const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

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
  resolve: {
    alias: {
      '@': defines.src
    }
  },
  plugins: [
    // html
    new HtmlWebpackPlugin({
      title: 'My app',
      // favicon: paths.src + '/assets/icons/favicon.png',
      // template file
      template: defines.public + '/index.html',
      // output file
      filename: 'index.html'
    }),

    // Extract css from js (it's a basic setup to keep css in `css` folder)
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: `${defines.assets}/css/[name].css`,
      chunkFilename: '[id].css'
    }),

    // Copies files from target to destination folder
    // PS: do not pass const to the `to` key
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
      // no need since I use `tsconfig` or `jsconfig`
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}
