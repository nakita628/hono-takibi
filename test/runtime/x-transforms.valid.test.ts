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
// This file holds the requests that are accepted.
// このファイルには、受理されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/x-transforms-app'

// A transform runs before validation and changes the value the handler receives. Every
// property of the body is required, so each test sends all six and changes the one it is
// about.
// 変換は検証の前に実行され、ハンドラが受け取る値を書き換える。
// ボディのプロパティはすべて必須であるため、各テストでは6つすべてを送信し、
// 検証対象の1つだけを変えている。
describe('strings: x-trim, x-toLowerCase, x-toUpperCase, x-normalize', () => {
  // Nothing to trim, fold or normalise: every value comes back as it was sent.
  // トリム・大文字小文字変換・正規化のいずれも不要な値。すべての値が、送信時のまま返る。
  it('passes values that need no transform through unchanged', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // Spaces on both sides.
  // 両側の空白。
  it('x-trim removes the whitespace around a value', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: '  hello  ',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'hello',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // A tab and a line feed are whitespace too.
  // タブと改行も空白として扱われる。
  it('x-trim removes tabs and line feeds', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: '\thello\n',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'hello',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // Only the ends are trimmed.
  // トリムされるのは両端だけである。
  it('x-trim keeps the whitespace inside a value', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: ' a b ',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'a b',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // The result is empty, and accepted: x-trim sets no minimum length.
  // 結果は空文字列になり、受理される。x-trim は最小長を設定しない。
  it('x-trim turns a value of whitespace into the empty string', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: '   ',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: '',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // Every letter is lower-cased.
  // すべての文字が小文字化される。
  it('x-toLowerCase lower-cases a value', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'HELLO',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'hello',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // Lower-casing is not limited to ASCII.
  // 小文字化は ASCII に限られない。
  it('x-toLowerCase lower-cases letters outside ASCII', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'ÀÉ',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'à\u00E9',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // Every letter is upper-cased.
  // すべての文字が大文字化される。
  it('x-toUpperCase upper-cases a value', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'hello',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'HELLO',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // ß becomes SS.
  // ß は SS になる。
  it('x-toUpperCase may change the length of a value', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'straße',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'STRASSE',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // NFC turns "e" followed by U+0301 into the single code point U+00E9.
  // NFC は、"e" と後続の U+0301 を、単一のコードポイント U+00E9 に合成する。
  it('x-normalize composes a letter and its combining accent', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'cafe\u0301',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'caf\u00E9',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // Already in NFC.
  // すでに NFC である値。
  it('x-normalize leaves a composed value unchanged', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'caf\u00E9',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'caf\u00E9',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // NFC is not NFKC: a full-width letter and a circled digit are kept as they are.
  // NFC は NFKC ではない。全角英字と丸数字は、そのまま保持される。
  it('x-normalize: NFC keeps compatibility characters', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'Ａ①',
        emailNormalized: 'a@example.com',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'Ａ①',
      emailNormalized: 'a@example.com',
      allChained: 'x',
    })
  })

  // x-trim and x-toLowerCase are paired with format: email. Untrimmed, the value would fail the
  // format; the transforms run first.
  // x-trim と x-toLowerCase を format: email と組み合わせている。
  // トリムしなければフォーマット検証に失敗する値だが、変換が先に実行される。
  it('trims and lower-cases before it checks the email format', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: '  Foo@Example.COM ',
        allChained: 'x',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'foo@example.com',
      allChained: 'x',
    })
  })

  // All three transforms apply, in that order.
  // 3つの変換が、この順序ですべて適用される。
  it('chains trim, lower-case and normalise', async () => {
    const res = await app.request('/strings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trimmed: 'x',
        lowered: 'x',
        uppered: 'X',
        normalized: 'x',
        emailNormalized: 'a@example.com',
        allChained: '  Cafe\u0301 ',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trimmed: 'x',
      lowered: 'x',
      uppered: 'X',
      normalized: 'x',
      emailNormalized: 'a@example.com',
      allChained: 'caf\u00E9',
    })
  })
})

// x-coerce turns on coercion for a property of a request body, which is otherwise typed JSON
// and not coerced.
// リクエストボディは本来、型付きの JSON であり coerce されない。x-coerce は、
// ボディのプロパティに対して coerce を有効にする。
describe('coerce: x-coerce', () => {
  // Nothing to coerce. The date comes back as the ISO string of the Date it became.
  // coerce の必要がない値。日付は Date に変換され、その ISO 文字列として返る。
  it('passes values of the declared type through', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: true,
    })
  })

  // String(123).
  // String(123) による変換。
  it('coerces a number to a string', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 123,
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: '123',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: true,
    })
  })

  // Number("42.5").
  // Number("42.5") による変換。
  it('coerces a string to a number', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: '42.5',
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 42.5,
      asInt: 1,
      asBool: true,
    })
  })

  // Number("7"), then checked as an integer.
  // Number("7") で変換した後、integer として検証される。
  it('coerces a string to an integer', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: '7',
        asBool: true,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 7,
      asBool: true,
    })
  })

  // minimum: 0 is inclusive.
  // minimum: 0 は範囲に含まれる。
  it('accepts zero, the minimum of the integer', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: 0,
        asBool: true,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 0,
      asBool: true,
    })
  })

  // A non-empty string is truthy.
  // 空でない文字列は truthy である。
  it('coerces the string "true" to a boolean', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: 1,
        asBool: 'true',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: true,
    })
  })

  // x-coerce on a boolean is z.coerce.boolean(), that is Boolean(value), and every non-empty
  // string is truthy. This is what x-coerce is documented to do; a body that carries booleans
  // as text needs x-stringbool instead.
  // boolean に対する x-coerce は z.coerce.boolean()、すなわち Boolean(value) であり、
  // 空でない文字列はすべて truthy になる。これは x-coerce の仕様どおりの挙動である。
  // 真偽値を文字列で運ぶボディには、代わりに x-stringbool を使う必要がある。
  it('coerces the string "false" to true (pinned, not endorsed)', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: 1,
        asBool: 'false',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: true,
    })
  })

  // The empty string is the one falsy string.
  // 空文字列は、唯一の falsy な文字列である。
  it('coerces the empty string to false', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10T12:34:56.000Z',
        asNumber: 1,
        asInt: 1,
        asBool: '',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T12:34:56.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: false,
    })
  })

  // new Date("2026-05-10") is midnight UTC.
  // new Date("2026-05-10") は UTC の午前 0 時になる。
  it('coerces a date without a time to a date', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asString: 'x',
        asDate: '2026-05-10',
        asNumber: 1,
        asInt: 1,
        asBool: true,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '2026-05-10T00:00:00.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: true,
    })
  })

  // new Date(0) is the epoch.
  // new Date(0) は Unix エポックになる。
  it('coerces a timestamp to a date', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asString: 'x', asDate: 0, asNumber: 1, asInt: 1, asBool: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asString: 'x',
      asDate: '1970-01-01T00:00:00.000Z',
      asNumber: 1,
      asInt: 1,
      asBool: true,
    })
  })
})

