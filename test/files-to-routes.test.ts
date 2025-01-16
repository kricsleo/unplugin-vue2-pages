import { describe, expect, it } from 'vitest'
import { pagesToRoutes } from '../src/core/pages'
import { normalizedOptions } from './fixtures/options'

describe('files to routes', () => {
  it('files to routes', async () => {
    expect(await pagesToRoutes(normalizedOptions)).toMatchFileSnapshot('./snapshots/routes.js')
  })
})
