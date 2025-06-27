import { describe, it, expect } from 'vitest'
import { stripMaxIfLtExist, stripMinIfgTExist, stripMinMaxExist } from '.'

// Test run
// pnpm vitest run ./src/generator/zod/helper/index.test.ts

describe('transformers module barrel file exports', () => {
  it('should export stripMaxIfLtExist', () => {
    expect(typeof stripMaxIfLtExist).toBe('function')
  })
  it('should export stripMinIfgTExist', () => {
    expect(typeof stripMinIfgTExist).toBe('function')
  })
  it('should export stripMinMaxExist', () => {
    expect(typeof stripMinMaxExist).toBe('function')
  })
})
