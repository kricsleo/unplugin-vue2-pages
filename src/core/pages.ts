import type { NormalizedOptions, Route } from '../types'
import p from 'node:path'
import { glob } from 'tinyglobby'
import { withLeadingSlash } from './utils'

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

      let rootRoots = routes
      for (let idx = 0; idx < routePaths.length; idx++) {
        const isFirstRoute = idx === 0
        const isLastRoute = idx === routePaths.length - 1
        const routePath = isFirstRoute ? page.base + routePaths[idx]! : routePaths[idx]!

        const samePrefixRoute = rootRoots.find(route => route.path === routePath)

        if (samePrefixRoute) {
          samePrefixRoute.children ||= []
          rootRoots = samePrefixRoute.children
        }

        if (isLastRoute) {
          rootRoots.push({ path: routePath, component })
        } else {
          const children: Route[] = []
          rootRoots.push({ path: routePath, children })
          rootRoots = children
        }
      }
    }
  }

  return routes
}

function filePathToRoutePaths(filePath: string): string[] {
  // => about/users.[userId]
  const path = filePath.slice(0, filePath.length - p.extname(filePath).length)

  return path
  // => [about, user.[userId]]
    .split('/')
  // => [about, user/:userId]
    .map(part => part.split(/(?<!\.)\.(?!\.)/).map(fileNameToRoutePath).join('/'))
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
