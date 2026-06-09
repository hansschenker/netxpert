import type { Observable, Subscription } from 'rxjs'

/**
 * Bind a stream of values to a DOM element by re-rendering on each emission.
 * Returns the Subscription so the caller controls teardown.
 *
 * Skeleton only — the real runtime will diff a reactive view tree rather than
 * replacing innerHTML.
 */
export function mount<T>(
  source: Observable<T>,
  render: (value: T) => string,
  el: Element,
): Subscription {
  return source.subscribe((value) => {
    el.innerHTML = render(value)
  })
}
