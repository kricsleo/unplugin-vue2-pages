import type { Options } from '../../src/types'
import { normalizeOptions } from '../../src/core/options'

export const options: Options = {
  pages: [
    { dir: 'test/fixtures/unprefix' },
    { dir: 'test/fixtures/prefix', base: 'prefix/' },
  ],
}

export const normalizedOptions = normalizeOptions(options)
