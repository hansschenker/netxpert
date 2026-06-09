# @rxjs-full/core

Reactive primitives for `rxjs-full-claude`, built on RxJS. This is the seed
package — everything else builds on `state`.

- **Depends on:** `rxjs`
- **Status:** skeleton with a passing test suite

## `state`

A reactive value that **is** an RxJS `BehaviorSubject`, with an ergonomic
imperative surface on top. Because it's an Observable, it composes with the
entire RxJS operator ecosystem.

```ts
import { state } from '@rxjs-full/core'

const count = state(0)

count.get()            // 0  — read synchronously
count.set(5)           // replace
count.update((n) => n + 1)   // derive from previous → 6

// it's an Observable
const sub = count.subscribe((n) => console.log(n))  // logs 6, then on each change
```

### API

```ts
class State<T> extends BehaviorSubject<T> {
  get(): T
  set(value: T): void
  update(fn: (prev: T) => T): void
}

function state<T>(initial: T): State<T>

const VERSION: string
```

| Member | Description |
| ------ | ----------- |
| `state(initial)` | Create a `State<T>` seeded with `initial`. |
| `.get()` | Read the current value synchronously. |
| `.set(value)` | Replace the current value. |
| `.update(fn)` | Compute the next value from the previous one. |
| *(Observable)* | Subscribe / pipe like any RxJS subject. |

## Tested behavior

The package's Vitest suite verifies both the imperative surface and the
observable surface:

```ts
const count = state(1)
const seen: number[] = []
const sub = count.subscribe((v) => seen.push(v))
count.set(2)
count.update((n) => n * 10)
sub.unsubscribe()
// seen === [1, 2, 20]
```

## Next

`computed`, `effect`, and resource/store primitives will be layered on `state`
in [Phase 4](/roadmap#phase-4-build-the-framework-next).
