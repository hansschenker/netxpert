# Roadmap

A snapshot of what's built and what's next. The phases below mirror how the repo
was bootstrapped.

## ✅ Phase 1 — Foundation

- pnpm workspaces (`apps` / `docs` / `examples` / `packages` / `tooling`) with a
  shared dependency **catalog**.
- Turborepo task graph: `build` / `dev` / `typecheck` / `test` / `deploy` /
  `clean`.
- Shared tooling: `@netxpert/tsconfig` (base / lib / app / worker) and
  `@netxpert/biome-config`.
- Root config: Biome, root `tsconfig`, `.gitignore`, `.gitattributes` (LF).

## ✅ Phase 2 — Cloudflare vertical slice

- `apps/playground`: a Cloudflare Vite plugin app (Worker + SPA client) that
  builds, type-checks, and lints green — proving the dev/deploy path before any
  framework code.

## ✅ Phase 3 — Framework skeletons

The six `@rxjs-full/*` packages exist, build with tsdown, and are wired together
via `workspace:*`:

| Package | What ships today |
| ------- | ---------------- |
| [`core`](/packages/core) | `state` reactive primitive (+ passing Vitest suite) |
| [`router`](/packages/router) | `createRouter` reactive routing |
| [`runtime`](/packages/runtime) | `mount` (stream → DOM) |
| [`server`](/packages/server) | `renderToString` |
| [`cloudflare`](/packages/cloudflare) | `createFetchHandler` |
| [`vite`](/packages/vite) | `rxjsFull` Vite plugin |

The playground dogfoods `@rxjs-full/core` (a reactive counter).

## ✅ Release tooling

- Changesets (public access) with an initial `0.1.0` changeset.
- GitHub Actions `ci.yml` and `release.yml`.

## ✅ Documentation

- This VitePress site under `docs/`, deployable as an assets-only Worker.

## ⏭️ Phase 4 — Build the framework (next)

- `core`: `computed`, `effect`, resources/stores on top of `state`.
- `runtime`: a real reactive view layer (diffing, not `innerHTML`) + hydration.
- `server`: streaming SSR that flushes as the view Observable emits.
- `router`: real matching, params, and nested routes.
- `vite`: template/component transforms, SSR entry, and HMR.
- `cloudflare`: env bindings exposed as Observables; streamed `Response`.

## ⏭️ Later

- `create-rxjs-full` scaffolding CLI + `examples/*`.
- A docs/marketing app built **with** the framework (deeper dogfooding).
