import { describe, expect, it } from 'vitest'
import {
  _default,
  _enum,
  array,
  coerce,
  gt,
  infer,
  integer,
  intersection,
  length,
  lt,
  max,
  min,
  number,
  object,
  partial,
  record,
  regex,
  schema,
  string,
  stringbool,
  union,
} from '.'

// Test run
// pnpm vitest run ./src/generator/zod/index.test.ts

describe('zod module barrel file exports', () => {
  it('should export array', () => {
    expect(typeof array).toBe('function')
  })
  it('should export coerce', () => {
    expect(typeof coerce).toBe('function')
  })
  it('should export _default', () => {
    expect(typeof _default).toBe('function')
  })
  it('should export _enum', () => {
    expect(typeof _enum).toBe('function')
  })
  it('should export gt', () => {
    expect(typeof gt).toBe('function')
  })
  it('should export infer', () => {
    expect(typeof infer).toBe('function')
  })
  it('should export integer', () => {
    expect(typeof integer).toBe('function')
  })
  it('should export intersection', () => {
    expect(typeof intersection).toBe('function')
  })
  it('should export length', () => {
    expect(typeof length).toBe('function')
  })
  it('should export lt', () => {
    expect(typeof lt).toBe('function')
  })
  it('should export max', () => {
    expect(typeof max).toBe('function')
  })
  it('should export min', () => {
    expect(typeof min).toBe('function')
  })
  it('should export number', () => {
    expect(typeof number).toBe('function')
  })
  it('should export object', () => {
    expect(typeof object).toBe('function')
  })
  it('should export partial', () => {
    expect(typeof partial).toBe('function')
  })
  it('should export record', () => {
    expect(typeof record).toBe('function')
  })
  it('should export regex', () => {
    expect(typeof regex).toBe('function')
  })
  it('should export schema', () => {
    expect(typeof schema).toBe('function')
  })
  it('should export string', () => {
    expect(typeof string).toBe('function')
  })
  it('should export union', () => {
    expect(typeof union).toBe('function')
  })
  it('should export stringbool', () => {
    expect(typeof stringbool).toBe('function')
  })
})
