import { describe, it, expect } from 'vitest'
import { isTs } from './index'

// Test run
// pnpm vitest run ./src/cli/validator/is-ts.test.ts

describe('isTs', () => {
  it('should return true for .ts files', () => {
    expect(isTs('index.ts')).toBe(true)
    expect(isTs('src/app.ts')).toBe(true)
  })

  it('should return false for .d.ts files', () => {
    expect(isTs('types.d.ts')).toBe(false)
    expect(isTs('src/types/global.d.ts')).toBe(false)
  })

  it('should return false for non-.ts files', () => {
    expect(isTs('style.css')).toBe(false)
    expect(isTs('main.js')).toBe(false)
  })

  it('should return false for uppercase .TS', () => {
    expect(isTs('index.TS')).toBe(false)
  })
})
