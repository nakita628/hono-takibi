import { describe, expect, it } from 'vitest'
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
      [
        { type: 'string', minLength: 3, maxLength: 20, 'x-size-message': '3-20文字' },
        'z.string().min(3,{error:"3-20文字"}).max(20,{error:"3-20文字"})',
      ],
      [
        { type: 'string', minLength: 5, maxLength: 5, 'x-size-message': '5文字' },
        'z.string().length(5,{error:"5文字"})',
      ],
      [
        { type: 'string', minLength: 1, 'x-size-message': '1文字以上' },
        'z.string().min(1,{error:"1文字以上"})',
      ],
      [
        { type: 'string', maxLength: 100, 'x-size-message': '100文字以下' },
        'z.string().max(100,{error:"100文字以下"})',
      ],
      // No x-size-message → existing behavior
      [{ type: 'string', minLength: 3, maxLength: 20 }, 'z.string().min(3).max(20)'],
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
          'x-size-message': '5-100文字',
        },
        'z.email({error:"メール不正"}).min(5,{error:"5-100文字"}).max(100,{error:"5-100文字"})',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })
})
