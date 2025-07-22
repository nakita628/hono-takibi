import { describe, it, expect } from 'vitest'
import {
  capitalize,
  escapeStringLiteral,
  getToSafeIdentifier,
  removeZodPrefix,
  sanitizeIdentifier,
  stripMaxIfLtExist,
  stripMinIfgtExist,
  stripMinMaxExist,
  getRefName,
} from '.'

// Test run
// pnpm vitest run ./src/core/utils/index.test.ts

describe('utils', () => {
  // capitalize
  describe('capitalize', () => {
    it.concurrent(`capitalize('test') -> 'Test'`, () => {
      const result = capitalize('test')
      const expected = 'Test'
      expect(result).toBe(expected)
    })
    it.concurrent(`capitalize('Test') -> 'Test'`, () => {
      const result = capitalize('Test')
      const expected = 'Test'
      expect(result).toBe(expected)
    })
  })

  // escapeStringLiteral
  describe('escapeStringLiteralingLiteral', () => {
    it.concurrent(`escapeStringLiteral('') -> ''`, () => {
      const result = escapeStringLiteral('')
      const expected = ''
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("'") -> "\\'"`, () => {
      const result = escapeStringLiteral("'")
      const expected = "\\'"
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("'test") -> "\\'test"`, () => {
      const result = escapeStringLiteral("'test")
      const expected = "\\'test"
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("It's a test") -> "It\\'s a test"`, () => {
      const result = escapeStringLiteral("It's a test")
      const expected = "It\\'s a test"
      expect(result).toBe(expected)
    })
    it.concurrent(
      `escapeStringLiteral('test "string" with quotes') -> 'test "string" with quotes'`,
      () => {
        const result = escapeStringLiteral('test "string" with quotes')
        const expected = 'test "string" with quotes'
        expect(result).toBe(expected)
      },
    )
    it.concurrent(
      `escapeStringLiteral("Retrieve Santa's wishlist for Christmas.") -> "Retrieve Santa\\'s wishlist for Christmas."`,
      () => {
        const result = escapeStringLiteral("Retrieve Santa's wishlist for Christmas.")
        const expected = "Retrieve Santa\\'s wishlist for Christmas."
        expect(result).toBe(expected)
      },
    )
    it.concurrent(`escapeStringLiteral("Santa's wishlist.") -> "Santa\\'s wishlist."`, () => {
      const result = escapeStringLiteral("Santa's wishlist.")
      const expected = "Santa\\'s wishlist."
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("back\\\\slash") -> "back\\\\\\\\slash"`, () => {
      const result = escapeStringLiteral('back\\slash')
      const expected = 'back\\\\slash'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("full　width　space") -> "full width space"`, () => {
      const result = escapeStringLiteral('full　width　space')
      const expected = 'full width space'
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("multi\\nline\\ntext") -> "multi line text"`, () => {
      const result = escapeStringLiteral('multi\nline\ntext')
      const expected = 'multi line text'
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("\\u200Bhidden") -> "hidden"`, () => {
      const result = escapeStringLiteral('\u200Bhidden')
      const expected = 'hidden'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("   trim me   ") -> "trim me"`, () => {
      const result = escapeStringLiteral('   trim me   ')
      const expected = 'trim me'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("\\t tabbed") -> "tabbed"`, () => {
      const result = escapeStringLiteral('\t tabbed')
      const expected = 'tabbed'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("a\\nb\\tc\\u200Bd\\uFEFF") -> "a b c d"`, () => {
      const result = escapeStringLiteral('a\nb\tc\u200Bd\uFEFF')
      const expected = 'a b c d'
      expect(result).toBe(expected)
    })
  })

  // getToSafeIdentifier
  describe('getToSafeIdentifier', () => {
    it('should return the string as-is if it is a valid identifier', () => {
      expect(getToSafeIdentifier('validName')).toBe('validName')
      expect(getToSafeIdentifier('_underscore')).toBe('_underscore')
      expect(getToSafeIdentifier('$dollar')).toBe('$dollar')
      expect(getToSafeIdentifier('camelCase123')).toBe('camelCase123')
    })

    it('should quote the string if it contains invalid characters', () => {
      expect(getToSafeIdentifier('invalid-name')).toBe('"invalid-name"')
      expect(getToSafeIdentifier('123startWithNumber')).toBe('"123startWithNumber"')
      expect(getToSafeIdentifier('has space')).toBe('"has space"')
      expect(getToSafeIdentifier('has.dot')).toBe('"has.dot"')
      expect(getToSafeIdentifier('hyphen-ated')).toBe('"hyphen-ated"')
    })

    it('should quote reserved keywords', () => {
      expect(getToSafeIdentifier('class')).toBe('class')
      expect(getToSafeIdentifier('function')).toBe('function')
    })

    it('should handle edge cases correctly', () => {
      expect(getToSafeIdentifier('')).toBe('""')
      expect(getToSafeIdentifier(' ')).toBe('" "')
      expect(getToSafeIdentifier('-')).toBe('"-"')
    })
  })

  // removeZodPrefix
  describe('removeZodPrefix', () => {
    it.concurrent(`removeZodPrefix('z.string().min(1)') -> 'string().min(1)'`, () => {
      const result = removeZodPrefix('z.string().min(1)')
      const expected = 'string().min(1)'
      expect(result).toBe(expected)
    })
    it.concurrent(`removeZodPrefix('z.number().min(1)') -> 'number().min(1)'`, () => {
      const result = removeZodPrefix('z.number().min(1)')
      const expected = 'number().min(1)'
      expect(result).toBe(expected)
    })
  })

  // sanitizeIdentifier
  describe('sanitizeIdentifier', () => {
    it.concurrent(`sanitizeIdentifier('test') -> 'test'`, () => {
      expect(sanitizeIdentifier('test')).toBe('test')
    })
    it.concurrent(`sanitizeIdentifier('test123') -> 'test123'`, () => {
      expect(sanitizeIdentifier('test123')).toBe('test123')
    })
    it.concurrent(`sanitizeIdentifier('_test') -> '_test'`, () => {
      expect(sanitizeIdentifier('_test')).toBe('_test')
    })
    it.concurrent(`sanitizeIdentifier('$test') -> '$test'`, () => {
      expect(sanitizeIdentifier('$test')).toBe('$test')
    })
    it.concurrent(`sanitizeIdentifier('foo-bar') -> 'foo_bar'`, () => {
      expect(sanitizeIdentifier('foo-bar')).toBe('foo_bar')
    })
    it.concurrent(`sanitizeIdentifier('foo@bar!baz') -> 'foo_bar_baz'`, () => {
      expect(sanitizeIdentifier('foo@bar!baz')).toBe('foo_bar_baz')
    })
    it.concurrent(`sanitizeIdentifier('post.title') -> 'post_title'`, () => {
      expect(sanitizeIdentifier('post.title')).toBe('post_title')
    })
    it.concurrent(`(sanitizeIdentifier('テスト') -> '___'`, () => {
      expect(sanitizeIdentifier('テスト')).toBe('___')
    })
    it.concurrent(`sanitizeIdentifier('') -> ''`, () => {
      expect(sanitizeIdentifier('')).toBe('')
    })
  })

  // stripMaxIfLtExist
  describe('stripMaxIfLtExist', () => {
    it.concurrent(`stripMaxIfLtExist('z.number().max(1).lt(1)', 1) -> 'z.number().lt(1)'`, () => {
      const result = stripMaxIfLtExist('z.number().max(1).lt(1)', 1)
      const expected = 'z.number().lt(1)'
      expect(result).toBe(expected)
    })
  })

  // stripMinIfgtExist
  describe('stripMinIfgtExist', () => {
    it.concurrent(`stripMinIfgtExist('z.number().min(1).gt(1)', 1) -> 'z.number().gt(1)'`, () => {
      const result = stripMinIfgtExist('z.number().min(1).gt(1)', 1)
      const expected = 'z.number().gt(1)'
      expect(result).toBe(expected)
    })
  })

  // stripMinMaxExist
  describe('stripMinMaxExist', () => {
    it.concurrent(`stripMinMaxExist('z.string().min(1).max(1)', 1, 1) -> 'z.string()'`, () => {
      const result = stripMinMaxExist('z.string().min(1).max(1)', 1, 1)
      const expected = 'z.string()'
      expect(result).toBe(expected)
    })
  })

  // getRefName
  describe('getRefName Test', () => {
    it.concurrent(`getRefName('#/components/schemas/Test') -> 'Test'`, () => {
      const result = getRefName('#/components/schemas/Test')
      const expected = 'Test'
      expect(result).toBe(expected)
    })
  })
})
