import type { RouteConfig } from 'vue-router'

declare global {
  declare const definePage: <T extends Partial<RouteConfig>>(route: T) => T
}
