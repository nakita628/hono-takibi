import { describe, expect, it } from 'vitest'
import { getZodFormatString } from './get-zod-string-format'
import { Format } from '../../types'

const getZodFormatStringTestCases: [Format, string][] = [
  ['email', '.email()'],
  ['uri', '.url()'],
  ['emoji', '.emoji()'],
  ['uuid', '.uuid()'],
  ['cuid', '.cuid()'],
  ['cuid2', '.cuid2()'],
  ['ulid', '.ulid()'],
  ['ip', '.ip()'],
  ['date-time', '.datetime()'],
  ['int32', 'z.number()'],
  ['int64', 'z.number()'],
  ['float', 'z.number()'],
  ['double', 'z.number()'],
  ['binary', 'z.instanceof(Uint8Array)'],
]

describe('getZodStringFormatData', () => {
  it.concurrent.each(getZodFormatStringTestCases)(`getZodStringFormatData('%s') -> '%s'`, (input, expected) => {
    const result = getZodFormatString(input)
    expect(result).toBe(expected)
  })
})
