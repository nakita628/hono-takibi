// The vendor extensions guide, executed. Every schema in specs/readme.yaml corresponds to
// a code block of the guide (website/docs/guides/vendor.md, published at
// https://hono-takibi.dev/docs/guides/vendor), and this suite proves that what the guide
// says is what happens: the messages match it word for word, transforms run in the order
// it gives, a codec decodes and encodes, and so on. A behaviour that changes here has to
// change in the guide too.
//
// The host (hosts/readme-app.ts, on cases/readme) answers a valid request with 200 and
// the body as it came out of validation. It answers a validation failure with 422 and RFC
// 9457 Problem Details, whose `errors` list holds, for every issue, the `pointer` to the
// value and the `detail`, the message of the issue.
//
// ベンダー拡張ガイドを、実行可能な形で検証する。specs/readme.yaml の各スキーマは、ガイド
// (website/docs/guides/vendor.md。https://hono-takibi.dev/docs/guides/vendor で公開)の
// コードブロックに対応している。このスイートは、ガイドの記述どおりに動作することを
// 検証する。メッセージは一字一句一致し、変換は記載された順序で実行され、codec はデコードと
// エンコードを行う。ここで挙動が変わる場合は、ガイドも併せて変更しなければならない。
//
// ホスト(hosts/readme-app.ts。cases/readme を使用)は、有効なリクエストには 200 と、
// 検証を通過した後のボディを返す。検証の失敗には、422 と RFC 9457 の Problem Details を
// 返す。その `errors` には、issue ごとに、値への `pointer` と、issue のメッセージである
// `detail` が含まれる。
//
// This file holds the requests that are rejected.
// このファイルには、拒否されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/readme-app'

// x-error-message, x-minLength-message and x-maxLength-message on one property.
// 1つのプロパティに対する x-error-message・x-minLength-message・x-maxLength-message。
describe('custom validation error messages', () => {
  // The message of the type.
  // 型に対するメッセージ。
  it('x-error-message answers a name that is not a string', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name must be a string' }],
    })
  })

  // name declares no x-required-message, so a missing value is answered with the message of the
  // type as well.
  // name は x-required-message を宣言していないため、値の欠落にも型のメッセージで応答する。
  it('x-error-message answers a missing name', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name must be a string' }],
    })
  })

  // One below minLength.
  // minLength を 1 下回る。
  it('x-minLength-message answers an empty name', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name cannot be empty' }],
    })
  })

  // One above maxLength.
  // maxLength を 1 超える。
  it('x-maxLength-message answers a name of 51 characters', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(51) }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name must be at most 50 characters' }],
    })
  })
})

// x-trim, x-toLowerCase, x-toUpperCase and x-normalize run before the value is validated.
// Every property is required, so each test sends all four.
// x-trim・x-toLowerCase・x-toUpperCase・x-normalize は、値の検証より前に実行される。
// すべてのプロパティが必須であるため、各テストでは4つすべてを送信する。
describe('string transforms before validation', () => {
  // An underscore is not allowed, in either case.
  // アンダースコアは、大文字小文字を問わず許容されない。
  it('rejects a slug that fails the pattern after lower-casing', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        slug: 'HELLO_WORLD',
        country: 'JP',
        text: 'ok',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/slug', detail: 'Invalid string: must match pattern /^[a-z0-9-]+$/' }],
    })
  })

  // The format is checked on the trimmed value.
  // フォーマットは、トリム後の値に対して検証される。
  it('rejects a value that is still not an email after trimming', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: '  not-an-email  ', slug: 'abc', country: 'JP', text: 'ok' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })
})

