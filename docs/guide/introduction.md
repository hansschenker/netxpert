# What is netxpert?

**netxpert** is the monorepo that hosts **`rxjs-full-claude`** — a planned
fullstack web framework where the entire stack is modeled with
[RxJS](https://rxjs.dev) Observables and TypeScript, built on the
[Vite](https://vite.dev) ecosystem and deployed to
[Cloudflare Workers](https://developers.cloudflare.com/workers/).

The repo is the **central hub**: it holds the framework's publishable packages,
the apps that exercise them, and all the shared tooling — so everything evolves
together with one install, one task graph, and atomic cross-package changes.

## The idea behind rxjs-full-claude

Most frameworks bolt a reactivity system onto a rendering library. The premise
here is the opposite: **start from RxJS** and let one reactive primitive flow
through every layer.

- **State** is an Observable (a `BehaviorSubject` you can `get`/`set`/`update`).
- **Routing** is a stream of routes.
- **Rendering** subscribes a stream of views to the DOM (client) or collapses it
  to HTML (server).
- **The server** turns a `Request` into a stream and the stream into a
  `Response` — naturally suited to streaming SSR on Workers.

Because every layer speaks Observables, the full RxJS operator ecosystem
(`map`, `combineLatest`, `switchMap`, `debounceTime`, …) is available
everywhere, with one consistent mental model.

## Why this stack

| Concern         | Choice                                       | Why |
| --------------- | -------------------------------------------- | --- |
| Package manager | pnpm workspaces + catalog                    | Strict deps, `workspace:*` linking, one source of truth for shared versions |
| Task runner     | Turborepo                                     | Cached, topological task graph and filtered deploys |
| App bundler     | Vite + `@cloudflare/vite-plugin`              | Real Workers runtime in dev; `wrangler.jsonc` is the input config |
| Library bundler | tsdown (Rolldown)                             | Fast, tree-shakeable ESM + types for published packages |
| Tests           | Vitest                                        | Same engine as Vite |
| Lint / format   | Biome                                         | One fast binary, minimal config |
| Versioning      | Changesets                                    | Multi-package versioning + changelogs |
| Deploy target   | Cloudflare Workers                            | Vite plugin + Workers is the current full-stack path |

## How to read these docs

- [Getting started](/guide/getting-started) — install and run the repo.
- [Monorepo structure](/guide/architecture) — how everything is laid out.
- [Tooling](/guide/tooling) — pnpm, Turborepo, tsdown, Biome, Changesets, CI.
- [Cloudflare deployment](/guide/cloudflare) — the dev + deploy model.
- [Packages](/packages/) — the `@rxjs-full/*` API as it stands today.
- [Roadmap](/guide/roadmap) — what's done and what's next.
