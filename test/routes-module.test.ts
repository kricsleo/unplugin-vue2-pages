import { describe, expect, it } from 'vitest'
import { genRoutesModule } from '../src/core/codegen'
import { normalizedOptions } from './fixtures/options'

describe('routes-module', () => {
  it('generate routes module', async () => {
    const code = await genRoutesModule(normalizedOptions)

    await expect(code).toMatchFileSnapshot('./snapshots/auto-routes.js')
  })
})
