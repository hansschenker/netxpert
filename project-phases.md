# Project phases

This is the working plan for building **`rxjs-full-claude`** inside the
**netxpert** monorepo. It records *how* the work is sequenced across sessions —
the phases already realized and the phases still planned — so any future session
(human or agent) can pick up with full context.

It complements the high-level [docs roadmap](./docs/guide/roadmap.md): the
roadmap is the public-facing summary, this file is the detailed working plan.

---

## How I work in phases

A few principles drive the sequencing:

1. **One phase = one coherent, shippable increment.** A phase has a clear goal,
   a small set of deliverables, and explicit acceptance criteria. Phases are
   sized to fit comfortably in a single working session.
2. **Vertical before horizontal.** Prove an end-to-end path with the thinnest
   possible slice before building any layer out in breadth (this is why the
   Cloudflare playground existed before any framework code).
3. **Always land green.** A phase is not "done" until `pnpm build`,
   `pnpm typecheck`, `pnpm test`, and `pnpm lint` all pass across the whole
   workspace. Then it is committed and pushed.
4. **Dogfood continuously.** New framework capabilities are exercised through
   `apps/playground` (and later, the docs/example apps) as they land.
5. **Every public API arrives complete.** When a package gains a user-facing
   API it ships together with: implementation → Vitest tests → an updated docs
   page → a Changeset.
6. **Single source of truth for versions.** Shared dependency versions stay in
   the `pnpm-workspace.yaml` `catalog:`; packages reference `"catalog:"`.
7. **Verify before claiming.** Behaviour is confirmed by running it (tests, a
   build, the app) — not asserted.

### Definition of done (every phase)

- [ ] `pnpm build` green (topological, all packages + apps)
- [ ] `pnpm typecheck` green
- [ ] `pnpm test` green (new behaviour covered)
- [ ] `pnpm lint` clean
- [ ] Docs updated (guide and/or the relevant package page)
- [ ] Changeset added for any user-facing package change
- [ ] Committed and pushed to `main`

### Per-feature checklist

For each new exported API in a package:

- [ ] Implementation in `src/`
- [ ] Vitest spec covering the happy path + at least one edge
- [ ] Docs page updated with signature + example
- [ ] Exported from the package entry (`src/index.ts`)

---

## Realized phases

### ✅ Phase 1 — Foundation  ·  `7036251`

**Goal:** a working pnpm + Turborepo monorepo skeleton.

- pnpm workspaces (`apps` / `docs` / `examples` / `packages` / `tooling`) + a
  shared dependency **catalog**.
- Turborepo task graph: `build` / `dev` / `typecheck` / `test` / `deploy` /
  `clean`.
- Shared tooling: `@netxpert/tsconfig` (base / lib / app / worker),
  `@netxpert/biome-config`.
- Root config: Biome, root `tsconfig`, `.gitignore`, `.gitattributes`.

### ✅ Phase 2 — Cloudflare vertical slice  ·  `7036251`

**Goal:** prove the dev + deploy path before any framework code.

- `apps/playground`: a `@cloudflare/vite-plugin` app (Worker + SPA client) that
  builds, type-checks, and lints green; runs in the real Workers runtime in dev.

### ✅ Phase 3 — Framework skeletons  ·  `93a7952`

**Goal:** stand up the six `@rxjs-full/*` packages as a connected graph.

| Package | Shipped surface |
| ------- | --------------- |
| `core` | `state` reactive primitive (+ Vitest suite) |
| `router` | `createRouter` (consumes `core`) |
| `runtime` | `mount` (stream → DOM) |
| `server` | `renderToString` |
| `cloudflare` | `createFetchHandler` (consumes `server`) |
| `vite` | `rxjsFull` plugin |

Built with tsdown (`.mjs` + `.d.mts`); playground dogfoods `@rxjs-full/core`.

### ✅ Supporting milestone — Release & CI  ·  `93a7952`

- Changesets (public access) + initial `0.1.0` changeset.
- GitHub Actions: `ci.yml` (lint/build/typecheck/test), `release.yml`
  (Changesets publish). Publishing needs an `NPM_TOKEN` secret.

### ✅ Supporting milestone — Documentation  ·  `459f1de`

- VitePress site under `docs/` (`@netxpert/docs`) with full guide + per-package
  API pages; builds to `docs/dist`; deployable as an assets-only Worker.

---

## Planned phases

