import type { NormalizedOptions, Options, PageOptions, Pages } from '../types'
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
      return { dir: page, base: '/', exclude: [] }
    }
    const base = withLeadingSlash(page.base || '/')
    const exclude = page.exclude || []
    return { ...page, base, exclude }
  })
}
