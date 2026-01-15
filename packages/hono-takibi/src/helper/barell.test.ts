import { describe, expect, it } from 'vitest'
import { makeBarell } from './barell.js'

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
