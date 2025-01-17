import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { createUnplugin } from 'unplugin'
import { normalizeOptions } from './core/options'
import { createDefinePagePlugin, createVirtualRoutesModulePlugin } from './core/plugins'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (_options?: Options) => {
  const options = normalizeOptions(_options)

  return [
    createVirtualRoutesModulePlugin(options),
    createDefinePagePlugin(options),
  ]
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
