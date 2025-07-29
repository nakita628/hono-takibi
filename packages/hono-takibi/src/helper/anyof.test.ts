import { describe, expect, it } from 'vitest'
import { anyOf } from './anyof.js'

// Test run
// pnpm vitest run ./src/helper/anyof.test.ts

describe('anyOf', () => {
  it.concurrent('z.union([MultiPolygonSchema,PolygonSchema])', () => {
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
  it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
    const result = anyOf({
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
      nullable: true,
    })
    const expected = 'z.union([z.string(),z.number()]).nullable()'
    expect(result).toBe(expected)
  })

  it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
    const result = anyOf({
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'number',
        },
      ],
      type: ['null'],
    })
    const expected = 'z.union([z.string(),z.number()]).nullable()'
    expect(result).toBe(expected)
  })
})
