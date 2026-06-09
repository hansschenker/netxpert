import { BehaviorSubject } from 'rxjs'

/**
 * A reactive value. It *is* an RxJS Observable (a BehaviorSubject), so it
 * composes with the entire RxJS operator ecosystem, plus a small ergonomic
 * surface for imperative get/set/update.
 *
 * This is the seed primitive of rxjs-full-claude — `computed`, `effect`,
 * resources and stores will build on top of it.
 */
export class State<T> extends BehaviorSubject<T> {
  /** Read the current value synchronously. */
  get(): T {
    return this.getValue()
  }

  /** Replace the current value. */
  set(value: T): void {
    this.next(value)
  }

  /** Derive the next value from the previous one. */
  update(fn: (prev: T) => T): void {
    this.next(fn(this.getValue()))
  }
}

/** Create a reactive {@link State} seeded with `initial`. */
export function state<T>(initial: T): State<T> {
  return new State(initial)
}

export const VERSION = '0.0.0'
