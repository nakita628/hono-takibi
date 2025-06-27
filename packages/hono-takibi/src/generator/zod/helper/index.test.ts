import { describe, it, expect } from 'vitest'
import { stripMaxIfLtExist, stripMinIfgtExist, stripMinMaxExist } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/helper/index.test.ts

describe('transformers module barrel file exports', () => {
  it('should export stripMaxIfLtExist', () => {
    expect(typeof stripMaxIfLtExist).toBe('function')
  })
  it('should export stripMinIfgTExist', () => {
    expect(typeof stripMinIfgtExist).toBe('function')
  })
  it('should export stripMinMaxExist', () => {
    expect(typeof stripMinMaxExist).toBe('function')
  })
})
