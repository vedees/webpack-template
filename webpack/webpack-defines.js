// real paths to the dirs

const path = require('path')

const dirs = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  public: path.join(__dirname, '../public')
}

const subDirs = {
  // sub folder for css / js
  // i.g. `dist/assets/css/` & dist/assets/js/
  assets: 'assets/',

  // sub folder for shared images, etc.
  // i.g. `dist/static/img/` & `dist/static/fonts/`
  static: 'static/'
}

module.exports = {
  ...dirs,
  ...subDirs
}
