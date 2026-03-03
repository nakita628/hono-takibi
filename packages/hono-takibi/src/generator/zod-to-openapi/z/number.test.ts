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

describe('x-error-message (number base)', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'number', 'x-error-message': '数値必須' }, 'z.number({error:"数値必須"})'],
    [
      { type: 'number', format: 'float', 'x-error-message': 'float必須' },
      'z.float32({error:"float必須"})',
    ],
    [
      { type: 'number', format: 'float32', 'x-error-message': 'float32必須' },
      'z.float32({error:"float32必須"})',
    ],
    [
      { type: 'number', format: 'float64', 'x-error-message': 'float64必須' },
      'z.float64({error:"float64必須"})',
    ],
    // x-error-message + constraints
    [
      { type: 'number', minimum: 0, 'x-error-message': '数値必須' },
      'z.number({error:"数値必須"}).min(0)',
    ],
    // No x-error-message → existing behavior
    [{ type: 'number' }, 'z.number()'],
  ])('number(%o) → %s', (input, expected) => {
    expect(number(input)).toBe(expected)
  })
})

describe('x-minimum-message', () => {
  it.concurrent.each<[Schema, string]>([
    [
      { type: 'number', minimum: 0, 'x-minimum-message': '0以上' },
      'z.number().min(0,{error:"0以上"})',
    ],
    [
      {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: true,
        'x-minimum-message': '正の数',
      },
      'z.number().positive({error:"正の数"})',
    ],
    [
      {
        type: 'number',
        minimum: 0,
        exclusiveMinimum: false,
        'x-minimum-message': '非負',
      },
      'z.number().nonnegative({error:"非負"})',
    ],
    [
      {
        type: 'number',
        minimum: 100,
        exclusiveMinimum: true,
        'x-minimum-message': '100超',
      },
      'z.number().gt(100,{error:"100超"})',
    ],
    [
      { type: 'number', exclusiveMinimum: 5, 'x-minimum-message': '5超' },
      'z.number().gt(5,{error:"5超"})',
    ],
  ])('number(%o) → %s', (input, expected) => {
    expect(number(input)).toBe(expected)
  })
})

describe('x-maximum-message', () => {
  it.concurrent.each<[Schema, string]>([
    [
      { type: 'number', maximum: 100, 'x-maximum-message': '100以下' },
      'z.number().max(100,{error:"100以下"})',
    ],
    [
      {
        type: 'number',
        maximum: 0,
        exclusiveMaximum: true,
        'x-maximum-message': '負の数',
      },
      'z.number().negative({error:"負の数"})',
    ],
    [
      {
        type: 'number',
        maximum: 0,
        exclusiveMaximum: false,
        'x-maximum-message': '非正',
      },
      'z.number().nonpositive({error:"非正"})',
    ],
    [
      {
        type: 'number',
        maximum: 100,
        exclusiveMaximum: true,
        'x-maximum-message': '100未満',
      },
      'z.number().lt(100,{error:"100未満"})',
    ],
    [
      { type: 'number', exclusiveMaximum: 50, 'x-maximum-message': '50未満' },
      'z.number().lt(50,{error:"50未満"})',
    ],
  ])('number(%o) → %s', (input, expected) => {
    expect(number(input)).toBe(expected)
  })
})

describe('x-minimum-message and x-maximum-message combined', () => {
  it.concurrent.each<[Schema, string]>([
    [
      {
        type: 'number',
        minimum: 0,
        maximum: 100,
        'x-minimum-message': '0以上',
        'x-maximum-message': '100以下',
      },
      'z.number().min(0,{error:"0以上"}).max(100,{error:"100以下"})',
    ],
  ])('number(%o) → %s', (input, expected) => {
    expect(number(input)).toBe(expected)
  })
})