// x-coerce turns on coercion for a property of a request body.
// x-coerce は、リクエストボディのプロパティに対して coerce を有効にする。
describe('type coercion: x-coerce', () => {
  // "-1" is coerced to -1, then fails minimum: 0.
  // "-1" は -1 に coerce され、その後 minimum: 0 の検証で失敗する。
  it('rejects text that is coerced below the minimum', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asNumber: 1,
        asInt: '-1',
        asBool: true,
        asDate: '2024-01-01T00:00:00.000Z',
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

  // Number("abc") is NaN.
  // Number("abc") は NaN になる。
  it('rejects text that is not a number', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asNumber: 'abc',
        asInt: 1,
        asBool: true,
        asDate: '2024-01-01T00:00:00.000Z',
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

  // An invalid date.
  // 無効な日付。
  it('rejects text that is not a date', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asNumber: 1, asInt: 1, asBool: true, asDate: 'not-a-date' }),
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
})

// A codec decodes the wire value for the handler and encodes it again for the response.
// codec は、ワイヤ上の値をハンドラ用にデコードし、レスポンス用に再びエンコードする。
describe('codec: x-codec', () => {
  // The input side of the codec validates.
  // codec の入力側で検証が行われる。
  it('rejects a value that is not an ISO date-time', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedAt: 'not-iso' }),
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
  it('rejects a date with no time', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedAt: '2024-01-01' }),
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

  // updatedAt is required.
  // updatedAt は必須である。
  it('rejects a missing value', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/updatedAt', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })
})

// Fragments of Zod code written in the spec.
// 仕様に書かれた Zod コードの断片。
describe('custom validation: x-refine and x-superRefine', () => {
  // The first refinement of the chain. The second fails too, since "abc" has no upper-case
  // letter, and both are reported.
  // 連鎖の1つ目の refine。"abc" は大文字も含まないため2つ目も失敗し、両方が報告される。
  it('x-refine answers a password shorter than 8 characters', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'abc', normalizedEmail: 'user@example.com' }),
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

  // The second refinement of the chain alone.
  // 連鎖の2つ目の refine だけが失敗する。
  it('x-refine answers a password with no upper-case letter', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'abcdefgh', normalizedEmail: 'user@example.com' }),
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

  // The issue added with ctx.addIssue.
  // ctx.addIssue で追加された issue。
  it('x-superRefine answers a blocked domain', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'Abcdefgh', normalizedEmail: 'evil@blocked.example' }),
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
})

// x-prefault supplies an absent value, x-catch replaces an invalid one, and x-readonly
// freezes an object.
// x-prefault は欠落した値を補い、x-catch は不正な値を置き換え、
// x-readonly はオブジェクトを凍結する。
describe('defaults and fallbacks: x-prefault, x-catch, x-readonly', () => {
  // x-prefault applies to an absent value only.
  // x-prefault が適用されるのは、値が欠落している場合だけである。
  it('x-prefault does not replace a greeting of the wrong type', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ greeting: 1, retries: 1, config: { name: 'cfg' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/greeting', detail: 'Invalid input: expected string, received number' }],
    })
  })

  // config is required and has no fallback.
  // config は必須であり、フォールバックもない。
  it('rejects a missing config', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ greeting: 'hi', retries: 1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/config', detail: 'Invalid input: expected object, received undefined' },
      ],
    })
  })
})

// Two checks on url, one on path.
// url に対する2つの検証と、path に対する1つの検証。
describe('string content checks: x-startsWith, x-endsWith, x-includes', () => {
  // http:// is not https://.
  // http:// は https:// ではない。
  it('x-startsWith rejects a url with another prefix', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://example.com', path: '/api/v1' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/url', detail: 'Invalid string: must start with "https://"' }],
    })
  })

  // .jp is not .com.
  // .jp は .com ではない。
  it('x-endsWith rejects a url with another suffix', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.jp', path: '/api/v1' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/url', detail: 'Invalid string: must end with ".com"' }],
    })
  })

  // Two checks on one property, two issues.
  // 1つのプロパティに対する2つの検証が失敗し、issue が2件報告される。
  it('reports both checks of the url when both fail', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://example.jp', path: '/api/v1' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/url', detail: 'Invalid string: must start with "https://"' },
        { pointer: '/url', detail: 'Invalid string: must end with ".com"' },
      ],
    })
  })

  // /api/ does not occur.
  // /api/ が含まれていない。
  it('x-includes rejects a path without the substring', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com', path: '/static/v1' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/path', detail: 'Invalid string: must include "/api/"' }],
    })
  })
})

