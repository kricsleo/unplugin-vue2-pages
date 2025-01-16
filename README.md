# unplugin-vue2-pages

👋🏻👋🏻 The last life-saver for file-based routing in Vue 2 (Vue Router 3).

## Usage

```bash
pnpm i -D unplugin-vue2-pages
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import pages from 'unplugin-vue2-pages/vite'

export default defineConfig({
  plugins: [
    pages({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
import pages from 'unplugin-vue2-pages/webpack'

module.exports = {
  /* ... */
  plugins: [
    pages({ /* options */ })
  ]
}
```

<br></details>

```ts
// import the auto-generated routes from this plugin.
import { routes } from 'unplugin-vue2-pages/auto-routes'

import VueRouter from 'vue-router'

const router = new VueRouter({
  // use it anyway you like
  routes
})
```

## Options

```ts
/** Plugin options. */
export interface Options {
  /**
   * Dir(s) to scan for page files.
   *
   * @default 'src/pages'
   */
  pages?: string | string[] | PageOptions | PageOptions[]
}

/** Page options. */
export interface PageOptions {
  /**
   * Dir to scan for page files.
   *
   * E.g. 'src/pages'
   */
  dir: string
  /**
   * Base route path for the pages in this dir.
   *
   * @default '/'
   */
  base?: string
}
``
