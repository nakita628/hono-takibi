import { describe, expect, it } from 'vitest'
import { oneOf } from './oneof.js'

// Test run
// pnpm vitest run ./src/helper/oneof.test.ts

describe('oneOf', () => {
  it.concurrent('oneOf with oneOf', () => {
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

  it.concurrent('oneOf with $ref', () => {
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

  it.concurrent('oneOf with $ref many', () => {
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
})
