import { describe, expect, it } from 'vitest'
import { normalizeTypes } from './normalize-types'

// Test run
// pnpm vitest run ./src/helper/normalize-types.test.ts

describe('normalizeTypes', () => {
  it('should return empty array if type is undefined', () => {
    expect(normalizeTypes(undefined)).toStrictEqual([])
  })

  it('should wrap string type in array', () => {
    expect(normalizeTypes('string')).toStrictEqual(['string'])
  })

  it('should return the array as is if already array', () => {
    expect(normalizeTypes(['string', 'null'])).toStrictEqual(['string', 'null'])
  })

  it('should wrap number type in array', () => {
    expect(normalizeTypes('number')).toStrictEqual(['number'])
  })

  it('should handle "null" as string', () => {
    expect(normalizeTypes('null')).toStrictEqual(['null'])
  })

  it('should handle mixed type array', () => {
    expect(normalizeTypes(['integer', 'null'])).toStrictEqual(['integer', 'null'])
  })
})
