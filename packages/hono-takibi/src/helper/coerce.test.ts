import { describe, expect, it } from 'vite-plus/test'

import { coerce } from './coerce.js'

describe('coerce', () => {
  describe('number type', () => {
    it.concurrent('z.number() → z.coerce.number()', () => {
      expect(coerce('z.number()', 'number')).toBe('z.coerce.number()')
    })

    it.concurrent('z.number() with constraints → z.coerce.number() with constraints', () => {
      expect(coerce('z.number().min(0).max(100)', 'number')).toBe(
        'z.coerce.number().min(0).max(100)',
      )
    })

    it.concurrent('z.float32() → z.coerce.number().pipe(z.float32())', () => {
      expect(coerce('z.float32()', 'number', 'float')).toBe('z.coerce.number().pipe(z.float32())')
    })

    it.concurrent('z.float32() format=float32 → z.coerce.number().pipe(z.float32())', () => {
      expect(coerce('z.float32()', 'number', 'float32')).toBe('z.coerce.number().pipe(z.float32())')
    })

    it.concurrent('z.float32() with constraints → z.coerce.number().pipe(z.float32() with constraints)', () => {
      expect(coerce('z.float32().min(0).max(1)', 'number', 'float')).toBe(
        'z.coerce.number().pipe(z.float32().min(0).max(1))',
      )
    })

    it.concurrent('z.float32() with suffix → z.coerce.number().pipe(z.float32()) with suffix', () => {
      expect(coerce('z.float32().exactOptional().openapi({})', 'number', 'float')).toBe(
        'z.coerce.number().pipe(z.float32()).exactOptional().openapi({})',
      )
    })

    it.concurrent('z.float64() → z.coerce.number().pipe(z.float64())', () => {
      expect(coerce('z.float64()', 'number', 'float64')).toBe('z.coerce.number().pipe(z.float64())')
    })

    it.concurrent('z.float64() with constraints → z.coerce.number().pipe(z.float64() with constraints)', () => {
      expect(coerce('z.float64().min(0)', 'number', 'float64')).toBe(
        'z.coerce.number().pipe(z.float64().min(0))',
      )
    })
  })

  describe('integer type', () => {
    it.concurrent('z.int() → z.coerce.number().pipe(z.int())', () => {
      expect(coerce('z.int()', 'integer')).toBe('z.coerce.number().pipe(z.int())')
    })

    it.concurrent('z.int() with constraints → z.coerce.number().pipe(z.int() with constraints)', () => {
      expect(coerce('z.int().min(1)', 'integer')).toBe('z.coerce.number().pipe(z.int().min(1))')
    })

    it.concurrent('z.int() with suffix → z.coerce.number().pipe(z.int()) with suffix', () => {
      expect(coerce('z.int().exactOptional().openapi({})', 'integer')).toBe(
        'z.coerce.number().pipe(z.int()).exactOptional().openapi({})',
      )
    })

    it.concurrent('z.int32() → z.coerce.number().pipe(z.int32())', () => {
      expect(coerce('z.int32()', 'integer', 'int32')).toBe('z.coerce.number().pipe(z.int32())')
    })

    it.concurrent('z.int64() → z.coerce.bigint().pipe(z.int64())', () => {
      expect(coerce('z.int64()', 'integer', 'int64')).toBe('z.coerce.bigint().pipe(z.int64())')
    })

    it.concurrent('z.bigint() format=bigint → z.coerce.bigint()', () => {
      expect(coerce('z.bigint()', 'integer', 'bigint')).toBe('z.coerce.bigint()')
    })
  })

  describe('passthrough', () => {
    it.concurrent('returns baseSchema unchanged for non-number/integer types', () => {
      expect(coerce('z.string()', 'string')).toBe('z.string()')
    })

    it.concurrent('returns baseSchema unchanged for boolean type', () => {
      expect(coerce('z.boolean()', 'boolean')).toBe('z.boolean()')
    })
  })
})
