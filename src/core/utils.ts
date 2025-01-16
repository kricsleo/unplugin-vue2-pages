export function warn(msg: string): void {
  console.warn(`\x1B[33m[unplugin-vue2-pages]: ${msg}\x1B[0m`)
}

export function withLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function trimSlash(path: string): string {
  return path.startsWith('/') ? trimSlash(path.slice(1))
    : path.endsWith('/') ? trimSlash(path.slice(0, -1))
      : path
}
