# @rxjs-full/router

Reactive routing as RxJS streams. The current route is an Observable; navigation
pushes a new value.

- **Depends on:** `@rxjs-full/core`, `rxjs`
- **Status:** skeleton (proves the `core → router` workspace edge)

## `createRouter`

```ts
import { createRouter } from '@rxjs-full/router'

const router = createRouter('/')

router.route$.subscribe((route) => {
  console.log(route.path)   // '/'
})

router.navigate('/about')   // route$ emits { path: '/about' }
```

### API

```ts
interface Route {
  path: string
}

interface Router {
  route$: Observable<Route>
  navigate(path: string): void
}

function createRouter(initial?: string): Router  // initial defaults to '/'
```

| Member | Description |
| ------ | ----------- |
| `route$` | The current route as a stream of `Route`. |
| `navigate(path)` | Set the current path; `route$` emits the new route. |

## How it's built

`createRouter` is a thin layer over a `state` from
[`@rxjs-full/core`](/packages/core):

```ts
const path = state(initial)
return {
  route$: path.pipe(map((p) => ({ path: p }))),
  navigate: (next) => path.set(next),
}
```

## Next

Real path matching, route params, and nested routes land in
[Phase 4](/roadmap#phase-4-build-the-framework-next).
