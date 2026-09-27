// The `x-*` vendor extensions that change or extend a schema (cases/x-transforms,
// generated from specs/x-transforms.yaml), run against the host in
// hosts/x-transforms-app.ts.
//
//   /strings  x-trim, x-toLowerCase, x-toUpperCase, x-normalize
//   /coerce   x-coerce
//   /formats  options of a string format: x-urlProtocol, x-macDelimiter, x-hashAlg, ...
//   /p2       x-includes, x-startsWith, x-endsWith, x-catch, x-prefault
//   /custom   x-refine, x-superRefine, x-codec
//   /v25      x-required-message, x-error-message, contains, x-const-message,
//             x-additionalProperties-message
//   /v26      contentEncoding with contentSchema, if / then / else
//
// The host answers a valid request with 200 and the body as it came out of validation,
// so a test sees what a transform did. It answers a validation failure with 422 and RFC
// 9457 Problem Details, whose `errors` list holds, for every issue, the `pointer` to the
// value, the `detail` (the message of the issue) and the `code`.
//
// スキーマを変更・拡張する `x-*` ベンダー拡張の検証(cases/x-transforms。
// specs/x-transforms.yaml から生成)。hosts/x-transforms-app.ts のホストに対して実行する。
//
//   /strings  x-trim・x-toLowerCase・x-toUpperCase・x-normalize
//   /coerce   x-coerce
//   /formats  文字列フォーマットのオプション: x-urlProtocol・x-macDelimiter・x-hashAlg など
//   /p2       x-includes・x-startsWith・x-endsWith・x-catch・x-prefault
//   /custom   x-refine・x-superRefine・x-codec
//   /v25      x-required-message・x-error-message・contains・x-const-message・
//             x-additionalProperties-message
//   /v26      contentEncoding と contentSchema、if / then / else
//
// ホストは、有効なリクエストには 200 と、検証を通過した後のボディを返す。そのため、
// テストでは変換の結果を確認できる。検証の失敗には、422 と RFC 9457 の Problem Details を
// 返す。その `errors` には、issue ごとに、値への `pointer`・`detail`(issue のメッセージ)・
// `code` が含まれる。
//
// This file holds the requests that are rejected.
// このファイルには、拒否されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/x-transforms-app'

// A transform runs before validation and changes the value the handler receives. Every
// property of the body is required, so each test sends all six and changes the one it is
// about.
// 変換は検証の前に実行され、ハンドラが受け取る値を書き換える。
// ボディのプロパティはすべて必須であるため、各テストでは6つすべてを送信し、
// 検証対象の1つだけを変えている。
describe('strings: x-trim, x-toLowerCase, x-toUpperCase, x-normalize', () => {
  // The format is checked on the transformed value, which is "not-an-email".
  // フォーマットは、変換後の値 "not-an-email" に対して検証される。
  it('rejects a value that is still not an email after the transforms', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: '  NOT-AN-EMAIL ',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/emailNormalized', detail: 'Invalid email address' }],
    })
  })

  // A transform does not coerce: a number is not a string.
  // 変換は coerce を行わない。number は string ではない。
  it('rejects a value that is not a string', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 1,
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/trimmed', detail: 'Invalid input: expected string, received number' }],
    })
  })

  // Every property is required.
  // すべてのプロパティが必須である。
  it('rejects a body with a property missing', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/lowered', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })
})

// x-coerce turns on coercion for a property of a request body, which is otherwise typed JSON
// and not coerced.
// リクエストボディは本来、型付きの JSON であり coerce されない。x-coerce は、
// ボディのプロパティに対して coerce を有効にする。
describe('coerce: x-coerce', () => {
  // One below minimum: 0. A constraint applies to the coerced value.
  // minimum: 0 を 1 下回る。制約は、coerce 後の値に適用される。
  it('rejects a negative integer', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: -1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/asInt', detail: 'Too small: expected number to be >=0' }],
    })
  })

  // The string "-1" is coerced to -1, then fails the minimum.
  // 文字列 "-1" は -1 に coerce され、その後 minimum の検証で失敗する。
  it('rejects a coerced integer that is negative', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: '-1',
        asBool: true,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/asInt', detail: 'Too small: expected number to be >=0' }],
    })
  })

  // Coerced to 1.5, which is not an integer.
  // 1.5 に coerce されるが、整数ではない。
  it('rejects a fraction for the integer', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: '1.5',
        asBool: true,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/asInt', detail: 'Invalid input: expected int, received number' }],
    })
  })

  // Number("abc") is NaN.
  // Number("abc") は NaN になる。
  it('rejects a word for the number', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 'abc',
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/asNumber', detail: 'Invalid input: expected number, received NaN' }],
    })
  })

  // new Date("not-a-date") is an invalid date.
  // new Date("not-a-date") は無効な日付になる。
  it('rejects a word for the date', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: 'not-a-date',
        asNumber: 1,
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/asDate', detail: 'Invalid input: expected date, received Date' }],
    })
  })

  // Coercion does not make a required property optional: Number(undefined) is NaN.
  // coerce を有効にしても、必須プロパティは任意にならない。Number(undefined) は NaN である。
  it('rejects a body with a property missing', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/asNumber', detail: 'Invalid input: expected number, received NaN' }],
    })
  })
})

