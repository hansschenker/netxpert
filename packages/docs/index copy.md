# Framework packages

The `rxjs-full-claude` framework is split into focused, independently published
packages under the `@rxjs-full` scope. They're skeletons today — each ships a
small, real, tested surface that the framework will grow on top of.

| Package | Responsibility | Depends on |
| ------- | -------------- | ---------- |
| [`@rxjs-full/core`](/packages/core) | Reactive primitives | `rxjs` |
| [`@rxjs-full/router`](/packages/router) | Reactive routing | `core`, `rxjs` |
| [`@rxjs-full/runtime`](/packages/runtime) | Client render / hydration | `rxjs` |
| [`@rxjs-full/server`](/packages/server) | SSR / streaming | `rxjs` |
| [`@rxjs-full/cloudflare`](/packages/cloudflare) | Workers adapter | `server`, `rxjs` |
| [`@rxjs-full/vite`](/packages/vite) | Vite plugin | `vite` (peer) |

## Shared conventions

Every package:

- is **ESM-only** (`"type": "module"`), built with **tsdown** to
  `dist/index.mjs` + `dist/index.d.mts`;
- exposes a single entry via `exports["."]`;
- is published with `publishConfig.access: public`;
- references shared deps through the workspace **catalog** (`"catalog:"`);
- type-checks with `tsc --noEmit` and tests with Vitest.

::: info Versioning
All six are currently at `0.0.0` with a pending `minor` changeset, so the first
release will cut them at `0.1.0` together. See
[Tooling → Releases](/guide/tooling#releases-changesets).
:::
