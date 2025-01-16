import type { UnpluginOptions } from 'unplugin'

import type { NormalizedOptions } from '../types'
import MagicString from 'magic-string'
import { name } from '../../package.json'
import { genRoutesModule } from './codegen'

const VIRTUAL_ROUTES_MODULE = `${name}/auto-routes`
const ROUTE_BLOCK_QUERY = '?vue&type=route'

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

export function createPageRouteBlockPlugin(options: NormalizedOptions): UnpluginOptions {
  return {
    name: `${name}:page-route-block`,
    transformInclude(id) {
      return id.includes(ROUTE_BLOCK_QUERY)
        && options.pages.some(page => id.includes(page.dir))
    },
    transform(code) {
      if (code) {
        const s = new MagicString(code)

        // todo: support it or not?
        s.append(`\n\n;function definePage(t){return t};\n`)

        return {
          code: s.toString(),
          map: s.generateMap(),
        }
      }
      return 'export default {}'
    },
  }
}
