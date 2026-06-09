import { describe, expect, it } from 'vitest'
import { state } from './index'

describe('state', () => {
  it('holds, sets and updates a value', () => {
    const count = state(0)
    expect(count.get()).toBe(0)

    count.set(5)
    expect(count.get()).toBe(5)

    count.update((n) => n + 1)
    expect(count.get()).toBe(6)
  })

  it('behaves as an observable', () => {
    const count = state(1)
    const seen: number[] = []

    const sub = count.subscribe((v) => seen.push(v))
    count.set(2)
    count.update((n) => n * 10)
    sub.unsubscribe()

    expect(seen).toEqual([1, 2, 20])
  })
})
