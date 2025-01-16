import { describe, expect, it } from 'vitest'
import { pagesToRoutes } from '../src/core/pages'
import { normalizedOptions } from './fixtures/options'

describe('files to routes', () => {
  it('files to routes', async () => {
    const routes = await pagesToRoutes(normalizedOptions)
    await expect(routes).toMatchFileSnapshot('./snapshots/routes.js')
  })
})
