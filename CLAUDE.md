# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Monorepo hub for **`rxjs-full-claude`** — an RxJS + TypeScript fullstack web framework on the Vite ecosystem, deployed to Cloudflare Workers. pnpm workspaces + Turborepo; libraries are bundled with tsdown (Rolldown), apps with Vite + `@cloudflare/vite-plugin`; lint/format is Biome; versioning is Changesets.

## Commands

```bash
pnpm install                                # install (Node >=22, pnpm 11.x)
pnpm build                                  # turbo run build (topological)
pnpm dev                                    # all dev servers
pnpm typecheck                              # tsc --noEmit everywhere
pnpm test                                   # vitest everywhere
pnpm lint                                   # biome check .
pnpm lint:fix                               # biome check --write .

# Single package (filter by package name, not path):
pnpm --filter @rxjs-full/core test
pnpm --filter @netxpert/playground dev

# Single test file / single test:
pnpm --filter @rxjs-full/core exec vitest run src/index.test.ts
pnpm --filter @rxjs-full/core exec vitest run -t "test name"
```

`turbo.json` makes `typecheck` and `test` depend on `^build` — if a package's workspace dependencies haven't been built, build first (or just run the root `pnpm test`, which handles ordering).

Changesets: `pnpm changeset` to add one; every user-facing package change needs a changeset.

### Deploys

- Playground: `pnpm --filter @netxpert/playground deploy` (wrangler deploy from its own `wrangler.jsonc`).
- Docs: `pnpm --filter @netxpert/docs build && cd packages/docs && npx wrangler deploy` — manual deploy is the only working path; the git-connected Cloudflare auto-build is broken (see `project-phases.md` / memory).

## Layout & architecture

```
packages/          publishable @rxjs-full/* framework packages + the docs site
apps/playground    Cloudflare Vite app that dogfoods the framework
tooling/           never-published shared config: @netxpert/tsconfig, @netxpert/biome-config
```

Framework package dependency graph (all consume `rxjs`):

- `@rxjs-full/core` — reactive primitives (`state`); no workspace deps
- `@rxjs-full/router` — depends on `core`
- `@rxjs-full/runtime` — client render/hydration (standalone)
- `@rxjs-full/server` — SSR/streaming (standalone)
- `@rxjs-full/cloudflare` — Workers adapter, depends on `server`
- `@rxjs-full/vite` — Vite plugin (peer dep on vite)

All library packages share the same shape: `src/index.ts` entry, tests colocated as `src/*.test.ts`, tsdown build emitting `dist/index.mjs` + `dist/index.d.mts` (ESM only), tsconfig extending `@netxpert/tsconfig` (base/lib/app/worker variants).

`apps/playground` is a Worker + SPA client pair: `src/worker/index.ts` (server, configured as `main` in `wrangler.jsonc`) and `src/client/main.ts`; the Cloudflare Vite plugin runs the worker in real workerd during `vite dev`.

`packages/docs` is the VitePress site (`@netxpert/docs`), deployed as an assets-only Worker. Guide pages live flat at its root; per-package API pages live under its `packages/` subdirectory.

### Dependency versions: single source of truth

Shared versions live in the `catalog:` section of `pnpm-workspace.yaml`; package.json files reference `"catalog:"`. Workspace deps use `"workspace:*"`. Add/update versions in the catalog, not in individual packages.

## How work is sequenced

`project-phases.md` is the detailed working plan — realized phases (with commit refs) and planned ones. Read it at the start of substantive work. Key rules from it:

- One phase = one shippable increment; a phase is done only when `pnpm build`, `pnpm typecheck`, `pnpm test`, and `pnpm lint` are all green across the workspace, then committed and pushed to `main`.
- Every new public API ships complete: implementation in `src/`, Vitest spec (happy path + an edge), docs page updated in `packages/docs`, exported from `src/index.ts`, plus a changeset.
- Update the phase ledger (status + commit ref) at the end of each phase, and document the phase's completed work in the VitePress docs.
- Verify behavior by running it (tests/build/app), not by asserting it.

## Environment notes

- Windows 11, Git Bash — use Unix shell syntax.
- Corepack is blocked on this machine (EPERM); pnpm is installed via `npm i -g pnpm`. Don't run `corepack enable`.
