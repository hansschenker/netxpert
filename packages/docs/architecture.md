# Monorepo structure

netxpert is a [pnpm workspace](https://pnpm.io/workspaces) orchestrated by
[Turborepo](https://turborepo.com).

## Layout

```
netxpert/
├─ apps/
│  └─ playground/          # Cloudflare Vite vertical slice (Worker + SPA)
├─ examples/               # (reserved) minimal example apps
├─ packages/               # framework packages (@rxjs-full/*) + the docs site
│  ├─ core/                # reactive primitives
│  ├─ router/              # reactive routing
│  ├─ runtime/             # client render / hydration
│  ├─ server/              # SSR / streaming
│  ├─ cloudflare/          # Workers adapter
│  ├─ vite/                # the framework's Vite plugin
│  └─ docs/                # this VitePress site (@netxpert/docs)
├─ tooling/                # internal, never-published shared config
│  ├─ tsconfig/            # @netxpert/tsconfig: base / lib / app / worker
│  └─ biome-config/        # @netxpert/biome-config: shared Biome rules
├─ .changeset/             # Changesets config + pending changesets
├─ .github/workflows/      # CI + release
├─ pnpm-workspace.yaml     # workspace globs + dependency catalog
├─ turbo.json              # task graph
├─ biome.json · tsconfig.json
└─ package.json            # root scripts; pnpm pinned via packageManager
```

## Workspace globs

`pnpm-workspace.yaml` declares where packages live:

```yaml
packages:
  - "apps/*"
  - "examples/*"
  - "packages/*"
  - "tooling/*"
```

## Two package conventions

This split is the key discipline of the repo:

- **Publishable packages** (`packages/*`) — real `build` step (tsdown) producing
  `dist/` + types, with `exports` pointing at the built files. These are what
  users install. Scoped `@rxjs-full/*`, `publishConfig.access: public`.
- **Internal packages** (`tooling/*`) — "just-in-time": they export raw config
  files directly with no build, and are `private`. Consumed via `workspace:*`.

## The dependency catalog

Shared dependency versions live once, in the `catalog:` block of
`pnpm-workspace.yaml`, and any package references them with `"catalog:"`:

```jsonc
// pnpm-workspace.yaml
catalog:
  rxjs: ^7.8.2
  typescript: ^6.0.0
  vite: ^8.0.0
  # …
```

```jsonc
// packages/core/package.json
"dependencies": { "rxjs": "catalog:" }
```

This guarantees every package builds against the **same** RxJS / TypeScript /
Vite — no drift, one place to bump.

## Internal dependency graph

Packages link to each other with the `workspace:*` protocol, so changes are
picked up instantly without publishing:

```
core  ◄── router
core  ◄── (playground dogfoods it)
server ◄── cloudflare
```

`runtime`, `server`, and `vite` currently depend only on their externals
(`rxjs` / `vite`). Turborepo builds in topological order, so `core` is built
before `router`, and `server` before `cloudflare`.

## TypeScript project setup

`tooling/tsconfig` publishes four bases that packages extend:

- `base.json` — strict defaults (`strict`, `noUncheckedIndexedAccess`,
  `verbatimModuleSyntax`, `moduleResolution: bundler`, ES2023).
- `lib.json` — adds `composite` + `rootDir`/`outDir` for library packages.
- `app.json` — adds the DOM libs, `noEmit`, for browser apps.
- `worker.json` — Worker-flavored, empty `types` (runtime types come from
  `wrangler types`).

A package's `tsconfig.json` is a few lines:

```jsonc
{
  "extends": "@netxpert/tsconfig/base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"]
}
```
