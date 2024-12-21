import { describe, expect, it } from 'vitest'
import { getZodFormatString } from './get-zod-string-format'
import { Format } from '../../types'

const getZodFormatStringTestCases: [Format, string][] = [
  // ['max', '.max()'],
  // ['min', '.min()'],
  // ['length', '.length()'],
  ['email', '.email()'],
  ['uri', '.url()'],
  ['emoji', '.emoji()'],
  ['uuid', '.uuid()'],
  // ['nanoid', 'nanoid()'],
  ['cuid', '.cuid()'],
  ['cuid2', '.cuid2()'],
  ['ulid', '.ulid()'],
  ['ip', '.ip()'],
  ['date-time', '.datetime()'],
  ['cidr', '.cidr()'],
  ['trim', '.trim()'],
  ['toLowerCase', '.toLowerCase()'],
  ['toUpperCase', '.toUpperCase()'],
  ['date', '.date()'],
  ['time', '.time()'],
  ['duration', '.duration()'],
  ['base64', '.base64()'],
  ['int32', 'z.number()'],
  ['int64', 'z.number()'],
  ['float', 'z.number()'],
  ['double', 'z.number()'],
  ['binary', 'z.instanceof(Uint8Array)'],
]

describe('getZodStringFormatData', () => {
  it.concurrent.each(getZodFormatStringTestCases)(
    `getZodStringFormatData('%s') -> '%s'`,
    (input, expected) => {
      const result = getZodFormatString(input)
      expect(result).toBe(expected)
    },
  )
})
