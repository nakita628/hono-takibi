import { describe, expect, it } from 'vitest'
import { generateZodUnion } from './generate-zod-union'

const generateZodUnionTestCases = [
  {
    schemas: ['multiPolygonSchema', 'polygonSchema'],
    expected: 'z.union([multiPolygonSchema,polygonSchema])',
  },
]

describe('generateZodUnion', () => {
  it.concurrent.each(generateZodUnionTestCases)(
    'generateZodUnion($schemas) -> $expected',
    ({ schemas, expected }) => {
      const result = generateZodUnion(schemas)
      expect(result).toBe(expected)
    },
  )
})
