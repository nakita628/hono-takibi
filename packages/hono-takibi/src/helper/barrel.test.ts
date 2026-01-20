import { describe, expect, it } from 'vitest'
import { makeBarrel } from './barrel.js'

describe('barrel helper', () => {
  describe('makeBarrel', () => {
    it.concurrent('generates single export statement', () => {
      const result = makeBarrel({ User: {} })
      expect(result).toBe(`export * from './user'\n`)
    })

    it.concurrent('generates multiple export statements sorted alphabetically', () => {
      const result = makeBarrel({ User: {}, Admin: {}, Post: {} })
      expect(result).toBe(`export * from './admin'
export * from './post'
export * from './user'
`)
    })

    it.concurrent('handles PascalCase keys with lowerFirst', () => {
      const result = makeBarrel({ UserProfile: {} })
      expect(result).toBe(`export * from './userProfile'\n`)
    })

    it.concurrent('returns only newline for empty object', () => {
      const result = makeBarrel({})
      expect(result).toBe('\n')
    })

    it.concurrent('handles single lowercase key', () => {
      const result = makeBarrel({ user: {} })
      expect(result).toBe(`export * from './user'\n`)
    })
  })
})
