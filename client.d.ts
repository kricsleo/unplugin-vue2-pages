// Make the macros globally available
declare global {
  import type { RouteConfig } from 'vue-router'

  const definePage: <T extends Partial<RouteConfig>>(route: T) => T
}
