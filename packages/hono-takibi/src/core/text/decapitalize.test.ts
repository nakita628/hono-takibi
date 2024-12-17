import { describe, expect, it } from 'vitest'
import { decapitalize } from './decapitalize'

const decapitalizeTestCases = [
  { str: 'Posts', expected: 'posts' },
  { str: 'User', expected: 'user' },
  { str: 'Api', expected: 'api' },
  { str: 'UserProfile', expected: 'userProfile' },
  { str: 'UserPreferences', expected: 'userPreferences' },
  { str: 'UserAvatar', expected: 'userAvatar' },
  { str: 'UserFollowers', expected: 'userFollowers' },
  { str: 'UserFollowing', expected: 'userFollowing' },
  { str: 'UserBlocked', expected: 'userBlocked' },
  { str: 'userSettings', expected: 'userSettings' },
]

describe('decapitalize', () => {
  it.concurrent.each(decapitalizeTestCases)(
    'decapitalize($str) -> $expected',
    async ({ str, expected }) => {
      const result = decapitalize(str)
      expect(result).toBe(expected)
    },
  )
})
