<div align="center">
  <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack work template</h1>
  <p>
    Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
  </p>
  <p>Author: <a href="https://github.com/vedees/" target="_blank">Vedees</a> | <a href="https://www.youtube.com/playlist?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV" target="_blank">Youtube guide (ru)</a></p>
</div>

## Features:

- separated configs for `dev` and `build` production
- `typescript / js` full support
- `sass / css` full support
- full babel & postcss setup
- 0 dependencies
- the best optimization for your production
- easy customization for webpack and babel

Everybody knows that developing runs on coffee! Thanks for your support!

[![Buy me a coffee][buymeacoffee-shield]][buymeacoffee]

## Build Setup:

```bash
# Download repository:
git clone https://github.com/vedees/webpack-template webpack-template

# Go to the app:
cd webpack-template

# Install dependencies:
npm install

# Server with hot reload at http://localhost:8084/
npm run start

# Output will be at dist/ folder
npm run build
```

## Project Structure:

- `public/*.html` - HTML files
- `src/app` - core app
- `src/shared` - shared files
- `src/shared/img` - images folder (! for html calls use correct path: `static/img/some.jpg`)
- `src/shared/misc` - misc files (i.g. favicon, sitemap, etc.)
- `src/index.ts` - main app entity

Core entry point:

- `src/app/index.ts` - ts entry point
- `src/app/index.scss` - css entry point

<div align="center">
  <h2>Settings:</h2>
</div>

## Config:

Default:

```js
const PATHS = {
  // path to the Src dir
  src: path.join(__dirname, '../src'),
  // path to the Output dir
  dist: path.join(__dirname, '../dist'),
  // path to your html files
  public: path.join(__dirname, '../public')

  // Path to Output sub dir (js, css, fonts, etc.)
  assets: 'assets/'
  // Path to Output sub dir (img, icons, etc.)
  static: 'static/'
}
```

## Import libs:

Install libs:

```bash
yarn add react react-dom
```

Import libs to `src/app/index.ts`:

```js
// React example
import React from 'react'

// Bootstrap example (with custom js imports)
import Bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
```

## Import SASS / CSS libs:

Import libs to `src/app/index.scss`:

```scss
// Sass libs example:
@import '../../node_modules/spinners/stylesheets/spinners';
// CSS libs example:
@import '../../node_modules/flickity/dist/flickity.css';
```

## HTML dir folder:

1. Create another html file in `./public` (`defines.public` folder)
2. Go to `./webpack/webpack.common.js`
3. Add new page to the config:

```js
    // index page:
    new HtmlWebpackPlugin({
      title: 'My app',
      favicon: defines.src + '/shared/misc/favicon.ico',
      // public/index.html page
      template: defines.public + '/index.html',
      filename: 'index.html' // output file
    }),
    // another page:
    new HtmlWebpackPlugin({
      title: 'My app',
      favicon: defines.src + '/shared/misc/favicon.ico',
      // public/another.html page
      template: defines.public + '/another.html',
      filename: 'index.html' // output file
    }),
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

Create your component in `src/app/components/`

**HTML Usage:**

Init component in `src/app/index.ts`:

```js
Vue.component('example-component', require('./components/Example.vue').default)
```

In any html files:

```html
<example-component />
```

**VUE Usage:**

Import components in `*.vue`:

```js
import ExampleComponent from '@/components/Example.vue'
```

Register component:

```js
components: {
  Example: ExampleComponent
}
```

Init it vue component:

```js
<Example />
```

## React example:

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

## Add Fonts:

In case if you don't want to use Google Fonts...

Add @font-face in some `.scss` file (i.g. `/src/app/styles/font.scss`):

```scss
// Open Sans
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url() format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
```

Add your fonts to the: `/src/shared/fonts`

Add copy files config in `/webpack/webpack.common.js`:

```js
new CopyWebpackPlugin({
  // ...

  // `shared/fonts` to `dist/static/fonts`
  {
    from: `${defines.src}/shared/fonts`,
    to: `${defines.dist}/${defines.static}`
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
