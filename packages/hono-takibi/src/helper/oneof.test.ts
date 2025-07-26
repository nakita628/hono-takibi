import { describe, expect, it } from 'vitest'
import { oneOf } from './oneof.js'

// Test run
// pnpm vitest run ./src/helper/oneof.test.ts

describe('oneOf', () => {
  it.concurrent('oneOf with oneOf', () => {
    const result = oneOf({
      oneOf: [
        {
          type: 'number',
        },
        {
          type: 'string',
        },
      ],
    })

    const expected = 'z.union([z.number(),z.string()])'
    expect(result).toBe(expected)
  })

  it.concurrent('oneOf with $ref', () => {
    const result = oneOf({
      oneOf: [
        {
          $ref: '#/components/schemas/ExampleSchema',
        },
        {
          type: 'boolean',
        },
      ],
    })

    const expected = 'z.union([ExampleSchemaSchema,z.boolean()])'
    expect(result).toBe(expected)
  })

  it.concurrent('oneOf with $ref many', () => {
    const result = oneOf({
      oneOf: [
        {
          $ref: '#/components/schemas/ExampleSchema',
        },
        {
          $ref: '#/components/schemas/AnotherSchema',
        },
      ],
    })

    const expected = 'z.union([ExampleSchemaSchema,AnotherSchemaSchema])'
    expect(result).toBe(expected)
  })
})
