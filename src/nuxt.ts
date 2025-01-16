import type { Options } from './types'
import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from '@nuxt/kit'
import vite from './vite'
import webpack from './webpack'
import '@nuxt/schema'

export default defineNuxtModule<Options>({
  meta: {
    name: 'unplugin-vue2-pages',
    configKey: 'unpluginVue2Pages',
  },
  defaults: {},
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options))
    addWebpackPlugin(() => webpack(options))
  },
})