// An x-* option narrows a string format. Every property is required, so each test sends all
// fourteen and changes the one it is about.
// x-* オプションは、文字列フォーマットをさらに絞り込む。すべてのプロパティが必須であるため、
// 各テストでは 14 個すべてを送信し、検証対象の1つだけを変えている。
describe('formats: options of a string format', () => {
  // x-urlProtocol: ^https$ allows https only.
  // x-urlProtocol: ^https$ は、https のみを許容する。
  it('x-urlProtocol rejects a URL with another scheme', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'http://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/httpsUrl', detail: 'Invalid URL' }],
    })
  })

  // x-uuidVersion: v8, and the value is a version 4 UUID.
  // x-uuidVersion: v8 に対して、値はバージョン 4 の UUID である。
  it('x-uuidVersion rejects a UUID of another version', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/uuidV8', detail: 'Invalid UUID' }],
    })
  })

  // x-isoPrecision: 3 requires exactly three fractional digits.
  // x-isoPrecision: 3 は、ちょうど3桁の小数秒を要求する。
  it('x-isoPrecision rejects a date-time with no fraction', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/preciseDatetime', detail: 'Invalid ISO datetime' }],
    })
  })

  // preciseDatetime does not set x-isoLocal, so a value with no zone is rejected there.
  // preciseDatetime は x-isoLocal を指定していないため、タイムゾーンのない値は拒否される。
  it('x-isoLocal is what lets a date-time go without a zone', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/preciseDatetime', detail: 'Invalid ISO datetime' }],
    })
  })

  // The delimiter has to be a colon.
  // 区切り文字はコロンでなければならない。
  it('x-macDelimiter ":" rejects a MAC address with hyphens', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01-23-45-67-89-ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/colonMac', detail: 'Invalid MAC address' }],
    })
  })

  // The delimiter has to be a dot.
  // 区切り文字はドットでなければならない。
  it('x-macDelimiter "." rejects a MAC address with colons', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01:23:45:67:89:ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/dotMac', detail: 'Invalid MAC address' }],
    })
  })

  // x-jwtAlg: HS256, and the header of the token says alg: none.
  // x-jwtAlg: HS256 に対して、トークンのヘッダーは alg: none である。
  it('x-jwtAlg rejects a token signed with another algorithm', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt: 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxIn0.',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/hs256Jwt', detail: 'Invalid JWT' }],
    })
  })

  // Not three base64url parts.
  // base64url の3パート構成になっていない。
  it('format: jwt rejects a value that is not a token', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt: 'not-a-jwt',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/hs256Jwt', detail: 'Invalid JWT' }],
    })
  })

  // A SHA-256 hash in hex is 64 characters.
  // 16進表記の SHA-256 ハッシュは 64 文字である。
  it('x-hashAlg rejects a hash of the wrong length', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'abc',
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/sha256Hash', detail: 'Invalid sha256_hex' }],
    })
  })

  // The right length, and "g" is not a hexadecimal digit.
  // 長さは正しいが、"g" は16進数の文字ではない。
  it('x-hashEnc rejects a hash that is not hexadecimal', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'g'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/sha256Hash', detail: 'Invalid sha256_hex' }],
    })
  })

  // An E.164 number starts with a plus sign.
  // E.164 の番号は、プラス記号で始まる。
  it('format: e164 rejects a number with no plus sign', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '09012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/phone', detail: 'Invalid E.164 number' }],
    })
  })

  // The regex allows example.com only.
  // 正規表現は example.com のみを許容する。
  it('x-emailRegex rejects an address the regex does not match', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@other.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/customEmail', detail: 'Invalid email address' }],
    })
  })

  // The 8-4-4-4-12 layout is required.
  // 8-4-4-4-12 の形が必須である。
  it('format: guid rejects a value with no hyphens', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5dac968b4eb1c23d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/guidLike', detail: 'Invalid GUID' }],
    })
  })

  // ftp is not http.
  // ftp は http ではない。
  it('format: httpUrl rejects a URL that is not http or https', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'ftp://example.com/file',
        host: 'example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/httpOnlyUrl', detail: 'Invalid URL' }],
    })
  })

  // A host name has no scheme.
  // ホスト名にスキームは含まれない。
  it('format: hostname rejects a URL', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56',
        colonMac: '01:23:45:67:89:ab',
        hs256Jwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256Hash: 'a'.repeat(64),
        phone: '+819012345678',
        customEmail: 'foo@example.com',
        guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpOnlyUrl: 'https://example.com/api',
        host: 'https://example.com',
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/host', detail: 'Invalid hostname' }],
    })
  })
})

