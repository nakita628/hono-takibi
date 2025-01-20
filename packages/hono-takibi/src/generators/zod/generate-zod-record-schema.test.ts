import { describe, expect, it } from 'vitest'
import { generateZodRecordSchema } from './generate-zod-record-schema'
import type { Format, Type } from '../../types'
import type { Config } from '../../config'
import { DEFAULT_CONFIG } from '../../data/test-data'

const generateZodRecordSchemaTestCases: {
  additionalProperties: { type: Type; format: Format }
  config: Config
  expected: string
}[] = [
  {
    additionalProperties: { type: 'integer', format: 'int32' },
    config: DEFAULT_CONFIG,
    expected: 'z.record(z.string(),z.number().int())',
  },
  {
    additionalProperties: { type: 'string', format: 'email' },
    config: DEFAULT_CONFIG,
    expected: 'z.record(z.string(),z.string().email())',
  },
]

describe('generateZodRecordSchema', () => {
  it.concurrent.each(generateZodRecordSchemaTestCases)(
    'generateZodRecordSchema($additionalProperties, $config) -> $expected',
    async ({ additionalProperties, config, expected }) => {
      const result = generateZodRecordSchema(additionalProperties, config)
      expect(result).toBe(expected)
    },
  )
})
