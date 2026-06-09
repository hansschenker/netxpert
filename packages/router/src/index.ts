import { state } from '@rxjs-full/core'
import { map, type Observable } from 'rxjs'

export interface Route {
  path: string
}

export interface Router {
  /** The current route as a stream. */
  route$: Observable<Route>
  /** Navigate to a new path. */
  navigate(path: string): void
}

/**
 * Minimal reactive router skeleton. Real matching/params/nesting will land in a
 * later phase; for now it proves the @rxjs-full/core → @rxjs-full/router edge.
 */
export function createRouter(initial = '/'): Router {
  const path = state(initial)
  return {
    route$: path.pipe(map((p) => ({ path: p }))),
    navigate: (next) => path.set(next),
  }
}
