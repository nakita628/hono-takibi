import { describe, it, expect } from 'vitest'
import type { Config } from '../../../../../config'
import type { Schema } from '../../../../../openapi'
import { oneOf } from './one-of'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/component/oneof/generate-oneof-code.test.ts

const oneOfTestCases: {
  schema: Schema
  config: Config
  expected: string
}[] = [
  {
    schema: {
      oneOf: [
        {
          type: 'number',
        },
        {
          type: 'string',
        },
      ],
    },
    config: {
      schema: {
        name: 'PascalCase',
        export: false,
      },
      type: {
        name: 'PascalCase',
        export: false,
      },
    },
    expected: 'z.union([z.number(),z.string()])',
  },
]

describe('oneOf', () => {
  it.concurrent.each(oneOfTestCases)(
    'oneOf($args.schema, $args.config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = oneOf(schema, config)
      expect(result).toBe(expected)
    },
  )
})
