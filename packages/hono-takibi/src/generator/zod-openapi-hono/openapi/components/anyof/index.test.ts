import { describe, it, expect } from 'vitest'
import { anyOf } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/anyof/index.test.ts

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
