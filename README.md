<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack work template</h1>
  <p>
    Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  </p>
  <p>Author: <a href="https://github.com/vedees/" target="_blank">Vedees</a> | <a href="https://www.youtube.com/playlist?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV" target="_blank">Youtube guide (ru)</a></p>
</div>

## Features:

- separated configs for `dev` and `prod`
- `typescript / javascript` full support
- `sass / css` full support
- full babel & postcss setup
- 0 dependencies
- the best optimization for your production
- easy webpack and babel customization

Everybody knows that developing runs on coffee! Thanks for your support!

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

## Build Setup:

```bash
# Download repository:
git clone https://github.com/vedees/webpack-template webpack-template

# Go to the app:
cd webpack-template

# Install dependencies:
# npm install
# or:
yarn

# Server with hot reload at http://localhost:8084/
# npm run start
# or:
yarn start

# Output will be at dist/ folder
# npm run build
# or:
yarn build
```

## Project Structure:

- `public/*.html` - HTML files
- `src/app` - core app
- `src/shared` - shared files
- `src/shared/img` - images folder (! for html calls use correct path: `static/img/some.jpg`)
- `src/shared/misc` - misc files (i.g. favicon, sitemap, etc.)
- `src/index.ts` - main app entity

Configs:

- `/babel-defines.js` - config for babel
- `/webpack/webpack-pages.js` - config for html pages
- `/webpack/webpack-defines.js` - config for entire webpack

Main entry point:

- `src/app/index.ts` - core entry point

## Defines:

Core webpack config from `/webpack/webpack-defines.js`:

```js
const PATHS = {
  // path to the src dir
  src: path.join(__dirname, '../src'),
  // path to the output dir
  dist: path.join(__dirname, '../dist'),
  // path to the public files (html files)
  public: path.join(__dirname, '../public'),

  // path to output sub dir (js, css, fonts, etc.)
  assets: 'assets/',
  // path to output sub dir (img, icons, etc.)
  static: 'static/'
}
```

## Pages config:

Pages config from `/webpack/webpack-pages.js`:

```js
const pages = [
  {
    // page title
    title: 'Home page',
    // template name `public/index.html`
    template: 'index.html',
    // output filename `dist/index.html`
    filename: 'index.html',

    // other options can be here
  },
  {
    title: 'About page',
    template: 'about.html',
    filename: 'about.html',
  }
]
```

You can pass a hash of configuration options to html-webpack-plugin.

Allowed values are as follows:  https://github.com/jantimon/html-webpack-plugin#options

## Manual pages setup:

In case if you don't want to use Pages config:

1. Create another html file in `./public`
2. Go to `./webpack/webpack.common.js`
3. Add new page to the config:

```js
    // index page:
    new HtmlWebpackPlugin({
      title: 'Home page',
      favicon: defines.src + '/shared/misc/favicon.ico',
      template: defines.public + '/index.html', // public/index.html page
      filename: 'index.html' // output file
    }),
    // about page:
    new HtmlWebpackPlugin({
      title: 'About page',
      favicon: defines.src + '/shared/misc/favicon.ico',
      template: defines.public + '/about.html', // public/about.html page
      filename: 'about.html' // output file
    }),
```

## Import libs example:

Install it:

```bash
yarn add bootstrap react react-dom
```

Import libs to `src/app/index.ts`:

```js
// React example
import React from 'react'

// Bootstrap example (with custom js imports)
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Import SASS / CSS libs example:

Import libs to `src/app/index.scss`:

```scss
// sass lib import example:
@import '../../node_modules/spinners/stylesheets/spinners';
// css lib import example:
@import '../../node_modules/flickity/dist/flickity.css';
```

## React example:

Here's an example with React + i18n Provider.

Install react:

```bash
yarn add react react-dom
```

Create div with id `app` in `public/index.html`:

```html
<div id="app"></div>
```

Init the app in `src/app/index.ts`:

```tsx
import React from 'react'
import { createRoot } from 'react-dom/client'

// app styles
import './index.scss'

// local providers:
import { I18nProvider } from './providers/I18nProvider'

const container = document.getElementById('app') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <I18nProvider>...</I18nProvider>
  </React.StrictMode>
)
```

File `src/app/providers/I18nProvider.tsx`:

```tsx
import React, { FC, PropsWithChildren } from 'react'

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
  // ...

  return <I18n locale={detectedLocale}>{children}</I18n>
}
```

## Vue example:

Install vue:

```bash
yarn add vue
```

Init the app in `src/app/index.ts`:

```js
// vue example (react one is above):
const app = new Vue({
  el: '#app'
})
```

Create div with id `app` in `public/index.html`:

```html
<div id="app"></div>
```

### Adding Vue Components:

Create your component in `src/app/components/`.

**HTML Usage (in `*.html` files):**

Init component in `src/app/index.ts`:

```js
Vue.component('example-component', require('./components/Example.vue').default)
```

In any html files:

```html
<example-component />
```

**VUE Usage (in `*.vue` files):**

Import component:

```js
import ExampleComponent from '@/components/Example.vue'
```

Init component (template):

```js
<Example />
```

Register component (script):

```js
components: {
  Example: ExampleComponent
}
```

## Adding Google Fonts:

Connect fonts to `public/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&display=swap" rel="stylesheet" />
```

Change the font in `src/app/styles/body.scss`:

```scss
html {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
}
```

## Adding local fonts:

In case if you don't want to use Google Fonts:

- Download fonts
- Add fonts to the (i.g. `/src/shared/fonts/OpenSans/...`).

Then add `@font-face` in some `.scss` file (i.g. `/src/app/styles/font.scss`):

```scss
// Open Sans example:
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url('/static/fonts/OpenSans/Open-Sans.woff2') format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
```

The last step is to copy these fonts into the `/dist` folder every time you build the project.

Add another config for `CopyWebpackPlugin` to `/webpack/webpack.common.js`:

```js
new CopyWebpackPlugin({
  // ...

  // `shared/fonts` to `dist/static/fonts`
  {
    from: `${defines.src}/shared/fonts`,
    to: `${defines.dist}/${defines.static}/fonts`
  },
})
```

Change the font in `src/app/styles/body.scss`:

```scss
html {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
}
```

## License:

[MIT](./LICENSE)

Copyright (c) 2018-present, [Evgenii Vedegis](https://github.com/vedees)

[buymeacoffee-shield]: https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg
[buymeacoffee]: https://www.buymeacoffee.com/vedegis
