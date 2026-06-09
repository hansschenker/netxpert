import type { Plugin } from 'vite'

export interface RxjsFullOptions {
  /** Reserved for future framework options. */
  ssr?: boolean
}

/**
 * The rxjs-full-claude Vite plugin.
 *
 * Skeleton only — this will own template/component transforms, the SSR entry,
 * and HMR wiring for reactive views.
 */
export function rxjsFull(_options: RxjsFullOptions = {}): Plugin {
  return {
    name: 'rxjs-full',
    enforce: 'pre',
  }
}

export default rxjsFull