// Every property is required, so each test sends all nine and changes the one it is about.
// すべてのプロパティが必須であるため、各テストでは9つすべてを送信し、
// 検証対象の1つだけを変えている。
describe('format-specific options', () => {
  // The regex allows example.com only.
  // 正規表現は example.com のみを許容する。
  it('x-emailRegex rejects an address the regex does not match', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'user@gmail.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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

  // x-uuidVersion: v7, and the value is a version 4 UUID.
  // x-uuidVersion: v7 に対して、値はバージョン 4 の UUID である。
  it('x-uuidVersion rejects a UUID of another version', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/uuidV7', detail: 'Invalid UUID' }],
    })
  })

  // x-urlProtocol: ^https$ allows https only.
  // x-urlProtocol: ^https$ は、https のみを許容する。
  it('x-urlProtocol rejects http', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'http://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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

  // An offset is allowed; a value with no zone at all is still rejected.
  // オフセットは許容されるが、タイムゾーンのない値は引き続き拒否される。
  it('x-isoOffset does not make the zone optional', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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

  // x-isoPrecision: 3, and the value has none.
  // x-isoPrecision: 3 に対して、値に小数秒がない。
  it('x-isoPrecision rejects another number of fractional digits', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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

  // x-macDelimiter: ":", and the value uses hyphens.
  // x-macDelimiter: ":" に対して、値はハイフン区切りである。
  it('x-macDelimiter rejects another delimiter', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00-11-22-33-44-55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/mac', detail: 'Invalid MAC address' }],
    })
  })

  // Not three base64url parts.
  // base64url の3パート構成になっていない。
  it('x-jwtAlg rejects a value that is not a token', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token: 'not-a-jwt',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/token', detail: 'Invalid JWT' }],
    })
  })

  // A SHA-256 hash in hex is 64 characters.
  // 16進表記の SHA-256 ハッシュは 64 文字である。
  it('x-hashAlg rejects a hash of the wrong length', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'abc123',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/sha256', detail: 'Invalid sha256_hex' }],
    })
  })
})

// A brand exists in the type only; at run time the schema validates like the plain object.
// ブランドは型の上にのみ存在する。実行時には、
// スキーマは通常のオブジェクトと同じように検証を行う。
describe('branded types: x-brand', () => {
  // name is required.
  // name は必須である。
  it('rejects a cat with no name', async () => {
    const res = await app.request('/branded', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Invalid input: expected string, received undefined' }],
    })
  })

  // name is a string.
  // name は string である。
  it('rejects a name that is a number', async () => {
    const res = await app.request('/branded', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Invalid input: expected string, received number' }],
    })
  })
})

// minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, const, and the messages
// of a required integer.
// minimum・maximum・exclusiveMinimum・exclusiveMaximum・multipleOf・const と、
// 必須の integer に対するメッセージ。
describe('numeric keywords', () => {
  // One below the minimum.
  // 最小値を 1 下回る。
  it('minimum rejects -1', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: -1, ratio: 0.5, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'age must be >= 0' }],
    })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('maximum rejects 121', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 121, ratio: 0.5, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'age must be <= 120' }],
    })
  })

  // The bound itself is excluded.
  // 境界値そのものは、範囲に含まれない。
  it('exclusiveMinimum rejects 0', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/ratio', detail: 'ratio must be > 0' }],
    })
  })

  // The bound itself is excluded.
  // 境界値そのものは、範囲に含まれない。
  it('exclusiveMaximum rejects 1', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 1, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/ratio', detail: 'ratio must be < 1' }],
    })
  })

  // Between two multiples.
  // 2つの倍数の間の値。
  it('multipleOf rejects 1.3', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.3, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/price', detail: 'price must be a multiple of 0.5' }],
    })
  })

  // A missing value and a value of the wrong type have a message each: this is the one for the
  // missing value.
  // 値の欠落と型の誤りには、それぞれ専用のメッセージがある。これは、
  // 欠落した場合のメッセージである。
  it('x-required-message answers a missing quantity', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'quantity is required' }],
    })
  })

  // And this is the one for the wrong type.
  // こちらは、型が誤っている場合のメッセージである。
  it('x-error-message answers a quantity of the wrong type', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: 'not-int', exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'quantity must be an integer' }],
    })
  })

  // Not an integer.
  // 整数ではない。
  it('x-error-message answers a quantity that is a fraction', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: 1.5, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'quantity must be an integer' }],
    })
  })

  // null is present, so it is a value of the wrong type.
  // null は値として存在するため、型の誤りとして扱われる。
  it('x-error-message answers a quantity that is null', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: null, exact: 42 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'quantity must be an integer' }],
    })
  })

  // Only 42 is allowed.
  // 許容されるのは 42 だけである。
  it('x-const-message answers another number', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: 10, exact: 43 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/exact', detail: 'exact must be 42' }],
    })
  })

  // The string "42" is not the number 42.
  // 文字列の "42" は、number の 42 ではない。
  it('x-const-message answers the constant as a string', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: 10, exact: '42' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/exact', detail: 'exact must be 42' }],
    })
  })
})

