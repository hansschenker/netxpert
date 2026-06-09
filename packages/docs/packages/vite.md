# @rxjs-full/vite

The framework's own Vite plugin — distinct from the
[`@cloudflare/vite-plugin`](/cloudflare) (the two compose).

- **Peer dependency:** `vite` (`^8.0.0`)
- **Status:** skeleton

## `rxjsFull`

```ts
// vite.config.ts
import { rxjsFull } from '@rxjs-full/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [rxjsFull(), cloudflare()],
})
```

### API

```ts
interface RxjsFullOptions {
  ssr?: boolean
}

function rxjsFull(options?: RxjsFullOptions): Plugin   // default export too
```

Today it returns a minimal `Plugin` (`name: 'rxjs-full'`, `enforce: 'pre'`).

## Next

This plugin will own:

- template / component transforms,
- the SSR entry wiring,
- HMR for reactive views.

See [Phase 4](/roadmap#phase-4-build-the-framework-next).
