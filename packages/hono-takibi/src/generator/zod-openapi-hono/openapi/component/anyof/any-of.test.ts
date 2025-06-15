import { describe, it, expect } from 'vitest'

import type { Config } from '../../../../../config'
import type { Schema } from '../../../../../openapi'
import { anyOf } from '.'

// Test run
// pnpm vitet run ./src/generator/zod-openapi-hono/openapi/component/anyof/generate-anyof-code.test.ts

const generateAnyOfCodeTestCases: {
  schema: Schema
  config: Config
  expected: string
}[] = [
  {
    schema: {
      anyOf: [
        {
          $ref: '#/components/schemas/MultiPolygon',
        },
        {
          $ref: '#/components/schemas/Polygon',
        },
      ],
      description: 'Center coordinates',
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
    expected: 'z.union([MultiPolygonSchema,PolygonSchema])',
  },
]

describe('generateAnyOfCode', () => {
  it.concurrent.each(generateAnyOfCodeTestCases)(
    'generateAnyOfCode($args.schema, $args.config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = anyOf(schema, config)
      expect(result).toBe(expected)
    },
  )
})
