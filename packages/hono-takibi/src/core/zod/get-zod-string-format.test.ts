import type { FormatString } from '../../types'
import { describe, it, expect } from 'vitest'
import { getZodFormatString } from './get-zod-string-format'

const getZodFormatStringTestCases: {
  format: FormatString
  expected: string
}[] = [
  { format: 'email', expected: '.email()' },
  { format: 'uri', expected: '.url()' },
  { format: 'emoji', expected: '.emoji()' },
  { format: 'uuid', expected: '.uuid()' },
  { format: 'nanoid', expected: '.nanoid()' },
  { format: 'cuid', expected: '.cuid()' },
  { format: 'cuid2', expected: '.cuid2()' },
  { format: 'ulid', expected: '.ulid()' },
  { format: 'ip', expected: '.ip()' },
  { format: 'date-time', expected: '.datetime()' },
  { format: 'cidr', expected: '.cidr()' },
  { format: 'trim', expected: '.trim()' },
  { format: 'toLowerCase', expected: '.toLowerCase()' },
  { format: 'toUpperCase', expected: '.toUpperCase()' },
  { format: 'date', expected: '.date()' },
  { format: 'time', expected: '.time()' },
  { format: 'duration', expected: '.duration()' },
  { format: 'base64', expected: '.base64()' },
  { format: 'binary', expected: '.instanceof(Uint8Array)' },
]

describe('getZodStringFormatData', () => {
  it.concurrent.each(getZodFormatStringTestCases)(
    `getZodStringFormatData('%s') -> '%s'`,
    ({ format, expected }) => {
      const result = getZodFormatString(format)
      expect(result).toBe(expected)
    },
  )
})
