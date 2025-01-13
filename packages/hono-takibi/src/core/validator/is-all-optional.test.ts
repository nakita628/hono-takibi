import { describe, expect, it } from 'vitest'
import { isAllOptional } from './is-all-optional'

const isAllOptionalTestCases = [
  {
    properties: [
      'id:z.number().int().openapi({example:10}).optional()',
      'petId:z.number().int().openapi({example:198772}).optional()',
      'quantity:z.number().int().openapi({example:7}).optional()',
      'shipDate:z.string().datetime().optional()',
      'status:z.enum(["placed","approved","delivered"]).openapi({example:"approved"}).optional()',
      'complete:z.boolean().optional()',
    ],
    expected: true,
  },
  {
    properties: ['id:z.string()', 'petId:z.number()'],
    expected: false,
  },
]

describe('isAllOptional', () => {
  it.concurrent.each(isAllOptionalTestCases)(
    'isAllOptional($properties) -> $expected',
    async ({ properties, expected }) => {
      const result = isAllOptional(properties)
      expect(result).toBe(expected)
    },
  )
})
