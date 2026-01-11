import { lowerFirst } from '../utils/index.js'

export function makeBarell(value: { [k: string]: unknown }): string {
  return `${Object.keys(value)
    .sort()
    .map((k) => `export * from './${lowerFirst(k)}'`)
    .join('\n')}\n`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/barell.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('barell helper', () => {
    describe('makeBarell', () => {
      it.concurrent('generates single export statement', () => {
        const result = makeBarell({ User: {} })
        expect(result).toBe(`export * from './user'\n`)
      })

      it.concurrent('generates multiple export statements sorted alphabetically', () => {
        const result = makeBarell({ User: {}, Admin: {}, Post: {} })
        expect(result).toBe(`export * from './admin'
export * from './post'
export * from './user'
`)
      })

      it.concurrent('handles PascalCase keys with lowerFirst', () => {
        const result = makeBarell({ UserProfile: {} })
        expect(result).toBe(`export * from './userProfile'\n`)
      })

      it.concurrent('returns only newline for empty object', () => {
        const result = makeBarell({})
        expect(result).toBe('\n')
      })

      it.concurrent('handles single lowercase key', () => {
        const result = makeBarell({ user: {} })
        expect(result).toBe(`export * from './user'\n`)
      })
    })
  })
}