// minItems, maxItems, uniqueItems, and contains with minContains and maxContains.
// minItems・maxItems・uniqueItems と、minContains・maxContains 付きの contains。
describe('array keywords', () => {
  // One below minItems.
  // minItems を 1 下回る。
  it('minItems rejects an empty list', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: [], unique: [1, 2, 3], basket: [{ tier: 'premium' }] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'tags must have at least 1 item' }],
    })
  })

  // One above maxItems.
  // maxItems を 1 超える。
  it('maxItems rejects six tags', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['1', '2', '3', '4', '5', '6'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'tags must have at most 5 items' }],
    })
  })

  // The pointer ends in the index of the second occurrence.
  // pointer は、2回目の出現位置のインデックスで終わる。
  it('uniqueItems rejects a duplicate', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [1, 1], basket: [{ tier: 'premium' }] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/unique/1', detail: 'unique must contain distinct integers' }],
    })
  })

  // The first and the third are equal.
  // 1番目と3番目が等しい。
  it('uniqueItems rejects a duplicate that is not adjacent', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [1, 2, 1], basket: [{ tier: 'premium' }] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/unique/2', detail: 'unique must contain distinct integers' }],
    })
  })

  // minContains: 1, and no item matches.
  // minContains: 1 に対して、一致する要素がない。
  it('minContains rejects a basket with no premium item', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [1, 2, 3], basket: [{ tier: 'basic' }] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/basket', detail: 'basket must contain at least 1 premium' }],
    })
  })

  // Nothing can match in an empty array.
  // 空配列では、一致する要素が存在しえない。
  it('minContains rejects an empty basket', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [1, 2, 3], basket: [] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/basket', detail: 'basket must contain at least 1 premium' }],
    })
  })

  // One above maxContains.
  // maxContains を 1 超える。
  it('maxContains rejects four premium items', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [
          { tier: 'premium' },
          { tier: 'premium' },
          { tier: 'premium' },
          { tier: 'premium' },
        ],
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/basket', detail: 'basket must contain at most 3 premium' }],
    })
  })

  // The items schema is checked as well as contains.
  // contains だけでなく、items のスキーマも検証される。
  it('rejects a basket item with no tier', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [1, 2, 3], basket: [{ tier: 'premium' }, {}] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/basket/1/tier', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })
})

// minProperties, maxProperties, additionalProperties, propertyNames, patternProperties,
// dependentRequired and dependentSchemas.
// minProperties・maxProperties・additionalProperties・propertyNames・patternProperties・
// dependentRequired・dependentSchemas。
describe('object keywords', () => {
  // One below minProperties.
  // minProperties を 1 下回る。
  it('minProperties rejects an empty profile', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: {}, namespace: { x_one: 'ok', x_two: 'ok' }, dependent: {} }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/profile', detail: 'profile must have at least 1 property' }],
    })
  })

  // additionalProperties: false makes the object strict.
  // additionalProperties: false により、オブジェクトは厳格になる。
  it('additionalProperties rejects an unknown key', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1', extra: 'x' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/profile', detail: 'profile contains an unknown key' }],
    })
  })

  // profile declares three properties and allows no other, so a fourth key is always an unknown
  // one: the message is the one of additionalProperties.
  // profile は3つのプロパティを宣言し、それ以外を許容しない。そのため、
  // 4つ目のキーは必ず未知のキーになり、メッセージは additionalProperties のものになる。
  it('additionalProperties answers a fourth key before maxProperties can', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1', b: '2', c: '3', d: '4' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/profile', detail: 'profile contains an unknown key' }],
    })
  })

  // The pointer names the key.
  // pointer は、該当のキーを指す。
  it('propertyNames rejects a key that starts with an upper-case letter', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: { a: '1' }, namespace: { Invalid: 'x' }, dependent: {} }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/namespace/Invalid', detail: 'keys must start lowercase letter + [a-z0-9_]' },
      ],
    })
  })

  // A key has to start with a lower-case letter.
  // キーは、小文字の英字で始まらなければならない。
  it('propertyNames rejects a key that starts with a digit', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: { a: '1' }, namespace: { '1abc': 'x' }, dependent: {} }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/namespace/1abc', detail: 'keys must start lowercase letter + [a-z0-9_]' },
      ],
    })
  })

  // The key matches ^x_, and its value is a number.
  // キーは ^x_ に一致するが、値が number である。
  it('patternProperties rejects an x_ key that is not a string', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: { a: '1' }, namespace: { x_one: 42 }, dependent: {} }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/namespace/x_one', detail: 'x_ keys must be strings' }],
    })
  })

  // The pointer names the missing property.
  // pointer は、欠落しているプロパティを指す。
  it('dependentRequired rejects cc without billing', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: { cc: '4111111111111111' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/dependent/billing', detail: 'billing required when cc provided' }],
    })
  })

  // The schema that applies when cc is present.
  // cc が存在する場合に適用されるスキーマ。
  it('dependentSchemas rejects a cc that is not 16 digits', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: { cc: '123', billing: '00000' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/dependent', detail: 'cc must be 16 digits' }],
    })
  })
})

