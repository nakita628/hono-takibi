import { describe, expect, it } from 'vitest'
import { anyOf } from './anyof.js'

// Test run
// pnpm vitest run ./src/helper/anyof.test.ts

describe('anyOf', () => {
  it.concurrent('z.union([MultiPolygonSchema,PolygonSchema])', () => {
    expect(
      anyOf({
        anyOf: [
          {
            $ref: '#/components/schemas/MultiPolygon',
          },
          {
            $ref: '#/components/schemas/Polygon',
          },
        ],
        description: 'Center coordinates',
      }),
    ).toBe('z.union([MultiPolygonSchema,PolygonSchema])')
  })
  it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
    expect(
      anyOf({
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
        nullable: true,
      }),
    ).toBe('z.union([z.string(),z.number()]).nullable()')
  })

  it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
    expect(
      anyOf({
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'number',
          },
        ],
        type: ['null'],
      }),
    ).toBe('z.union([z.string(),z.number()]).nullable()')
  })

  it.concurrent('z.union([z.string().nullable(),FooSchema])', () => {
    expect(
      anyOf({
        anyOf: [{ type: ['string', 'null'] }, { $ref: '#/components/schemas/Foo' }],
      }),
    ).toBe('z.union([z.string().nullable(),FooSchema])')
  })

  it.concurrent('z.union([z.string(),z.number(),z.string().nullable()])', () => {
    expect(
      anyOf({
        anyOf: [{ type: 'string' }, { type: 'number' }, { type: ['string', 'null'] }],
      }),
    ).toBe('z.union([z.string(),z.number(),z.string().nullable()])')
  })

  it.concurrent('z.union([z.string(),z.number()])', () => {
    expect(
      anyOf({
        anyOf: [{ type: 'string' }, { type: 'number' }],
      }),
    ).toBe('z.union([z.string(),z.number()])')
  })

  it.concurrent('z.union([z.string().nullable(),FooSchema,BarSchema])', () => {
    expect(
      anyOf({
        anyOf: [
          { type: ['string', 'null'] },
          { $ref: '#/components/schemas/Foo' },
          { $ref: '#/components/schemas/Bar' },
        ],
      }),
    ).toBe('z.union([z.string().nullable(),FooSchema,BarSchema])')
  })
})
