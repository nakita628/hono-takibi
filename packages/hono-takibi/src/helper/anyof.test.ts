import { describe, expect, it } from 'vitest'
import { anyOf } from './anyof.js'

// Test run
// pnpm vitest run ./src/helper/anyof.test.ts

describe('generateAnyOfCode', () => {
  it.concurrent('generateAnyOfCode with anyOf', () => {
    const result = anyOf({
      anyOf: [
        {
          $ref: '#/components/schemas/MultiPolygon',
        },
        {
          $ref: '#/components/schemas/Polygon',
        },
      ],
      description: 'Center coordinates',
    })
    const expected = 'z.union([MultiPolygonSchema,PolygonSchema])'
    expect(result).toBe(expected)
  })
})
