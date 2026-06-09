# Tooling

A reference for every tool in the repo and how it's wired.

## Versions

| Tool | Version |
| ---- | ------- |
| Node | `>=22` (developed on 24) |
| pnpm | `11.5.2` (pinned via `packageManager`) |
| Turborepo | `2.9.x` |
| Vite | `8.x` |
| TypeScript | `6.x` |
| tsdown | `0.22.x` |
| Vitest | `4.x` |
| Biome | `2.4.x` |
| Wrangler | `4.98.x` |
| RxJS | `7.8.x` |
| VitePress (docs) | `1.6.x` |

## pnpm workspaces + catalog

- Packages are linked with `workspace:*`.
- Shared versions live in the `catalog:` block and are referenced as `"catalog:"`.
- Native postinstall scripts are gated by pnpm; the repo pre-approves
  `esbuild`, `workerd`, and `sharp` under `allowBuilds` in `pnpm-workspace.yaml`.

## Turborepo

`turbo.json` defines the task graph. Highlights:

```jsonc
{
  "tasks": {
    "build":     { "dependsOn": ["^build"], "outputs": ["dist/**", ".vite/**"] },
    "dev":       { "cache": false, "persistent": true },
    "typecheck": { "dependsOn": ["^build"] },
    "test":      { "dependsOn": ["^build"] },
    "deploy":    { "dependsOn": ["build"], "cache": false },
    "clean":     { "cache": false }
  }
}
```

- `^build` means "build my dependencies first" — this is what makes the
  topological order work.
- `typecheck`/`test` depend on `^build` so a package can resolve its
  workspace dependencies' built types/output.
- `outputs` are what Turborepo caches and restores on a cache hit.

Run a task for one package with `--filter`:

```bash
pnpm build --filter @rxjs-full/core
pnpm deploy --filter @netxpert/playground
```

## tsdown (library builds)

Every publishable package builds with [tsdown](https://tsdown.dev) (Rolldown).
The config is identical across packages:

```ts
// tsdown.config.ts
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
})
```

::: warning Output extensions
tsdown emits **`index.mjs`** and **`index.d.mts`** (not `.js`/`.d.ts`). Each
package's `exports`/`main`/`module`/`types` point at those `.mjs`/`.d.mts`
files — keep them in sync if you change the build.
:::

## TypeScript

Shared bases live in `@netxpert/tsconfig` — see
[Monorepo structure](/architecture#typescript-project-setup). Builds are
done by tsdown; `tsc --noEmit` is used only for type-checking.

## Biome (lint + format)

One config, applied repo-wide from the root `biome.json`, which `extends` the
shared rules in `tooling/biome-config/biome.base.json`.

::: tip Why `biome.base.json` and not `biome.json`?
Biome 2 auto-discovers any `biome.json` as a *root* config, which collides with
the real root. Naming the shared file `biome.base.json` keeps it as an
extend-only file.
:::

```bash
pnpm lint        # check
pnpm lint:fix    # check + autofix
pnpm format      # format only
```

Formatting: 2-space indent, 100 col width, single quotes, semicolons as needed.

## Releases (Changesets)

[Changesets](https://github.com/changesets/changesets) drives versioning and
publishing of the `@rxjs-full/*` packages.

- `.changeset/config.json` is set to `access: public`, `baseBranch: main`.
- Add a changeset for any user-facing change:

  ```bash
  pnpm changeset
  ```

- Root scripts:
  - `pnpm version:packages` → `changeset version` (applies pending changesets).
  - `pnpm release` → `pnpm build && changeset publish`.

## CI / CD (GitHub Actions)

- **`.github/workflows/ci.yml`** — on every push to `main` and every PR:
  install → `lint` → `build` → `typecheck` → `test`.
- **`.github/workflows/release.yml`** — on push to `main`: the Changesets action
  opens/updates a "Version Packages" PR while changesets exist, and publishes to
  npm once merged.

::: warning Publishing requires a secret
The release workflow needs an **`NPM_TOKEN`** repository secret (and the
`@rxjs-full` npm scope must be publishable by it). Until that's set, CI still
runs in full; only the publish step is inert.
:::
