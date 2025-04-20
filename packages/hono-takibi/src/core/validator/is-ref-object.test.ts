import { describe, test, expect, it } from 'vitest'
import { isRefObject } from './is-ref-object'

// Test run
// pnpm vitest run ./src/core/validator/is-ref-object.test.ts

describe('isRefObject Test', () => {
  test.concurrent('isRefObject -> true', () => {
    const result = isRefObject({ type: 'object' })
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent('isRefObject -> true', () => {
    const result = isRefObject({ $ref: '#/components/schemas/Test' })
    const expected = true
    expect(result).toBe(expected)
  })
  test.concurrent('isRefObject -> false', () => {
    const result = isRefObject('string')
    const expected = false
    expect(result).toBe(expected)
  })
  test.concurrent('isRefObject -> false', () => {
    const result = isRefObject(1)
    const expected = false
    expect(result).toBe(expected)
  })
  test.concurrent('isRefObject -> false', () => {
    const result = isRefObject(true)
    const expected = false
    expect(result).toBe(expected)
  })
  test.concurrent('isRefObject -> false', () => {
    const result = isRefObject(false)
    const expected = false
    expect(result).toBe(expected)
  })
})
