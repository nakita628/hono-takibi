import { describe, test, expect } from 'vitest'
import { extractRefs } from './extract-refs'

// Test run
// pnpm vitest run ./src/core/schema/references/extract-refs.test.ts

describe('extractRefs Test', () => {
  test.concurrent(`extractRefs '#/components/schemas/Test' -> ['Test']`, () => {
    const result = extractRefs({
      type: 'object',
      properties: {
        pet: {
          $ref: '#/components/schemas/Test',
        },
      },
    })

    const expected = ['Test']
    expect(result).toStrictEqual(expected)
  })

  test.concurrent('extractRefs({}) -> []', () => {
    const result = extractRefs({})
    expect(result).toEqual([])
  })
})
