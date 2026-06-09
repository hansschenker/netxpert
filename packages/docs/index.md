---
layout: home

hero:
  name: netxpert
  text: The rxjs-full-claude monorepo
  tagline: An RxJS + TypeScript fullstack web framework on the Vite ecosystem, deployed to Cloudflare.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: Architecture
      link: /architecture
    - theme: alt
      text: GitHub
      link: https://github.com/hansschenker/netxpert

features:
  - title: Reactive to the core
    details: State, routing, and rendering are modeled as RxJS Observables end to end — one mental model from the server to the DOM.
  - title: Vite-native
    details: Built on Vite 8, with a first-class framework plugin and the Cloudflare Vite plugin running the real Workers runtime in dev.
  - title: Cloudflare-first
    details: Ship Workers with static assets; compose full-stack apps with service bindings. The playground proves the path end to end.
  - title: Monorepo done right
    details: pnpm workspaces + catalog, a Turborepo task graph, tsdown libraries, Biome, and Changesets-driven releases.
---

## Status

This repository is the **hub** for building `rxjs-full-claude`. The foundation,
the framework package skeletons, and the release tooling are in place and green;
the framework internals are the next phase of work.

See the [Roadmap](/roadmap) for exactly what is done and what is next.

These docs auto-deploy to Cloudflare Workers on every push to `main`.
