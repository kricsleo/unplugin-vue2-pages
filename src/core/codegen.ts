import type { NormalizedOptions, Route } from '../types'
import { pagesToRoutes } from './pages'

export async function genRoutesModule(options: NormalizedOptions): Promise<string> {
  const routes = await pagesToRoutes(options)

  const imports: string[] = []
  const code: string[] = []

  code.push(`export const routes = [`)

  for (const route of routes) {
    code.push(genRoute(route, imports, 2))
  }

  code.push(`];`)

  code.unshift(...imports, '\n')
  code.push('\n', genUtils())

  return code.join('\n')
}

function genRoute(route: Route, imports: string[], indent = 0): string {
  const lines: string[] = []
  const routeImport = hashRoute(route)

  push(route.component ? 'merge({' : '{')
  push(`  path: '${route.path}',`)

  if (route.component) {
    // TODO: the query suffix?
    imports.push(`import ${routeImport} from '${route.component}?vue&type=route'`)
    push(`  component: () => import('${route.component}'),`)
  }

  if (route.meta) {
    push(`  meta: ${JSON.stringify(route.meta, null, indent + 4)},`)
  }

  if (route.children) {
    push(`  children: [`)
    for (const childRoute of route.children) {
      lines.push(genRoute(childRoute, imports, indent + 4))
    }
    push(`  ],`)
  }

  push(route.component ? `}, ${routeImport}),` : `},`)

  return lines.join('\n')

  function push(str: string): void {
    lines.push(' '.repeat(indent) + str)
  }
}

function genUtils(): string {
  return `function merge(a,b) {
  return { ...a, ...b, meta: { ...a.meta, ...b.meta } }
}
  `
}

function hashRoute(route: Route): string {
  if (!route.component)
    return ''

  // simple hash
  const hash = (
    route.component
      .split('')
      .reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0) >>> 0
  ).toString(36)

  return `_route_${hash}`
}
