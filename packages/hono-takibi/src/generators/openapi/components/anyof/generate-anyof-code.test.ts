import { describe, expect, it } from 'vitest'
import { generateAnyOfCode } from './generate-anyof-code'
import { DEFAULT_CONFIG } from '../../../../config'
import type { Schema } from '../../../../types'
import type { Config } from '../../../../config'
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
    config: DEFAULT_CONFIG,
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
