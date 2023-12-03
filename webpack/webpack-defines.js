const path = require('path')

const dirs = {
  // path to the Src dir
  src: path.join(__dirname, '../src'),
  // path to the Output dir
  dist: path.join(__dirname, '../dist'),
  // path to your html files
  public: path.join(__dirname, '../public')
}

const subDirs = {
  // path to Output sub dir (js, css, fonts, etc.)
  // i.g. `dist/assets/css/` & dist/assets/js/
  assets: 'assets/',

  // path to Output sub dir (img, icons, etc.)
  // i.g. `dist/static/img/` & `dist/static/fonts/`
  static: 'static/'
}

module.exports = {
  ...dirs,
  ...subDirs
}
