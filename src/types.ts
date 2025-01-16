/** Plugin options. */
export interface Options {
  /**
   * Dir(s) to scan for page files.
   *
   * @default 'src/pages'
   */
  pages?: Pages
}

export type Pages = string | string[] | PageOptions | PageOptions[]

/** Page options. */
export interface PageOptions {
  /**
   * Dir to scan for page files.
   *
   * E.g. 'src/pages'
   */
  dir: string

  /**
   * Base route path for the pages in this dir.
   *
   * @default '/'
   */
  base?: string

  /**
   * Exclude files from this dir, support glob patterns.
   *
   * E.g. '/componen/**'
   */
  exclude?: string | string[]
}

export interface Route {
  path: string
  component?: string
  children?: Route[]
  meta?: Record<string, any>
}

export interface NormalizedOptions {
  pages: Required<PageOptions>[]
}
