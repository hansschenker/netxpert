# @rxjs-full/runtime

The client-side render & hydration runtime. It binds a stream of values to the
DOM.

- **Depends on:** `rxjs`
- **Status:** skeleton

## `mount`

Subscribe a stream to a DOM element, re-rendering on each emission. Returns the
RxJS `Subscription` so the caller controls teardown.

```ts
import { mount } from '@rxjs-full/runtime'
import { state } from '@rxjs-full/core'

const count = state(0)
const el = document.querySelector('#app')!

const sub = mount(count, (n) => `<button>count: ${n}</button>`, el)

// later
sub.unsubscribe()
```

### API

```ts
function mount<T>(
  source: Observable<T>,
  render: (value: T) => string,
  el: Element,
): Subscription
```

| Param | Description |
| ----- | ----------- |
| `source` | A stream of values to render. |
| `render` | Maps a value to an HTML string. |
| `el` | The target element. |

## Next

The real runtime will diff a reactive view tree (rather than replacing
`innerHTML`) and support hydration of server-rendered markup — see
[Phase 4](/guide/roadmap#phase-4-build-the-framework-next).
