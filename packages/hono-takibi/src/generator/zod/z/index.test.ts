import { describe, expect, it } from 'vitest'
import { _enum, array, boolean, date, integer, number, object, string } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod/z/index.test.ts

describe('z barrel file exports', () => {
  it('should export array', () => {
    expect(typeof array).toBe('function')
  })
  it('should export boolean', () => {
    expect(typeof boolean).toBe('function')
  })
  it('should export date', () => {
    expect(typeof date).toBe('function')
  })
  it('should export _enum', () => {
    expect(typeof _enum).toBe('function')
  })
  it('should export integer', () => {
    expect(typeof integer).toBe('function')
  })
  it('should export number', () => {
    expect(typeof number).toBe('function')
  })
  it('should export object', () => {
    expect(typeof object).toBe('function')
  })
  it('should export string', () => {
    expect(typeof string).toBe('function')
  })
})