// allOf, anyOf, oneOf and not, each with its message extension.
// allOf・anyOf・oneOf・not と、それぞれのメッセージ拡張。
describe('combinators', () => {
  // age is required by the second branch.
  // age は、2つ目の分岐で必須とされている。
  it('x-allOf-message answers a merged value with no age', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro' },
        picked: 'hello',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/merged/age', detail: 'merged validation failed' }],
    })
  })

  // The constraint of a branch.
  // 分岐が持つ制約。
  it('x-allOf-message answers a negative age', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: -1 },
        picked: 'hello',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/merged/age', detail: 'merged validation failed' }],
    })
  })

  // Neither a string nor an integer.
  // string でも integer でもない。
  it('x-anyOf-message answers a boolean', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: true,
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/picked', detail: 'picked must be string or integer' }],
    })
  })

  // No branch matches.
  // どの分岐にも一致しない。
  it('x-oneOf-message answers a boolean', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: true,
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/exclusive', detail: 'exclusive must match exactly one type' }],
    })
  })

  // Exactly "forbidden".
  // "forbidden" そのもの。
  it('x-not-message answers the forbidden constant', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'world',
        banned: 'forbidden',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/banned', detail: 'banned cannot be "forbidden"' }],
    })
  })
})

// A string enum, an integer enum and a boolean enum.
// string・integer・boolean の enum。
describe('enums', () => {
  // A string that is not a member.
  // メンバーでない string。
  it('x-enum-message answers a role outside the enum', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'guest', priority: 2, accepted: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/role', detail: 'role must be admin / editor / viewer' }],
    })
  })

  // role declares x-error-message as well, "role must be a string", and it is never used: an
  // enum is emitted as one check, so a value of the wrong type fails it like a value outside
  // the enum does, and x-enum-message answers both.
  // role は x-error-message("role must be a string")も宣言しているが、これは使われない。
  // enum は単一の検証として生成されるため、型が誤っている値も、
  // enum に含まれない値と同じ検証で失敗し、どちらにも x-enum-message が応答する。
  it('x-enum-message answers a role that is not a string too', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 1, priority: 2, accepted: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/role', detail: 'role must be admin / editor / viewer' }],
    })
  })

  // 4 is not a member.
  // 4 はメンバーではない。
  it('x-error-message answers a priority outside the enum', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 4, accepted: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/priority', detail: 'priority must be 1, 2, or 3' }],
    })
  })

  // The string "2" is not the number 2.
  // 文字列の "2" は、number の 2 ではない。
  it('x-error-message answers a priority as a string', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: '2', accepted: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/priority', detail: 'priority must be 1, 2, or 3' }],
    })
  })

  // The enum holds true only.
  // enum に含まれるのは true だけである。
  it('x-error-message answers false for accepted', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 2, accepted: false }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/accepted', detail: 'accepted must be true' }],
    })
  })
})