### ⏭️ Phase 4 — Core reactivity & runtime view layer

**Goal:** turn `core` into a real reactivity system and give `runtime` a true
reactive view (no more `innerHTML`).

**`@rxjs-full/core`**
- `computed(fn)` — derived, memoized, lazily-evaluated reactive value.
- `effect(fn)` — run a side effect on dependency changes, with disposal.
- `batch(fn)` — coalesce multiple updates into one emission.
- Clear ownership/teardown model (scopes) so effects clean up.

**`@rxjs-full/runtime`**
- A minimal reactive view primitive (e.g. `h`/template tag) producing a node
  tree, not a string.
- Fine-grained DOM updates bound to `state`/`computed` (update text/attrs in
  place rather than re-rendering).
- `render(view, el)` returning a disposer.

**Acceptance**
- Counter + derived value demo in `playground` driven by `computed`/`effect`
  with no full re-render.
- Tests for `computed` memoization, `effect` disposal, `batch` coalescing.

**Risks/notes:** decide the dependency-tracking strategy (explicit Observable
composition vs. an auto-tracking layer over RxJS). Keep it RxJS-native.

### ⏭️ Phase 5 — Routing, SSR streaming & the Vite plugin

**Goal:** make routing real and render on the server as a stream.

**`@rxjs-full/router`**
- Path matching with params (`/users/:id`) and a parsed `params` on `Route`.
- Nested routes + a route → view resolution map.
- History integration on the client (pushState) behind the reactive API.

**`@rxjs-full/server`**
- `renderToStream` that flushes HTML chunks as the view Observable emits.
- Shell + suspense-style boundaries for async data.

**`@rxjs-full/vite`**
- SSR entry wiring (server + client entry resolution).
- HMR for reactive views.
- (Stretch) a template/component transform.

**Acceptance**
- `playground` serves an SSR'd, streamed page with a param route, hydrated on
  the client.
- Tests for matcher + streaming order.

### ⏭️ Phase 6 — Cloudflare adapter & full-stack data

**Goal:** first-class Workers integration end to end.

**`@rxjs-full/cloudflare`**
- Env bindings (KV/D1/R2/queues) exposed as Observables / typed accessors.
- Streamed `Response` from `renderToStream`.
- Integration with the `@cloudflare/vite-plugin` multi-Worker model
  (`auxiliaryWorkers` + service bindings) for a frontend + API split.

**Acceptance**
- A `playground` (or new example) route reads/writes a binding (e.g. D1) through
  a reactive data layer and streams the result.
- Tested with `@cloudflare/vitest-pool-workers` (runs specs inside workerd).

### ⏭️ Phase 7 — DX: scaffolding CLI & examples

**Goal:** make the framework easy to start with.

- `packages/create/` → `create-rxjs-full` CLI (`pnpm create rxjs-full`).
- `examples/minimal` — the smallest app the CLI emits.
- `examples/todo-d1` — fullstack example (D1 + reactive data + streaming SSR).
- Wire `examples/*` into CI so they always build.

### ⏭️ Phase 8 — Dogfooding & hardening (→ 1.0)

**Goal:** prove the framework by building with it, then stabilize.

- Rebuild a marketing/docs surface **with** `rxjs-full-claude` itself.
- Test infrastructure: shared Vitest config, `vitest-pool-workers` for
  server/adapter specs, coverage thresholds.
- Performance pass (bundle size budgets, streaming latency, hydration cost).
- API review + stabilization; cut `1.0` via Changesets.

---

## Phase ledger

| Phase | Title | Status | Ref |
| ----- | ----- | ------ | --- |
| 1 | Foundation | ✅ done | `7036251` |
| 2 | Cloudflare vertical slice | ✅ done | `7036251` |
| 3 | Framework skeletons | ✅ done | `93a7952` |
| — | Release & CI | ✅ done | `93a7952` |
| — | Documentation (VitePress) | ✅ done | `459f1de` |
| 4 | Core reactivity & runtime view | ⏭️ planned | — |
| 5 | Routing, SSR streaming, Vite plugin | ⏭️ planned | — |
| 6 | Cloudflare adapter & full-stack data | ⏭️ planned | — |
| 7 | Scaffolding CLI & examples | ⏭️ planned | — |
| 8 | Dogfooding & hardening (→ 1.0) | ⏭️ planned | — |

_Update the ledger (status + commit ref) at the end of each phase._
