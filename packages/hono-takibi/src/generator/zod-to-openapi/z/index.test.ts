import { describe, expect, it } from 'vitest'
import { _enum, integer, number, object, string } from './index.js'

describe('z barrel file exports', () => {
  it.concurrent('should export _enum', () => {
    expect(typeof _enum).toBe('function')
  })
  it.concurrent('should export integer', () => {
    expect(typeof integer).toBe('function')
  })
  it.concurrent('should export number', () => {
    expect(typeof number).toBe('function')
  })
  it.concurrent('should export object', () => {
    expect(typeof object).toBe('function')
  })
  it.concurrent('should export string', () => {
    expect(typeof string).toBe('function')
  })
})
