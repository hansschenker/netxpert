import { renderToString } from '@rxjs-full/server'
import type { Observable } from 'rxjs'

export interface FetchHandlerOptions {
  /** Turn an incoming request into a stream of HTML. */
  render: (request: Request) => Observable<string>
}

/**
 * Build a Workers `fetch` handler from a reactive render function.
 *
 * Skeleton only — the real adapter will expose env bindings as Observables and
 * stream the Response body.
 */
export function createFetchHandler(options: FetchHandlerOptions) {
  return async (request: Request): Promise<Response> => {
    const { html } = await renderToString(options.render(request))
    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  }
}
