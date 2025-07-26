import { describe, expect, it } from 'vitest'
import { isRefObject } from '.'

// Test run
// pnpm vitest run ./src/validator/is-ref-object.test.ts

describe('isRefObject Test', () => {
  it.concurrent('isRefObject -> true', () => {
    const result = isRefObject({ type: 'object' })
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent('isRefObject -> true', () => {
    const result = isRefObject({ $ref: '#/components/schemas/Test' })
    const expected = true
    expect(result).toBe(expected)
  })
  it.concurrent('isRefObject -> false', () => {
    const result = isRefObject('string')
    const expected = false
    expect(result).toBe(expected)
  })
  it.concurrent('isRefObject -> false', () => {
    const result = isRefObject(1)
    const expected = false
    expect(result).toBe(expected)
  })
  it.concurrent('isRefObject -> false', () => {
    const result = isRefObject(true)
    const expected = false
    expect(result).toBe(expected)
  })
  it.concurrent('isRefObject -> false', () => {
    const result = isRefObject(false)
    const expected = false
    expect(result).toBe(expected)
  })
})
