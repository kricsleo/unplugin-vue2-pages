export function warn(msg: string): void {
  console.warn(`\x1B[33m[unplugin-vue2-pages]: ${msg}\x1B[0m`)
}

export function withLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}
