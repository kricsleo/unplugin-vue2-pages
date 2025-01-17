import type { UnpluginOptions } from 'unplugin'
import type { NormalizedOptions } from '../types'
import p from 'node:path'
import { name } from '../../package.json'
import { genRoutesModule } from './codegen'
import { definePageTransform } from './definePage'
import { withTrailingSlash } from './utils'

const VIRTUAL_ROUTES_MODULE = `${name}/auto-routes`

export function createVirtualRoutesModulePlugin(options: NormalizedOptions): UnpluginOptions {
  return {
    name: `${name}:auto-routes`,
    resolveId(id) {
      return id === VIRTUAL_ROUTES_MODULE ? id : null
    },
    loadInclude(id) {
      return id === VIRTUAL_ROUTES_MODULE
    },
    async load() {
      return await genRoutesModule(options)
    },
  }
}

export function createDefinePagePlugin(options: NormalizedOptions): UnpluginOptions {
  const dirs = options.pages.map(page => withTrailingSlash(p.resolve(page.dir)))

  return {
    name: `${name}:define-page`,
    transformInclude(id) {
      const inDir = dirs.some(dir => id.startsWith(dir))
      const isVue = id.includes('.vue')
      return inDir && isVue
    },
    transform: definePageTransform,
  }
}