// Substring checks, and the two ways to replace a value: x-catch when it is invalid,
// x-prefault when it is absent.
// 部分文字列の検証と、値を置き換える2つの方法。x-catch は値が不正な場合に、
// x-prefault は値が欠落している場合に適用される。
describe('p2: x-includes, x-startsWith, x-endsWith, x-catch, x-prefault', () => {
  // "/api/" does not occur.
  // "/api/" が含まれていない。
  it('x-includes rejects a value without the substring', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /v2/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/includesSlug', detail: 'Invalid string: must include "/api/"' }],
    })
  })

  // "/API/" is not "/api/".
  // "/API/" は "/api/" ではない。
  it('x-includes is case-sensitive', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /API/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/includesSlug', detail: 'Invalid string: must include "/api/"' }],
    })
  })

  // The value starts with http://, not https://.
  // 値は https:// ではなく http:// で始まっている。
  it('x-startsWith rejects a value without the prefix', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'http://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/startsWithHttps', detail: 'Invalid string: must start with "https://"' },
      ],
    })
  })

  // A leading space moves the prefix off the start.
  // 先頭に空白があるため、接頭辞が先頭位置からずれている。
  it('x-startsWith rejects the prefix in the middle', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: ' https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/startsWithHttps', detail: 'Invalid string: must start with "https://"' },
      ],
    })
  })

  // The value ends in .prod.
  // 値は .prod で終わっている。
  it('x-endsWith rejects a value without the suffix', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.prod',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/endsWithTest', detail: 'Invalid string: must end with ".test"' }],
    })
  })

  // Unlike x-catch, x-prefault applies to an absent value only.
  // x-catch と違い、x-prefault が適用されるのは値が欠落している場合だけである。
  it('x-prefault does not replace a value of the wrong type', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 1,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/withPrefault', detail: 'Invalid input: expected string, received number' },
      ],
    })
  })

  // null is present, and not a string.
  // null は値として存在しており、string ではない。
  it('x-prefault does not replace null', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: null,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/withPrefault', detail: 'Invalid input: expected string, received null' },
      ],
    })
  })
})

// The escape hatches: a fragment of Zod code written in the spec and emitted as it is.
// エスケープハッチ。仕様に書かれた Zod コードの断片が、そのまま出力される。
describe('custom: x-refine, x-superRefine, x-codec', () => {
  // Seven characters. The message is the one written in the spec.
  // 7文字。メッセージは、仕様に書かれたものである。
  it('x-refine rejects a password shorter than 8 characters', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Aaaaaaa',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/password', detail: 'Password must be at least 8 characters' }],
    })
  })

  // Long enough, and the second refinement of the chain fails.
  // 長さは十分だが、連鎖の2つ目の refine が失敗する。
  it('x-refine rejects a password with no upper-case letter', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/password', detail: 'Password must contain an uppercase letter' }],
    })
  })

  // Too short and no upper-case letter: refinements do not stop at the first failure.
  // 短すぎるうえに、大文字も含まない。refine は、最初の失敗で打ち切られない。
  it('x-refine reports both refinements when both fail', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'short',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/password', detail: 'Password must be at least 8 characters' },
        { pointer: '/password', detail: 'Password must contain an uppercase letter' },
      ],
    })
  })

  // The issue is the one the spec adds with ctx.addIssue.
  // issue は、仕様内で ctx.addIssue によって追加されたものである。
  it('x-superRefine rejects a blocked domain', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@blocked.example',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/normalizedEmail', detail: 'Blocked domain' }],
    })
  })

  // Upper case does not get around the block, because lower-casing runs first.
  // 小文字化が先に実行されるため、大文字にしてもブロックは回避できない。
  it('x-superRefine sees the lower-cased address', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'USER@BLOCKED.EXAMPLE',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/normalizedEmail', detail: 'Blocked domain' }],
    })
  })

  // The input side of the codec is z.iso.datetime().
  // codec の入力側は z.iso.datetime() である。
  it('x-codec rejects a value that is not a date-time', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: 'not-a-date',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/updatedAt', detail: 'Invalid ISO datetime' }],
    })
  })

  // A date is not a date-time.
  // 日付は日時ではない。
  it('x-codec rejects a date with no time', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: '2026-05-10',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/updatedAt', detail: 'Invalid ISO datetime' }],
    })
  })
})

