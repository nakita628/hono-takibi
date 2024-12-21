import { describe, expect, it } from 'vitest'
import { generateZodRecordSchema } from './generate-zod-record-schema'
import type { Format, Type } from '../../types'

const generateZodRecordSchemaTestCases: {
  additionalProperties: { type: Type; format: Format }
  expected: string
}[] = [
  {
    additionalProperties: { type: 'integer', format: 'int32' },
    expected: 'z.record(z.string(), z.number().int())',
  },
  {
    additionalProperties: { type: 'string', format: 'email' },
    expected: 'z.record(z.string(), z.string().email())',
  },
]

describe('generateZodRecordSchema', () => {
  it.concurrent.each(generateZodRecordSchemaTestCases)(
    'generateZodRecordSchema($additionalProperties) -> $expected',
    async ({ additionalProperties, expected }) => {
      const result = generateZodRecordSchema(additionalProperties)
      expect(result).toBe(expected)
    },
  )
})
