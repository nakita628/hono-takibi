import { describe, expect, it } from 'vitest'
import type { Schema } from '../../../openapi/index.js'
import { number } from './number.js'

describe('number', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'number' }, 'z.number()'],
    [
      {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: true,
      },
      'z.number().positive()',
    ],
    [
      {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: false,
      },
      'z.number().nonnegative()',
    ],
    [{ type: 'number', maximum: 0, exclusiveMaximum: true }, 'z.number().negative()'],
    [{ type: 'number', maximum: 0, exclusiveMaximum: false }, 'z.number().nonpositive()'],
    [{ type: 'number', minimum: 100 }, 'z.number().min(100)'],
    [{ type: 'number', minimum: 0 }, 'z.number().min(0)'],
    [{ type: 'number', minimum: 100, exclusiveMinimum: true }, 'z.number().gt(100)'],
    [{ type: 'number', maximum: 100 }, 'z.number().max(100)'],
    [{ type: 'number', maximum: 0 }, 'z.number().max(0)'],
    [{ type: 'number', maximum: 100, exclusiveMaximum: true }, 'z.number().lt(100)'],
    [{ type: 'number', multipleOf: 2 }, 'z.number().multipleOf(2)'],
  ])('number(%o) → %s', (input, expected) => {
    expect(number(input)).toBe(expected)
  })
})

describe('type: number, format: float', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'number', format: 'float' }, 'z.float32()'],
    [{ type: 'number', format: 'float64' }, 'z.float64()'],
  ])('number(%o) → %s', (input, expected) => {
    expect(number(input)).toBe(expected)
  })
})
