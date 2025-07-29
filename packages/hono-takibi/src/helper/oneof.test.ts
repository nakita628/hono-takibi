import { describe, expect, it } from 'vitest'
import { oneOf } from './oneof.js'

// Test run
// pnpm vitest run ./src/helper/oneof.test.ts

describe('oneOf', () => {
  it.concurrent('z.union([z.number(),z.string()])', () => {
    expect(
      oneOf({
        oneOf: [
          {
            type: 'number',
          },
          {
            type: 'string',
          },
        ],
      }),
    ).toBe('z.union([z.number(),z.string()])')
  })

  it.concurrent('z.union([ExampleSchemaSchema,z.boolean()])', () => {
    expect(
      oneOf({
        oneOf: [
          {
            $ref: '#/components/schemas/ExampleSchema',
          },
          {
            type: 'boolean',
          },
        ],
      }),
    ).toBe('z.union([ExampleSchemaSchema,z.boolean()])')
  })

  it.concurrent('z.union([ExampleSchemaSchema,AnotherSchemaSchema])', () => {
    expect(
      oneOf({
        oneOf: [
          {
            $ref: '#/components/schemas/ExampleSchema',
          },
          {
            $ref: '#/components/schemas/AnotherSchema',
          },
        ],
      }),
    ).toBe('z.union([ExampleSchemaSchema,AnotherSchemaSchema])')
  })

  it.concurrent('z.union([z.string(),z.number()]).nullable()', () => {
    expect(
      oneOf({
        oneOf: [
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
      oneOf({
        oneOf: [
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
})
