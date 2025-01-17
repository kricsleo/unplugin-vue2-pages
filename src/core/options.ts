import type { NormalizedOptions, Options, PageOptions, Pages, Route } from '../types'
import { withLeadingSlash } from './utils'

export function normalizeOptions(options?: Options): NormalizedOptions {
  const pages = normalizePages(options?.pages)

  return { ...options, pages }
}

function normalizePages(_pages?: Pages): Required<PageOptions>[] {
  const pages = _pages || 'src/pages'
  const pageArr = Array.isArray(pages) ? pages : [pages]

  return pageArr.map((page) => {
    if (typeof page === 'string') {
      return { dir: page, base: '/', exclude: [], extendRoute: defaultExtendRoute }
    }
    const base = withLeadingSlash(page.base || '/')
    const exclude = page.exclude || []
    const extendRoute = page.extendRoute || defaultExtendRoute
    return { ...page, base, exclude, extendRoute }
  })
}

function defaultExtendRoute(route: Route): Route {
  return route
}
