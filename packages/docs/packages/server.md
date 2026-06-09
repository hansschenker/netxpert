# @rxjs-full/server

The server-side render pipeline. It turns a view stream into HTML.

- **Depends on:** `rxjs`
- **Status:** skeleton

## `renderToString`

Collapse a view stream to its first emitted HTML string.

```ts
import { renderToString } from '@rxjs-full/server'
import { of } from 'rxjs'

const { html } = await renderToString(of('<h1>Hello</h1>'))
// html === '<h1>Hello</h1>'
```

### API

```ts
interface RenderResult {
  html: string
}

function renderToString(view$: Observable<string>): Promise<RenderResult>
```

## Next

The real server will **stream** chunks to the `Response` as the view Observable
emits, rather than awaiting a single value — a natural fit for streaming SSR on
Cloudflare Workers. See
[Phase 4](/roadmap#phase-4-build-the-framework-next).
