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
    [{ type: 'string', format: 'url' }, 'z.url()'],
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

  describe('x-minLength-message / x-maxLength-message', () => {
    it.concurrent.each<[Schema, string]>([
      // x-minimum-message on .min()
      [
        { type: 'string', minLength: 1, 'x-minLength-message': '1文字以上' },
        'z.string().min(1,{error:"1文字以上"})',
      ],
      // x-maximum-message on .max()
      [
        { type: 'string', maxLength: 100, 'x-maxLength-message': '100文字以下' },
        'z.string().max(100,{error:"100文字以下"})',
      ],
      // both
      [
        {
          type: 'string',
          minLength: 3,
          maxLength: 20,
          'x-minLength-message': '3文字以上',
          'x-maxLength-message': '20文字以下',
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
          'x-minLength-message': '5文字以上',
          'x-maxLength-message': '100文字以下',
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
          'x-minLength-message': '10文字以上',
          'x-maxLength-message': '2000文字以下',
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

  describe('x-trim / x-toLowerCase / x-toUpperCase / x-normalize (P1)', () => {
    it.concurrent.each<[Schema, string]>([
      // single transform
      [{ type: 'string', 'x-trim': true }, 'z.string().trim()'],
      [{ type: 'string', 'x-toLowerCase': true }, 'z.string().toLowerCase()'],
      [{ type: 'string', 'x-toUpperCase': true }, 'z.string().toUpperCase()'],
      [{ type: 'string', 'x-normalize': 'NFC' }, 'z.string().normalize("NFC")'],
      [{ type: 'string', 'x-normalize': 'NFKC' }, 'z.string().normalize("NFKC")'],
      // chained: trim → case → normalize
      [
        { type: 'string', 'x-trim': true, 'x-toLowerCase': true },
        'z.string().trim().toLowerCase()',
      ],
      [
        { type: 'string', 'x-trim': true, 'x-toLowerCase': true, 'x-normalize': 'NFC' },
        'z.string().trim().toLowerCase().normalize("NFC")',
      ],
      // combined with validation format → uses pipe pattern so transforms run
      // before validation (canonical input normalization).
      [
        { type: 'string', format: 'email', 'x-trim': true, 'x-toLowerCase': true },
        'z.string().trim().toLowerCase().pipe(z.email())',
      ],
      [{ type: 'string', format: 'uuid', 'x-trim': true }, 'z.string().trim().pipe(z.uuid())'],
      // combined with length: pre-validation transforms run BEFORE refinements
      [
        { type: 'string', minLength: 1, maxLength: 100, 'x-trim': true },
        'z.string().trim().min(1).max(100)',
      ],
      // idempotent: format:"trim" + x-trim → single .trim() via base, no extra
      [{ type: 'string', format: 'trim', 'x-trim': true }, 'z.trim()'],
      [{ type: 'string', format: 'toLowerCase', 'x-toLowerCase': true }, 'z.toLowerCase()'],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-lowercase / x-uppercase (validation, distinct from transforms)', () => {
    it.concurrent.each<[Schema, string]>([
      // single validation
      [{ type: 'string', 'x-lowercase': true }, 'z.string().lowercase()'],
      [{ type: 'string', 'x-uppercase': true }, 'z.string().uppercase()'],
      // coexist with the *transform* extensions: input is mapped first, then
      // the validation enforces the case constraint.
      [
        { type: 'string', 'x-toLowerCase': true, 'x-lowercase': true },
        'z.string().toLowerCase().lowercase()',
      ],
      [
        { type: 'string', 'x-toUpperCase': true, 'x-uppercase': true },
        'z.string().toUpperCase().uppercase()',
      ],
      // coexist with length constraints — validation comes after refinements
      [
        { type: 'string', minLength: 1, maxLength: 10, 'x-lowercase': true },
        'z.string().min(1).max(10).lowercase()',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-coerce (P1)', () => {
    it.concurrent.each<[Schema, string]>([
      // bare coerce
      [{ type: 'string', 'x-coerce': true }, 'z.coerce.string()'],
      // coerce + date
      [{ type: 'string', format: 'date-time', 'x-coerce': true }, 'z.coerce.date()'],
      [{ type: 'string', format: 'date', 'x-coerce': true }, 'z.coerce.date()'],
      // coerce + error message
      [
        { type: 'string', 'x-coerce': true, 'x-error-message': '文字列必須' },
        'z.coerce.string({error:"文字列必須"})',
      ],
      [
        { type: 'string', format: 'date-time', 'x-coerce': true, 'x-error-message': '日付不正' },
        'z.coerce.date({error:"日付不正"})',
      ],
      // coerce + transforms
      [
        { type: 'string', 'x-coerce': true, 'x-trim': true, 'x-toLowerCase': true },
        'z.coerce.string().trim().toLowerCase()',
      ],
      // coerce ignored for non-date format (out of P1 scope, base unchanged)
      [{ type: 'string', format: 'email', 'x-coerce': true }, 'z.email()'],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-emailPattern / x-uuidVersion / x-url* / x-iso* / x-mac* / x-jwt* / x-hash* (P1 format options)', () => {
    it.concurrent.each<[Schema, string]>([
      // email presets
      [
        { type: 'string', format: 'email', 'x-emailPattern': 'html5' },
        'z.email({pattern:z.regexes.html5Email})',
      ],
      [
        { type: 'string', format: 'email', 'x-emailPattern': 'rfc5322' },
        'z.email({pattern:z.regexes.rfc5322Email})',
      ],
      [
        { type: 'string', format: 'email', 'x-emailPattern': 'unicode' },
        'z.email({pattern:z.regexes.unicodeEmail})',
      ],
      // email + preset + error message
      [
        {
          type: 'string',
          format: 'email',
          'x-emailPattern': 'html5',
          'x-error-message': 'メール不正',
        },
        'z.email({pattern:z.regexes.html5Email,error:"メール不正"})',
      ],
      // uuid versions (v1/v2/v3/v5/v8 — non-dedicated formats)
      [{ type: 'string', format: 'uuid', 'x-uuidVersion': 'v8' }, 'z.uuid({version:"v8"})'],
      [{ type: 'string', format: 'uuid', 'x-uuidVersion': 'v1' }, 'z.uuid({version:"v1"})'],
      // url constraints
      [
        { type: 'string', format: 'uri', 'x-urlProtocol': '^https?$' },
        'z.url({protocol:/^https?$/})',
      ],
      [
        { type: 'string', format: 'uri', 'x-urlHostname': '^example\\.com$' },
        'z.url({hostname:/^example\\.com$/})',
      ],
      [{ type: 'string', format: 'uri', 'x-urlNormalize': true }, 'z.url({normalize:true})'],
      // url all three
      [
        {
          type: 'string',
          format: 'uri',
          'x-urlProtocol': '^https$',
          'x-urlHostname': '^example\\.com$',
          'x-urlNormalize': true,
        },
        'z.url({protocol:/^https$/,hostname:/^example\\.com$/,normalize:true})',
      ],
      // iso datetime options
      [
        { type: 'string', format: 'date-time', 'x-isoPrecision': 3 },
        'z.iso.datetime({precision:3})',
      ],
      [
        { type: 'string', format: 'date-time', 'x-isoOffset': true },
        'z.iso.datetime({offset:true})',
      ],
      [{ type: 'string', format: 'date-time', 'x-isoLocal': true }, 'z.iso.datetime({local:true})'],
      [
        {
          type: 'string',
          format: 'date-time',
          'x-isoPrecision': 3,
          'x-isoOffset': true,
          'x-isoLocal': true,
        },
        'z.iso.datetime({precision:3,offset:true,local:true})',
      ],
      // iso time precision
      [{ type: 'string', format: 'time', 'x-isoPrecision': 0 }, 'z.iso.time({precision:0})'],
      // mac delimiter
      [{ type: 'string', format: 'mac', 'x-macDelimiter': ':' }, 'z.mac({delimiter:":"})'],
      [{ type: 'string', format: 'mac', 'x-macDelimiter': '-' }, 'z.mac({delimiter:"-"})'],
      // jwt alg
      [{ type: 'string', format: 'jwt', 'x-jwtAlg': 'HS256' }, 'z.jwt({alg:"HS256"})'],
      // hash (algo positional + enc option)
      [{ type: 'string', format: 'hash', 'x-hashAlg': 'sha256' }, 'z.hash("sha256")'],
      [
        { type: 'string', format: 'hash', 'x-hashAlg': 'sha256', 'x-hashEnc': 'hex' },
        'z.hash("sha256",{enc:"hex"})',
      ],
      [
        {
          type: 'string',
          format: 'hash',
          'x-hashAlg': 'sha512',
          'x-hashEnc': 'base64url',
          'x-error-message': 'ハッシュ不正',
        },
        'z.hash("sha512",{enc:"base64url",error:"ハッシュ不正"})',
      ],
      // hash without algo → fallback to z.string()
      [{ type: 'string', format: 'hash' }, 'z.string()'],
      // e164 phone
      [{ type: 'string', format: 'e164' }, 'z.e164()'],
      // option + transforms chain
      [
        {
          type: 'string',
          format: 'email',
          'x-emailPattern': 'html5',
          'x-trim': true,
          'x-toLowerCase': true,
        },
        'z.string().trim().toLowerCase().pipe(z.email({pattern:z.regexes.html5Email}))',
      ],
    ])('string(%o) → %s', (input, expected) => {
      expect(string(input)).toBe(expected)
    })
  })

  describe('x-emailRegex (custom regex) / format: guid / x-includes / x-startsWith / x-endsWith (P1+P2)', () => {
    it.concurrent.each<[Schema, string]>([
      // custom email regex via x-emailRegex
      [
        { type: 'string', format: 'email', 'x-emailRegex': '^.+@example\\.com$' },
        'z.email({pattern:/^.+@example\\.com$/})',
      ],
      // x-emailRegex wins over x-emailPattern when both are set
      [
        {
          type: 'string',
          format: 'email',
          'x-emailPattern': 'html5',
          'x-emailRegex': '^.+@example\\.com$',
        },
        'z.email({pattern:/^.+@example\\.com$/})',
      ],
      // GUID format (RFC-lenient)
      [{ type: 'string', format: 'guid' }, 'z.guid()'],
      [
        { type: 'string', format: 'guid', 'x-error-message': 'GUID不正' },
        'z.guid({error:"GUID不正"})',
      ],
      // httpUrl and hostname formats
      [{ type: 'string', format: 'httpUrl' }, 'z.httpUrl()'],
      [{ type: 'string', format: 'hostname' }, 'z.hostname()'],
      [
        { type: 'string', format: 'httpUrl', 'x-error-message': 'HTTP URLのみ' },
        'z.httpUrl({error:"HTTP URLのみ"})',
      ],
      // mac with custom delimiter (any string now)
      [{ type: 'string', format: 'mac', 'x-macDelimiter': '.' }, 'z.mac({delimiter:"."})'],
      // P2 substring checks
      [{ type: 'string', 'x-includes': '@example.com' }, 'z.string().includes("@example.com")'],
      [{ type: 'string', 'x-startsWith': 'https://' }, 'z.string().startsWith("https://")'],
      [{ type: 'string', 'x-endsWith': '.test' }, 'z.string().endsWith(".test")'],
      // includes with special chars preserved exactly (no regex escape)
      [{ type: 'string', 'x-includes': '.foo()' }, 'z.string().includes(".foo()")'],
      // combined with length + transforms
      [
        {
          type: 'string',
          minLength: 1,
          maxLength: 100,
          'x-startsWith': 'foo',
          'x-trim': true,
        },
        'z.string().trim().min(1).max(100).startsWith("foo")',
      ],
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
