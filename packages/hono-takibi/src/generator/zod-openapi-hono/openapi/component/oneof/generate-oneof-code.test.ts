import { describe, expect, it } from 'vitest'
import { generateOneOfCode } from './generate-oneof-code'
import { DEFAULT_CONFIG } from '../../../../../../data/test-config'
import type { Schema } from '../../../../../types'
import type { Config } from '../../../../../config'

const generateAnyOfCodeTestCases: {
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
    config: DEFAULT_CONFIG,
    expected: 'z.union([z.number(),z.string()])',
  },
]

describe('generateAnyOfCode', () => {
  it.concurrent.each(generateAnyOfCodeTestCases)(
    'generateAnyOfCode($args.schema, $args.config) -> $expected',
    async ({ schema, config, expected }) => {
      const result = generateOneOfCode(schema, config)
      expect(result).toBe(expected)
    },
  )
})
