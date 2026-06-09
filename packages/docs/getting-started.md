# Getting started

## Prerequisites

- **Node** `>=22` (developed on Node 24).
- **pnpm** `11.x`. The version is pinned in the root `package.json` via the
  `packageManager` field. If you don't have pnpm:

  ```bash
  npm install -g pnpm
  ```

  ::: tip Corepack on Windows
  `corepack enable` may fail with `EPERM` if Node lives in
  `C:\Program Files\nodejs` (it needs admin to write shims). Installing pnpm
  through `npm install -g pnpm` into the user-writable npm prefix avoids this.
  :::

## Install

```bash
git clone https://github.com/hansschenker/netxpert.git
cd netxpert
pnpm install
```

On first install, pnpm will ask you to approve native build scripts
(`esbuild`, `workerd`, `sharp`). They're pre-approved in `pnpm-workspace.yaml`
under `allowBuilds`, so they run automatically.

## Common commands

All commands run from the repo root and fan out through Turborepo.

```bash
pnpm dev          # run all dev servers
pnpm build        # build every package and app (topological order)
pnpm typecheck    # type-check the whole workspace
pnpm test         # run all Vitest suites
pnpm lint         # Biome check
pnpm lint:fix     # Biome check + autofix
pnpm format       # Biome format --write
```

Target a single package with a filter:

```bash
pnpm --filter @netxpert/playground dev
pnpm --filter @rxjs-full/core test
pnpm --filter @netxpert/docs dev
```

## Run the playground

The `apps/playground` app is a vertical slice that runs in the **real Workers
runtime** locally, via the Cloudflare Vite plugin. It serves an API route from a
Worker and a small SPA client that dogfoods `@rxjs-full/core`.

```bash
pnpm --filter @netxpert/playground dev
```

Then open the printed URL. `GET /api/` is served by the Worker; everything else
falls back to the SPA assets.

## Release flow (Changesets)

When you make a user-facing change to a package, add a changeset:

```bash
pnpm changeset
```

On merge to `main`, CI opens (or updates) a **Version Packages** PR. Merging that
PR publishes the changed `@rxjs-full/*` packages to npm — see
[Tooling → Releases](/guide/tooling#releases-changesets).
