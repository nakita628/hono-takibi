import { describe, it, expect } from 'vitest'
import { andThen } from '.'
import { ok, err } from '../'

// Test run
// pnpm vitest run ./src/result/and-then/index.test.ts

describe('andThen', () => {
  it('calls the function and returns its result when given ok', () => {
    const res = ok(2)
    const f = (n: number) => ok(n * 3)
    const result = andThen(res, f)
    expect(result).toEqual(ok(6))
  })

  it('does not call the function and returns the original err when given err', () => {
    const res = err('failure')
    const f = (_: number) => ok(999)
    const result = andThen(res, f)
    expect(result).toEqual(res)
  })

  it('returns the new err when the chained function returns err', () => {
    const res = ok('x')
    const f = (_: string) => err('bad')
    const result = andThen(res, f)
    expect(result).toEqual(err('bad'))
  })
})
