import { describe, expect, it } from 'vitest'
import { date } from './date'

// Test run
// pnpm vitest run ./src/generator/zod/z/date.test.ts

describe('date', () => {
  it.concurrent('z.date()', () => {
    expect(date({ type: 'date' })).toBe('z.date()')
  })
  it.concurrent('z.date().nullable()', () => {
    expect(date({ type: 'date', nullable: true })).toBe('z.date().nullable()')
  })
  it.concurrent('z.date().nullable()', () => {
    expect(date({ type: ['null'] })).toBe('z.date().nullable()')
  })
})
