import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../../../openapi/index.js'
import { string } from './string.js'

describe('string', () => {
  it.concurrent.each<[Schema, string]>([
    [{ type: 'string' }, 'z.string()'],
    [{ type: 'string', minLength: 1, maxLength: 10 }, 'z.string().min(1).max(10)'],
    [{ type: 'string', pattern: '^\\w+$' }, 'z.string().regex(/^\\w+$/)'],
    [{ type: 'string', format: 'email' }, 'z.email()'],
    [{ type: 'string', format: 'uuid' }, 'z.uuid()'],
    [{ type: 'string', format: 'uuidv4' }, 'z.uuidv4()'],
    [{ type: 'string', format: 'uuidv7' }, 'z.uuidv7()'],
    [{ type: 'string', format: 'uri' }, 'z.url()'],
    [{ type: 'string', format: 'emoji' }, 'z.emoji()'],
    [{ type: 'string', format: 'base64' }, 'z.base64()'],
    [{ type: 'string', format: 'nanoid' }, 'z.nanoid()'],
    [{ type: 'string', format: 'cuid' }, 'z.cuid()'],
    [{ type: 'string', format: 'cuid2' }, 'z.cuid2()'],
    [{ type: 'string', format: 'ulid' }, 'z.ulid()'],
    [{ type: 'string', format: 'ipv4' }, 'z.ipv4()'],
    [{ type: 'string', format: 'ipv6' }, 'z.ipv6()'],
    [{ type: 'string', format: 'cidrv4' }, 'z.cidrv4()'],
    [{ type: 'string', format: 'cidrv6' }, 'z.cidrv6()'],
    [{ type: 'string', format: 'date' }, 'z.iso.date()'],
    [{ type: 'string', format: 'time' }, 'z.iso.time()'],
    [{ type: 'string', format: 'date-time' }, 'z.iso.datetime()'],
    [{ type: 'string', format: 'duration' }, 'z.iso.duration()'],
    [{ type: 'string', format: 'binary' }, 'z.file()'],
    [{ type: 'string', format: 'toLowerCase' }, 'z.toLowerCase()'],
    [{ type: 'string', format: 'toUpperCase' }, 'z.toUpperCase()'],
    [{ type: 'string', format: 'trim' }, 'z.trim()'],
    [{ type: 'string', format: 'jwt' }, 'z.jwt()'],
  ])('string(%o) → %s', (input, expected) => {
    expect(string(input)).toBe(expected)
  })

  describe('x-error-message', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'string', format: 'email', 'x-error-message': 'メール不正' },
        'z.email({error:"メール不正"})',
      ],
      [
        { type: 'string', format: 'uuid', 'x-error-message': 'Invalid UUID' },
        'z.uuid({error:"Invalid UUID"})',
      ],
      [
        { type: 'string', format: 'uri', 'x-error-message': 'Invalid URL' },
        'z.url({error:"Invalid URL"})',
      ],
      [
        { type: 'string', format: 'ipv4', 'x-error-message': 'Invalid IPv4' },
        'z.ipv4({error:"Invalid IPv4"})',
      ],
      // Transform formats should ignore x-error-message
      [{ type: 'string', format: 'toLowerCase', 'x-error-message': 'ignored' }, 'z.toLowerCase()'],
      [{ type: 'string', format: 'toUpperCase', 'x-error-message': 'ignored' }, 'z.toUpperCase()'],
      [{ type: 'string', format: 'trim', 'x-error-message': 'ignored' }, 'z.trim()'],
      // x-error-message on base z.string() (no format)
      [{ type: 'string', 'x-error-message': '文字列必須' }, 'z.string({error:"文字列必須"})'],
      // No x-error-message → existing behavior
      [{ type: 'string', format: 'email' }, 'z.email()'],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-pattern-message', () => {
    it.concurrent.each<[Schema, string]>([
      [
        { type: 'string', pattern: '^[a-z]+$', 'x-pattern-message': '小文字のみ' },
        'z.string().regex(/^[a-z]+$/,{error:"小文字のみ"})',
      ],
      // No x-pattern-message → existing behavior
      [{ type: 'string', pattern: '^[a-z]+$' }, 'z.string().regex(/^[a-z]+$/)'],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-size-message', () => {
    it.concurrent.each<[Schema, string]>([
      // x-size-message on .length() (minLength === maxLength)
      [
        { type: 'string', minLength: 5, maxLength: 5, 'x-size-message': '5文字' },
        'z.string().length(5,{error:"5文字"})',
      ],
      // No x-size-message → existing behavior
      [{ type: 'string', minLength: 3, maxLength: 20 }, 'z.string().min(3).max(20)'],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-minimum-message / x-maximum-message', () => {
    it.concurrent.each<[Schema, string]>([
      // x-minimum-message on .min()
      [
        { type: 'string', minLength: 1, 'x-minimum-message': '1文字以上' },
        'z.string().min(1,{error:"1文字以上"})',
      ],
      // x-maximum-message on .max()
      [
        { type: 'string', maxLength: 100, 'x-maximum-message': '100文字以下' },
        'z.string().max(100,{error:"100文字以下"})',
      ],
      // both
      [
        {
          type: 'string',
          minLength: 3,
          maxLength: 20,
          'x-minimum-message': '3文字以上',
          'x-maximum-message': '20文字以下',
        },
        'z.string().min(3,{error:"3文字以上"}).max(20,{error:"20文字以下"})',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('combined x-* extensions', () => {
    it.concurrent.each<[Schema, string]>([
      [
        {
          type: 'string',
          format: 'email',
          minLength: 5,
          maxLength: 100,
          'x-error-message': 'メール不正',
          'x-minimum-message': '5文字以上',
          'x-maximum-message': '100文字以下',
        },
        'z.email({error:"メール不正"}).min(5,{error:"5文字以上"}).max(100,{error:"100文字以下"})',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('multi-constraint combinations', () => {
    it.concurrent.each<[Schema, string]>([
      // minLength + pattern (no format)
      [
        { type: 'string', minLength: 3, pattern: '^[a-z]+$' },
        'z.string().regex(/^[a-z]+$/).min(3)',
      ],
      // maxLength + pattern
      [{ type: 'string', maxLength: 50, pattern: '^\\w+$' }, 'z.string().regex(/^\\w+$/).max(50)'],
      // minLength + maxLength + pattern
      [
        { type: 'string', minLength: 1, maxLength: 100, pattern: '^[A-Z]' },
        'z.string().regex(/^[A-Z]/).min(1).max(100)',
      ],
      // format + pattern
      [
        { type: 'string', format: 'email', pattern: '^.+@example\\.com$' },
        'z.email().regex(/^.+@example\\.com$/)',
      ],
      // format + minLength
      [{ type: 'string', format: 'uuid', minLength: 36 }, 'z.uuid().min(36)'],
      // format + fixed length
      [{ type: 'string', format: 'nanoid', minLength: 21, maxLength: 21 }, 'z.nanoid().length(21)'],
      // format + pattern + minLength + maxLength with all messages
      [
        {
          type: 'string',
          format: 'uri',
          pattern: '^https://',
          minLength: 10,
          maxLength: 2000,
          'x-error-message': 'URL不正',
          'x-pattern-message': 'httpsのみ',
          'x-minimum-message': '10文字以上',
          'x-maximum-message': '2000文字以下',
        },
        'z.url({error:"URL不正"}).regex(/^https:\\/\\//,{error:"httpsのみ"}).min(10,{error:"10文字以上"}).max(2000,{error:"2000文字以下"})',
      ],
      // transform format + minLength (transform ignores x-error-message but length still applies)
      [{ type: 'string', format: 'trim', minLength: 1 }, 'z.trim().min(1)'],
      // transform format + pattern
      [
        { type: 'string', format: 'toLowerCase', pattern: '^[a-z]+$' },
        'z.toLowerCase().regex(/^[a-z]+$/)',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('additional formats', () => {
    it.concurrent.each<[Schema, string]>([
      // formats not in initial test list
      [{ type: 'string', format: 'uuidv6' }, 'z.uuidv6()'],
      [{ type: 'string', format: 'base64url' }, 'z.base64url()'],
      [{ type: 'string', format: 'hex' }, 'z.hex()'],
      [{ type: 'string', format: 'mac' } as any, 'z.mac()'],
      // unknown format falls back to z.string()
      [{ type: 'string', format: 'unknown-format' } as any, 'z.string()'],
      // empty format string falls back to z.string()
      [{ type: 'string', format: '' } as any, 'z.string()'],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('edge cases', () => {
    it.concurrent.each<[Schema, string]>([
      // only minLength
      [{ type: 'string', minLength: 0 }, 'z.string().min(0)'],
      // only maxLength
      [{ type: 'string', maxLength: 0 }, 'z.string().max(0)'],
      // fixed length 0
      [{ type: 'string', minLength: 0, maxLength: 0 }, 'z.string().length(0)'],
      // fixed length 1
      [{ type: 'string', minLength: 1, maxLength: 1 }, 'z.string().length(1)'],
      // pattern with forward slashes (should be escaped)
      [
        { type: 'string', pattern: '^https://example\\.com/' },
        'z.string().regex(/^https:\\/\\/example\\.com\\//)',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })
})
