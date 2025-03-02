import { describe, expect, it } from 'vitest'
import { generateZodDefault } from './generate-zod-default'
import type { DefaultValue } from '../../types'

const generateZodDefaultTestCases: { defaultValue: DefaultValue; expected: string }[] = [
  {
    defaultValue: 1,
    expected: '.default(1)',
  },
  {
    defaultValue: 10,
    expected: '.default(10)',
  },
]

describe('generateZodDefault', () => {
  it.concurrent.each(generateZodDefaultTestCases)(
    'generateZodDefault($defaultValue) -> $expected',
    async ({ defaultValue, expected }) => {
      const result = generateZodDefault(defaultValue)
      expect(result).toBe(expected)
    },
  )
})
