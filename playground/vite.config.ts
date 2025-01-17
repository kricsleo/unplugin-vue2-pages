import vue2 from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import inspect from 'vite-plugin-inspect'
import pages from '../src/vite'

export default defineConfig({
  plugins: [
    pages({
      pages: [
        { dir: 'fixtures/unprefix', extendRoute: route => ({ ...route, meta: { layout: 'unprefix' } }) },
        { dir: 'fixtures/prefix', base: '/prefix', extendRoute: route => ({ ...route, meta: { layout: 'prefix' } }) },
      ],
    }),
    inspect(),
    vue2(),
  ],
})