// Messages written in the spec, in any language, reach the client as they are.
// 仕様に書かれたメッセージは、言語を問わず、そのままクライアントに届く。
describe('v25: messages, contains and additionalProperties', () => {
  // A missing value and a value of the wrong type are told apart: this is the message for the
  // missing one.
  // 値の欠落と型の誤りは区別される。これは、欠落した場合のメッセージである。
  it('x-required-message is used when name is missing', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['important', 'normal'], status: 'active' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: '名前は必須です' }],
    })
  })

  // And this is the message for the wrong type.
  // こちらは、型が誤っている場合のメッセージである。
  it('x-error-message is used when name has the wrong type', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 123, tags: ['important', 'normal'], status: 'active' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: '名前は文字列である必要があります' }],
    })
  })

  // null is present, so it is a value of the wrong type, not a missing one.
  // null は値として存在するため、欠落ではなく型の誤りである。
  it('x-error-message is used when name is null', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: null, tags: ['important', 'normal'], status: 'active' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: '名前は文字列である必要があります' }],
    })
  })

  // minContains: 1, and "important" does not occur.
  // minContains: 1 に対して、"important" が含まれていない。
  it('contains rejects tags with no matching item', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', tags: ['normal'], status: 'active' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'Invalid input' }],
    })
  })

  // Nothing can match in an empty array.
  // 空配列では、一致する要素が存在しえない。
  it('contains rejects an empty list of tags', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', tags: [], status: 'active' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'Invalid input' }],
    })
  })

  // One above maxContains: 3.
  // maxContains: 3 を 1 超える。
  it('contains rejects four matching items', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        tags: ['important', 'important', 'important', 'important'],
        status: 'active',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'Invalid input' }],
    })
  })

  // "IMPORTANT" is not the constant.
  // "IMPORTANT" は定数値と一致しない。
  it('contains is case-sensitive', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', tags: ['IMPORTANT'], status: 'active' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'Invalid input' }],
    })
  })

  // status is const: active.
  // status は const: active である。
  it('x-const-message is used when status is another value', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', tags: ['important', 'normal'], status: 'inactive' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/status', detail: 'ステータスは active のみ' }],
    })
  })

  // additionalProperties: false turns the object strict: an unknown property is rejected, not
  // stripped.
  // additionalProperties: false により、オブジェクトは厳格になる。未知のプロパティは、
  // 取り除かれるのではなく拒否される。
  it('x-additionalProperties-message is used for an unknown property', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        tags: ['important', 'normal'],
        status: 'active',
        extra: 'not allowed',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/', detail: '未知のフィールドは許可されません' }],
    })
  })
})

// settings is a base64 string that holds JSON, validated by contentSchema after decoding.
// feature is required when kind is premium.
// settings は JSON を格納した base64 文字列であり、デコード後に contentSchema で検証される。
// feature は、kind が premium の場合に必須となる。
describe('v26: contentEncoding and if / then / else', () => {
  // then requires feature.
  // then は feature を要求する。
  it('rejects premium with no feature', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'premium',
        settings: Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/feature', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })

  // kind is an enum of premium and basic.
  // kind は premium と basic の enum である。
  it('rejects a kind outside the enum', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'gold',
        feature: 'pro-mode',
        settings: Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/kind', detail: 'Invalid option: expected one of "premium"|"basic"' }],
    })
  })

  // Valid base64 and valid JSON, and theme is not a member of its enum.
  // base64 としても JSON としても有効だが、theme が enum のメンバーではない。
  it('rejects settings whose content fails contentSchema', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'premium',
        feature: 'pro-mode',
        settings: Buffer.from(JSON.stringify({ theme: 'rainbow' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/settings/theme', detail: 'Invalid option: expected one of "light"|"dark"' },
      ],
    })
  })

  // The value cannot be decoded.
  // 値をデコードできない。
  it('rejects settings that are not base64', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'premium', feature: 'pro-mode', settings: '!!!not-base64!!!' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/settings', detail: 'Invalid base64-encoded string' }],
    })
  })

  // Valid base64, and the decoded text is not JSON.
  // base64 としては有効だが、デコード後のテキストが JSON ではない。
  it('rejects settings that decode to something that is not JSON', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'premium',
        feature: 'pro-mode',
        settings: Buffer.from('not json').toString('base64'),
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/settings', detail: 'Invalid input' }],
    })
  })

  // theme is required by contentSchema.
  // theme は、contentSchema で必須とされている。
  it('rejects settings whose content has no theme', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'premium',
        feature: 'pro-mode',
        settings: Buffer.from(JSON.stringify({})).toString('base64'),
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/settings/theme', detail: 'Invalid option: expected one of "light"|"dark"' },
      ],
    })
  })

  // settings is required.
  // settings は必須である。
  it('rejects a body with no settings', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'premium', feature: 'pro-mode' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/settings', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })
})
