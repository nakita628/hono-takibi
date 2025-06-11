import { describe, it, expect } from 'vitest'
import { generateAnyOfCode } from './generate-anyof-code'
import type { Schema } from '../../../../../types'
import type { Config } from '../../../../../config'

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
      const result = generateAnyOfCode(schema, config)
      expect(result).toBe(expected)
    },
  )
})