// An x-* option narrows a string format. Every property is required, so each test sends all
// fourteen and changes the one it is about.
// x-* オプションは、文字列フォーマットをさらに絞り込む。すべてのプロパティが必須であるため、
// 各テストでは 14 個すべてを送信し、検証対象の1つだけを変えている。
describe('formats: options of a string format', () => {
  // Every value fits its format and its option.
  // すべての値が、フォーマットとオプションの両方を満たしている。
  it('accepts a body that satisfies every option', async () => {
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
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emailHtml5: 'user@example.com',
      uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpsUrl: 'https://example.com/path',
      preciseDatetime: '2026-05-10T12:34:56.000+09:00',
      localDatetime: '2026-05-10T12:34:56',
      colonMac: '01:23:45:67:89:ab',
      hs256Jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256Hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      phone: '+819012345678',
      customEmail: 'foo@example.com',
      guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpOnlyUrl: 'https://example.com/api',
      host: 'example.com',
      dotMac: '01.23.45.67.89.ab',
    })
  })

  // An offset is allowed, and Z still is.
  // オフセットが許容されるが、Z も引き続き有効である。
  it('x-isoOffset accepts a date-time in UTC', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000Z',
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
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emailHtml5: 'user@example.com',
      uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpsUrl: 'https://example.com/path',
      preciseDatetime: '2026-05-10T12:34:56.000Z',
      localDatetime: '2026-05-10T12:34:56',
      colonMac: '01:23:45:67:89:ab',
      hs256Jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256Hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      phone: '+819012345678',
      customEmail: 'foo@example.com',
      guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpOnlyUrl: 'https://example.com/api',
      host: 'example.com',
      dotMac: '01.23.45.67.89.ab',
    })
  })

  // Local is allowed, not required.
  // ローカル時刻が許容されるだけで、必須ではない。
  it('x-isoLocal accepts a date-time with a zone as well', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@example.com',
        uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
        httpsUrl: 'https://example.com/path',
        preciseDatetime: '2026-05-10T12:34:56.000+09:00',
        localDatetime: '2026-05-10T12:34:56Z',
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
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emailHtml5: 'user@example.com',
      uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpsUrl: 'https://example.com/path',
      preciseDatetime: '2026-05-10T12:34:56.000+09:00',
      localDatetime: '2026-05-10T12:34:56Z',
      colonMac: '01:23:45:67:89:ab',
      hs256Jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256Hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      phone: '+819012345678',
      customEmail: 'foo@example.com',
      guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpOnlyUrl: 'https://example.com/api',
      host: 'example.com',
      dotMac: '01.23.45.67.89.ab',
    })
  })

  // The HTML5 pattern is what a browser checks, and it is looser than the default.
  // HTML5 パターンはブラウザが検証する形式であり、デフォルトより緩い。
  it('x-emailPattern html5 accepts an address with no top-level domain', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailHtml5: 'user@localhost',
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
        dotMac: '01.23.45.67.89.ab',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emailHtml5: 'user@localhost',
      uuidV8: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpsUrl: 'https://example.com/path',
      preciseDatetime: '2026-05-10T12:34:56.000+09:00',
      localDatetime: '2026-05-10T12:34:56',
      colonMac: '01:23:45:67:89:ab',
      hs256Jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256Hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      phone: '+819012345678',
      customEmail: 'foo@example.com',
      guidLike: '01890a5d-ac96-8b4e-b1c2-3d4e5f6a7b8c',
      httpOnlyUrl: 'https://example.com/api',
      host: 'example.com',
      dotMac: '01.23.45.67.89.ab',
    })
  })
})

