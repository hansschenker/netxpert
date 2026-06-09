# @rxjs-full/cloudflare

The Cloudflare Workers adapter. It turns a reactive render function into a
Workers `fetch` handler.

- **Depends on:** `@rxjs-full/server`, `rxjs`
- **Status:** skeleton (proves the `server → cloudflare` workspace edge)

## `createFetchHandler`

```ts
import { createFetchHandler } from '@rxjs-full/cloudflare'
import { of } from 'rxjs'

const fetch = createFetchHandler({
  render: (request) => of(`<h1>${new URL(request.url).pathname}</h1>`),
})

export default { fetch }
```

### API

```ts
interface FetchHandlerOptions {
  render: (request: Request) => Observable<string>
}

function createFetchHandler(
  options: FetchHandlerOptions,
): (request: Request) => Promise<Response>
```

The handler runs the render stream through
[`@rxjs-full/server`](/packages/server)'s `renderToString` and returns an
`text/html` `Response`.

## Next

The real adapter will expose Worker **env bindings as Observables** and **stream
the Response body**, and integrate with the Cloudflare Vite plugin's
multi-Worker model. See
[Phase 4](/guide/roadmap#phase-4-build-the-framework-next) and
[Cloudflare deployment](/guide/cloudflare).
