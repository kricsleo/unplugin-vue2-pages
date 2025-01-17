import type { NormalizedOptions, Route } from '../types'
import p from 'node:path'
import { glob } from 'tinyglobby'
import { trimSlash, withLeadingSlash } from './utils'

export async function pagesToRoutes(options: NormalizedOptions): Promise<Route[]> {
  const routes: Route[] = []

  for (const page of options.pages) {
    // => /User/Project/src/pages
    const cwd = p.resolve(page.dir)
    // => about/users.[userId].vue
    const files = await glob('**/*.vue', { cwd, ignore: page.exclude })

    for (const file of files) {
      // => /src/pages/about/users.[userId].vue
      const component = withLeadingSlash(p.join(page.dir, file))

      // => [about, user/:userId]
      const routePaths = filePathToRoutePaths(file)
      let root = routes

      for (let idx = 0; idx < routePaths.length; idx++) {
        const isFirstRoute = idx === 0
        const isLastRoute = idx === routePaths.length - 1

        const routePath = isFirstRoute
          ? withLeadingSlash(trimSlash(page.base + routePaths[idx]!))
          : trimSlash(routePaths[idx]!)

        const samePrefixRoute = root.find(route => route.path === routePath)
        if (samePrefixRoute) {
          samePrefixRoute.children ||= []
          root = samePrefixRoute.children
          continue
        }

        if (isLastRoute) {
          const route = { path: routePath, component }
          root.push(page.extendRoute(route))
        } else {
          const children: Route[] = []
          root.push({ path: routePath, children })
          root = children
        }
      }
    }
  }

  return sortRoutes(routes)
}

function filePathToRoutePaths(filePath: string): string[] {
  // => about/users.[userId]
  const path = filePath.slice(0, filePath.length - p.extname(filePath).length)

  return path
  // => [about, user.[userId]]
    .split('/')
  // => [about, user/:userId]
    .map(part => part
      .split(/(?<!\.)\.(?!\.)/)
      .map(fileNameToRoutePath)
      .join('/'),
    )
}

function fileNameToRoutePath(fileName: string): string {
  if (fileName === 'index') {
    return ''
  }
  if (fileName.startsWith('[...') && fileName.endsWith(']')) {
    return '*'
  }
  if (fileName.startsWith('[') && fileName.endsWith(']')) {
    return `:${fileName.slice(1, -1)}`
  }
  return fileName
}

function sortRoutes(routes: Route[]): Route[] {
  return routes
    .sort(sortRoutePath)
    .map(route => route.children?.length
      ? ({ ...route, children: sortRoutes(route.children) })
      : route,
    )
}

function sortRoutePath(routeA: Route, routeB: Route): number {
  // Priority 1: static > dynamic > glob
  const typeA = routeType(routeA)
  const typeB = routeType(routeB)
  if (typeA !== typeB) {
    return typeB - typeA
  }

  // Priority 2: length desc
  return routeB.path.length - routeA.path.length

  function routeType(route: Route): number {
    return route.path.includes('*') ? 0
      : route.path.includes(':') ? 1
        : 2
  }
}