// Substring checks, and the two ways to replace a value: x-catch when it is invalid,
// x-prefault when it is absent.
// 部分文字列の検証と、値を置き換える2つの方法。x-catch は値が不正な場合に、
// x-prefault は値が欠落している場合に適用される。
describe('p2: x-includes, x-startsWith, x-endsWith, x-catch, x-prefault', () => {
  // Every value passes, and comes back as it was sent.
  // すべての値が検証を通過し、送信時のまま返る。
  it('accepts a body that satisfies every check', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 5,
      withPrefault: 'hello',
    })
  })

  // The value is exactly the substring.
  // 値が、部分文字列そのものである。
  it('x-includes accepts the substring alone', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: '/api/',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: '/api/',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 5,
      withPrefault: 'hello',
    })
  })

  // The value would fail, so the fallback of x-catch, 0, is what the handler receives. No error
  // is reported.
  // 値は検証に失敗するはずだが、x-catch のフォールバック値 0 がハンドラに渡される。
  // エラーは報告されない。
  it('x-catch replaces a value of the wrong type', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 'not-an-integer',
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 0,
      withPrefault: 'hello',
    })
  })

  // Not an integer, so the fallback applies.
  // 整数ではないため、フォールバック値が適用される。
  it('x-catch replaces a fraction', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 1.5,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 0,
      withPrefault: 'hello',
    })
  })

  // null is not an integer, so the fallback applies.
  // null は整数ではないため、フォールバック値が適用される。
  it('x-catch replaces null', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: null,
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 0,
      withPrefault: 'hello',
    })
  })

  // withCatch is required, and its absence is a failure like any other: the fallback applies.
  // withCatch は必須だが、その欠落も他と同じく検証の失敗として扱われ、
  // フォールバック値が適用される。
  it('x-catch replaces a missing value', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withPrefault: 'hello',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 0,
      withPrefault: 'hello',
    })
  })

  // withPrefault is absent, so "default-value" is validated in its place.
  // withPrefault が欠落しているため、代わりに "default-value" が検証される。
  it('x-prefault supplies a missing value', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 5,
      withPrefault: 'default-value',
    })
  })

  // An empty string is a value, not an absence.
  // 空文字列は値であって、欠落ではない。
  it('x-prefault keeps an empty string', async () => {
    const res = await app.request('/p2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        includesSlug: 'GET /api/users',
        startsWithHttps: 'https://example.com',
        endsWithTest: 'something.test',
        withCatch: 5,
        withPrefault: '',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      includesSlug: 'GET /api/users',
      startsWithHttps: 'https://example.com',
      endsWithTest: 'something.test',
      withCatch: 5,
      withPrefault: '',
    })
  })
})

