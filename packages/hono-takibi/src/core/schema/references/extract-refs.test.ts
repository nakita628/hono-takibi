import { describe, expect, it } from 'vitest'
import { extractRefs } from '.'

// Test run
// pnpm vitest run ./src/core/schema/references/extract-refs.test.ts

describe('extractRefs Test', () => {
  it.concurrent(`extractRefs '#/components/schemas/Test' -> ['Test']`, () => {
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

  it.concurrent('extractRefs({}) -> []', () => {
    const result = extractRefs({})
    expect(result).toEqual([])
  })
})
