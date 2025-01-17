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

Add the declaration to the `tsconfig.json` to enable intellisense for `definePage` usage.

```json
{
  "compilerOptions": {
    "types": [
      "unplugin-vue2-pages/global"
    ]
  }
}
```

Import auto-generated routes from this plugin.

```ts
/// <reference types="unplugin-vue2-pages/client" />

import { routes } from 'unplugin-vue2-pages/auto-routes'
import VueRouter from 'vue-router'

const router = new VueRouter({ routes })
```

## File-based Routing Convention

File structure:

```
src/pages/
├── index.vue
├── about.vue
├── posts.[postId].author.vue
├── [...all].vue
└── users/
    ├── index.vue
    ├── [userId].profile.vue
    └── [...all].vue
```

Generated routes:

```ts
[
  { path: '/', component: () => import('/src/pages/index.vue') },
  { path: '/about', component: () => import('/src/pages/about.vue') },
  { path: '/posts/:postId/author', component: () => import('/src/pages/posts.[postId].author.vue') },
  { path: '*', component: () => import('/src/pages/[...all].vue') },
  {
    path: '/users',
    children: [
      { path: '', component: () => import('/src/pages/users/index.vue') },
      { path: ':userId/profile', component: () => import('/src/pages/users/[userId].profile.vue') },
      { path: '*', component: () => import('/src/pages/users/[...all].vue') },
    ]
  },
]
```

- `[dynamic]`: represents dynamic path → `:dynamic`

- `[...catchAll]`: represents catch all path → `*`

- `.`: represents path slash → `/`

- `/`: folder represents children path → `children: [...]`

## DefinePage

`definePage` is a compile-macro, you can define route config in this function.

Same as [unplugin-vue-router: definePage()](https://uvr.esm.is/guide/extending-routes.html#definepage)

```vue
<script setup lang="ts">
definePage({
  meta: { auth: true }
})
</script>
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
  pages?: Pages
}

export type Pages = string | string[] | PageOptions | PageOptions[]

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

  /**
   * Exclude files from this dir, support glob patterns.
   *
   * E.g. 'componen/**'
   */
  exclude?: string | string[]

  /**
   * Extend a route before generate.
   */
  extendRoute?: (route: Route) => Route
}
```

## Inspired by

- [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

- [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)

## License

❤️ MIT @kricsleo