// The escape hatches: a fragment of Zod code written in the spec and emitted as it is.
// エスケープハッチ。仕様に書かれた Zod コードの断片が、そのまま出力される。
describe('custom: x-refine, x-superRefine, x-codec', () => {
  // The password passes both refinements, the email is not blocked, and the date is decoded to
  // a Date and encoded back for the response.
  // パスワードは両方の refine を通過し、メールアドレスはブロック対象でなく、
  // 日付は Date にデコードされた後、レスポンス用に再エンコードされる。
  it('accepts a body that satisfies every rule', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      password: 'Hunter2pw',
      confirmPassword: 'Hunter2pw',
      normalizedEmail: 'user@example.com',
      updatedAt: '2026-05-10T12:34:56.000Z',
    })
  })

  // The transforms run first, so the refinement checks the normalised address.
  // 変換が先に実行されるため、refine は正規化後のアドレスを検証する。
  it('trims and lower-cases the email before x-superRefine sees it', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2pw',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: '  USER@Example.COM  ',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      password: 'Hunter2pw',
      confirmPassword: 'Hunter2pw',
      normalizedEmail: 'user@example.com',
      updatedAt: '2026-05-10T12:34:56.000Z',
    })
  })

  // The boundary of the first refinement.
  // 1つ目の refine の境界値。
  it('accepts a password of exactly 8 characters', async () => {
    const res = await app.request('/custom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: 'Hunter2p',
        confirmPassword: 'Hunter2pw',
        normalizedEmail: 'user@example.com',
        updatedAt: '2026-05-10T12:34:56.000Z',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      password: 'Hunter2p',
      confirmPassword: 'Hunter2pw',
      normalizedEmail: 'user@example.com',
      updatedAt: '2026-05-10T12:34:56.000Z',
    })
  })
})

// Messages written in the spec, in any language, reach the client as they are.
// 仕様に書かれたメッセージは、言語を問わず、そのままクライアントに届く。
describe('v25: messages, contains and additionalProperties', () => {
  // name is a string, tags hold "important" once, and status is the constant.
  // name は string、tags は "important" を1つ含み、status は定数値である。
  it('accepts a body that satisfies every rule', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', tags: ['important', 'normal'], status: 'active' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: 'Alice',
      tags: ['important', 'normal'],
      status: 'active',
    })
  })

  // maxContains: 3 is inclusive.
  // maxContains: 3 は範囲に含まれる。
  it('contains accepts three matching items, its maxContains', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        tags: ['important', 'important', 'important'],
        status: 'active',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: 'Alice',
      tags: ['important', 'important', 'important'],
      status: 'active',
    })
  })

  // The matching item may be anywhere.
  // 一致する要素は、どの位置にあってもよい。
  it('contains accepts one matching item among others', async () => {
    const res = await app.request('/v25', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Alice', tags: ['a', 'b', 'important'], status: 'active' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: 'Alice',
      tags: ['a', 'b', 'important'],
      status: 'active',
    })
  })
})

// settings is a base64 string that holds JSON, validated by contentSchema after decoding.
// feature is required when kind is premium.
// settings は JSON を格納した base64 文字列であり、デコード後に contentSchema で検証される。
// feature は、kind が premium の場合に必須となる。
describe('v26: contentEncoding and if / then / else', () => {
  // The if matches, so then applies: feature is required, and present. settings comes back
  // decoded.
  // if に一致するため、then が適用される。feature は必須であり、存在している。settings は、
  // デコードされた状態で返る。
  it('accepts premium with a feature', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'premium',
        feature: 'pro-mode',
        settings: Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      kind: 'premium',
      feature: 'pro-mode',
      settings: { theme: 'dark' },
    })
  })

  // The if does not match, so else applies, which requires nothing.
  // if に一致しないため、else が適用される。else は何も要求しない。
  it('accepts basic with no feature', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'basic',
        settings: Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ kind: 'basic', settings: { theme: 'dark' } })
  })

  // else does not forbid feature.
  // else は、feature の存在を禁止しない。
  it('accepts basic with a feature', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'basic',
        feature: 'pro-mode',
        settings: Buffer.from(JSON.stringify({ theme: 'dark' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      kind: 'basic',
      feature: 'pro-mode',
      settings: { theme: 'dark' },
    })
  })

  // Both members of the enum inside contentSchema.
  // contentSchema 内の enum の、もう一方のメンバー。
  it('accepts the other theme', async () => {
    const res = await app.request('/v26', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'premium',
        feature: 'pro-mode',
        settings: Buffer.from(JSON.stringify({ theme: 'light' })).toString('base64'),
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      kind: 'premium',
      feature: 'pro-mode',
      settings: { theme: 'light' },
    })
  })
})
