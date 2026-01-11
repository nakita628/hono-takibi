export { _enum } from './enum.js'
export { integer } from './integer.js'
export { number } from './number.js'
export { object } from './object.js'
export { string } from './string.js'

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-to-openapi/z/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  const { _enum } = await import('./enum.js')
  const { integer } = await import('./integer.js')
  const { number } = await import('./number.js')
  const { object } = await import('./object.js')
  const { string } = await import('./string.js')

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
}
