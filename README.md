# netxpert

Monorepo hub for **`rxjs-full-claude`** — an RxJS + TypeScript fullstack web
framework built on the Vite ecosystem and deployed to Cloudflare Workers.

## Stack

| Concern          | Tool                                            |
| ---------------- | ----------------------------------------------- |
| Package manager  | pnpm workspaces + catalog                        |
| Task runner      | Turborepo                                        |
| App bundler      | Vite + `@cloudflare/vite-plugin` (Workers)       |
| Library bundler  | tsdown (Rolldown)                                |
| Tests            | Vitest + `@cloudflare/vitest-pool-workers`       |
| Lint / format    | Biome                                            |
| Versioning       | Changesets (added in a later phase)              |
| Deploy target    | Cloudflare Workers                               |

## Layout

```
apps/        deployable apps that dogfood the framework (playground)
examples/    minimal example apps (also used by the scaffolding CLI)
packages/    publishable framework packages (@rxjs-full/*) + the docs site
tooling/     internal, never-published shared config (tsconfig, biome)
```

## Getting started

```bash
pnpm install        # install everything
pnpm dev            # run all dev servers (turbo)
pnpm --filter @netxpert/playground dev   # run just the playground

pnpm build          # build all packages/apps
pnpm typecheck      # type-check the whole repo
pnpm lint           # biome check
```

## Deploy

Each deployable app has its own `wrangler.jsonc`:

```bash
pnpm --filter @netxpert/playground deploy   # wrangler deploy
```

## Project phases

The work is sequenced in phases. See [`project-phases.md`](./project-phases.md)
for the detailed working plan — realized phases (with commit refs) and the plan
for upcoming sessions — or the [docs roadmap](./packages/docs/roadmap.md) for the
summary.

## Requirements

- Node `>=22`
- pnpm `11.x` (pinned via `packageManager`)
