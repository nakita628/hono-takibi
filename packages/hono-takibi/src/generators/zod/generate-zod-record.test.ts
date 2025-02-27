import { describe, expect, it } from 'vitest'
import { generateZodRecord } from './generate-zod-record'
import type { Format, Type } from '../../types'
import type { Config } from '../../config'
import { DEFAULT_CONFIG } from '../../data/test-data'

const generateZodRecordTestCases: {
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

describe('generateZodRecord', () => {
  it.concurrent.each(generateZodRecordTestCases)(
    'generateZodRecord($additionalProperties, $config) -> $expected',
    async ({ additionalProperties, config, expected }) => {
      const result = generateZodRecord(additionalProperties, config)
      expect(result).toBe(expected)
    },
  )
})
