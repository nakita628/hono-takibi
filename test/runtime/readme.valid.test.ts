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
// This file holds the requests that are accepted.
// このファイルには、受理されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/readme-app'

// x-error-message, x-minLength-message and x-maxLength-message on one property.
// 1つのプロパティに対する x-error-message・x-minLength-message・x-maxLength-message。
describe('custom validation error messages', () => {
  // A string within the length range.
  // 長さの範囲内の string。
  it('accepts a name', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ name: 'taro' })
  })

  // Exactly minLength.
  // ちょうど minLength の長さ。
  it('accepts a name of 1 character', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ name: 'a' })
  })

  // Exactly maxLength.
  // ちょうど maxLength の長さ。
  it('accepts a name of 50 characters', async () => {
    const res = await app.request('/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(50) }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    })
  })
})

// x-trim, x-toLowerCase, x-toUpperCase and x-normalize run before the value is validated.
// Every property is required, so each test sends all four.
// x-trim・x-toLowerCase・x-toUpperCase・x-normalize は、値の検証より前に実行される。
// すべてのプロパティが必須であるため、各テストでは4つすべてを送信する。
describe('string transforms before validation', () => {
  // Nothing to change.
  // 変換の必要がない値。
  it('passes values that need no transform through unchanged', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', slug: 'abc', country: 'JP', text: 'ok' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: 'user@example.com',
      slug: 'abc',
      country: 'JP',
      text: 'ok',
    })
  })

  // With its spaces, the value would not be an email address.
  // 空白が付いたままでは、値はメールアドレスとして無効である。
  it('x-trim strips the whitespace before the email is validated', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: '  user@example.com  ',
        slug: 'abc',
        country: 'JP',
        text: 'ok',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: 'user@example.com',
      slug: 'abc',
      country: 'JP',
      text: 'ok',
    })
  })

  // The pattern allows lower case only; the upper-case value passes because it is lower-cased
  // first.
  // パターンは小文字のみを許容する。大文字の値が通るのは、先に小文字化されるためである。
  it('x-toLowerCase lower-cases before the pattern is checked', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        slug: 'HELLO-WORLD',
        country: 'JP',
        text: 'ok',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: 'user@example.com',
      slug: 'hello-world',
      country: 'JP',
      text: 'ok',
    })
  })

  // jp becomes JP.
  // jp が JP になる。
  it('x-toUpperCase upper-cases the value', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@example.com', slug: 'abc', country: 'jp', text: 'ok' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: 'user@example.com',
      slug: 'abc',
      country: 'JP',
      text: 'ok',
    })
  })

  // NFC turns "e" followed by U+0301 into U+00E9.
  // NFC は、"e" と後続の U+0301 を U+00E9 に合成する。
  it('x-normalize composes a letter and its combining accent', async () => {
    const res = await app.request('/transforms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        slug: 'abc',
        country: 'JP',
        text: 'cafe\u0301',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: 'user@example.com',
      slug: 'abc',
      country: 'JP',
      text: 'caf\u00E9',
    })
  })
})

// x-coerce turns on coercion for a property of a request body.
// x-coerce は、リクエストボディのプロパティに対して coerce を有効にする。
describe('type coercion: x-coerce', () => {
  // Nothing to coerce. The date is a Date in the handler and an ISO string in the answer.
  // coerce の必要がない値。日付は、ハンドラ内では Date、応答では ISO 文字列になる。
  it('passes values of the declared type through', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asNumber: 1,
        asInt: 1,
        asBool: true,
        asDate: '2024-01-01T00:00:00.000Z',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asNumber: 1,
      asInt: 1,
      asBool: true,
      asDate: '2024-01-01T00:00:00.000Z',
    })
  })

  // Every value is sent as text and arrives as its declared type.
  // すべての値を文字列で送信し、宣言された型として受け取る。
  it('coerces text to a number, an integer, a boolean and a date', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asNumber: '3.14',
        asInt: '42',
        asBool: 'true',
        asDate: '2024-01-01T00:00:00Z',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asNumber: 3.14,
      asInt: 42,
      asBool: true,
      asDate: '2024-01-01T00:00:00.000Z',
    })
  })

  // "0" is coerced to 0, and minimum: 0 is inclusive.
  // "0" は 0 に coerce される。minimum: 0 は範囲に含まれる。
  it('accepts zero as text, the minimum of the integer', async () => {
    const res = await app.request('/coerce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        asNumber: 1,
        asInt: '0',
        asBool: true,
        asDate: '2024-01-01T00:00:00.000Z',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      asNumber: 1,
      asInt: 0,
      asBool: true,
      asDate: '2024-01-01T00:00:00.000Z',
    })
  })
})

// A codec decodes the wire value for the handler and encodes it again for the response.
// codec は、ワイヤ上の値をハンドラ用にデコードし、レスポンス用に再びエンコードする。
describe('codec: x-codec', () => {
  // The handler receives a Date. The answer holds its ISO string, with the milliseconds the
  // input left out.
  // ハンドラは Date を受け取る。応答には、その ISO 文字列が含まれる。
  // 入力で省略されていたミリ秒も付加される。
  it('decodes an ISO string and encodes it back', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedAt: '2024-01-01T00:00:00Z' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ updatedAt: '2024-01-01T00:00:00.000Z' })
  })

  // Nothing is lost in the round trip.
  // 往復の過程で、情報は失われない。
  it('keeps the milliseconds', async () => {
    const res = await app.request('/codec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updatedAt: '2024-01-01T00:00:00.123Z' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ updatedAt: '2024-01-01T00:00:00.123Z' })
  })
})

// Fragments of Zod code written in the spec.
// 仕様に書かれた Zod コードの断片。
describe('custom validation: x-refine and x-superRefine', () => {
  // Eight characters with an upper-case letter, and an address that is not blocked.
  // 大文字を含む 8 文字のパスワードと、ブロック対象でないアドレス。
  it('accepts a body that satisfies every rule', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'Abcdefgh', normalizedEmail: 'user@example.com' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      password: 'Abcdefgh',
      normalizedEmail: 'user@example.com',
    })
  })

  // The transforms are applied first.
  // 変換が先に適用される。
  it('trims and lower-cases the email before x-superRefine sees it', async () => {
    const res = await app.request('/custom-validation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'Abcdefgh', normalizedEmail: '  USER@example.com  ' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      password: 'Abcdefgh',
      normalizedEmail: 'user@example.com',
    })
  })
})

// x-prefault supplies an absent value, x-catch replaces an invalid one, and x-readonly
// freezes an object.
// x-prefault は欠落した値を補い、x-catch は不正な値を置き換え、
// x-readonly はオブジェクトを凍結する。
describe('defaults and fallbacks: x-prefault, x-catch, x-readonly', () => {
  // Nothing is absent or invalid.
  // 欠落も不正もない。
  it('passes a complete body through', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ greeting: 'hi', retries: 1, config: { name: 'cfg' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ greeting: 'hi', retries: 1, config: { name: 'cfg' } })
  })

  // greeting is absent, so "hello" is validated in its place.
  // greeting が欠落しているため、代わりに "hello" が検証される。
  it('x-prefault supplies a missing greeting', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ retries: 1, config: { name: 'cfg' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      greeting: 'hello',
      retries: 1,
      config: { name: 'cfg' },
    })
  })

  // The fallback 0 reaches the handler, and no error is reported.
  // フォールバック値 0 がハンドラに渡され、エラーは報告されない。
  it('x-catch replaces retries that are not an integer', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ greeting: 'hi', retries: 'not-an-int', config: { name: 'cfg' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ greeting: 'hi', retries: 0, config: { name: 'cfg' } })
  })

  // An absent value is a failure like any other.
  // 値の欠落も、他と同じく検証の失敗として扱われる。
  it('x-catch replaces missing retries', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ greeting: 'hi', config: { name: 'cfg' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ greeting: 'hi', retries: 0, config: { name: 'cfg' } })
  })

  // Freezing the object does not change what is valid.
  // オブジェクトを凍結しても、何が有効であるかは変わらない。
  it('x-readonly accepts an object', async () => {
    const res = await app.request('/defaults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ greeting: 'hi', retries: 1, config: { name: 'other' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      greeting: 'hi',
      retries: 1,
      config: { name: 'other' },
    })
  })
})

// Two checks on url, one on path.
// url に対する2つの検証と、path に対する1つの検証。
describe('string content checks: x-startsWith, x-endsWith, x-includes', () => {
  // The url starts with https:// and ends with .com; the path includes /api/.
  // url は https:// で始まり .com で終わる。path は /api/ を含む。
  it('accepts values that satisfy every check', async () => {
    const res = await app.request('/content-checks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com', path: '/api/v1' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ url: 'https://example.com', path: '/api/v1' })
  })
})

// Every property is required, so each test sends all nine and changes the one it is about.
// すべてのプロパティが必須であるため、各テストでは9つすべてを送信し、
// 検証対象の1つだけを変えている。
describe('format-specific options', () => {
  // x-urlNormalize normalises the URL, which adds the trailing slash.
  // x-urlNormalize により URL が正規化され、末尾にスラッシュが付加される。
  it('accepts a body that satisfies every option', async () => {
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
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      htmlEmail: 'user@example.com',
      customEmail: 'someone@example.com',
      uuidV7: '0190b1f4-0000-7000-8000-000000000000',
      httpsUrl: 'https://example.com/',
      preciseDatetime: '2024-01-01T00:00:00.123Z',
      localDatetime: '2024-01-01T00:00:00',
      mac: '00:11:22:33:44:55',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    })
  })

  // +09:00 instead of Z.
  // Z の代わりに +09:00 を指定。
  it('x-isoOffset accepts an offset', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123+09:00',
        localDatetime: '2024-01-01T00:00:00',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      htmlEmail: 'user@example.com',
      customEmail: 'someone@example.com',
      uuidV7: '0190b1f4-0000-7000-8000-000000000000',
      httpsUrl: 'https://example.com/',
      preciseDatetime: '2024-01-01T00:00:00.123+09:00',
      localDatetime: '2024-01-01T00:00:00',
      mac: '00:11:22:33:44:55',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    })
  })

  // That is what x-isoLocal is for.
  // x-isoLocal は、まさにこのための指定である。
  it('x-isoLocal accepts a date-time with no zone', async () => {
    const res = await app.request('/formats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        htmlEmail: 'user@example.com',
        customEmail: 'someone@example.com',
        uuidV7: '0190b1f4-0000-7000-8000-000000000000',
        httpsUrl: 'https://example.com',
        preciseDatetime: '2024-01-01T00:00:00.123Z',
        localDatetime: '2024-06-30T23:59:59',
        mac: '00:11:22:33:44:55',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      htmlEmail: 'user@example.com',
      customEmail: 'someone@example.com',
      uuidV7: '0190b1f4-0000-7000-8000-000000000000',
      httpsUrl: 'https://example.com/',
      preciseDatetime: '2024-01-01T00:00:00.123Z',
      localDatetime: '2024-06-30T23:59:59',
      mac: '00:11:22:33:44:55',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    })
  })
})

// A brand exists in the type only; at run time the schema validates like the plain object.
// ブランドは型の上にのみ存在する。実行時には、
// スキーマは通常のオブジェクトと同じように検証を行う。
describe('branded types: x-brand', () => {
  // The value is not changed by the brand.
  // ブランドによって、値が変わることはない。
  it('accepts a cat', async () => {
    const res = await app.request('/branded', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Tama' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ name: 'Tama' })
  })
})

// minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, const, and the messages
// of a required integer.
// minimum・maximum・exclusiveMinimum・exclusiveMaximum・multipleOf・const と、
// 必須の integer に対するメッセージ。
describe('numeric keywords', () => {
  // Every value is inside its range.
  // すべての値が範囲内にある。
  it('accepts a body that satisfies every keyword', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 30,
      ratio: 0.5,
      price: 1.5,
      quantity: 10,
      exact: 42,
    })
  })

  // minimum is inclusive.
  // minimum は範囲に含まれる。
  it('minimum accepts 0', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 0, ratio: 0.5, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 0,
      ratio: 0.5,
      price: 1.5,
      quantity: 10,
      exact: 42,
    })
  })

  // maximum is inclusive.
  // maximum は範囲に含まれる。
  it('maximum accepts 120', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 120, ratio: 0.5, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 120,
      ratio: 0.5,
      price: 1.5,
      quantity: 10,
      exact: 42,
    })
  })

  // Just above the bound.
  // 境界値をわずかに超える値。
  it('exclusiveMinimum accepts 0.001', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.001, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 30,
      ratio: 0.001,
      price: 1.5,
      quantity: 10,
      exact: 42,
    })
  })

  // Just below the bound.
  // 境界値をわずかに下回る値。
  it('exclusiveMaximum accepts 0.999', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.999, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 30,
      ratio: 0.999,
      price: 1.5,
      quantity: 10,
      exact: 42,
    })
  })

  // Three times 0.5.
  // 0.5 の 3 倍。
  it('multipleOf accepts 1.5', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 1.5, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 30,
      ratio: 0.5,
      price: 1.5,
      quantity: 10,
      exact: 42,
    })
  })

  // Zero is a multiple of every number.
  // 0 はあらゆる数の倍数である。
  it('multipleOf accepts 0', async () => {
    const res = await app.request('/numeric', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 30, ratio: 0.5, price: 0, quantity: 10, exact: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: 30,
      ratio: 0.5,
      price: 0,
      quantity: 10,
      exact: 42,
    })
  })
})

// minItems, maxItems, uniqueItems, and contains with minContains and maxContains.
// minItems・maxItems・uniqueItems と、minContains・maxContains 付きの contains。
describe('array keywords', () => {
  // One tag, distinct integers, one premium item.
  // タグが1つ、互いに異なる整数、premium の要素が1つ。
  it('accepts a body that satisfies every keyword', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [1, 2, 3], basket: [{ tier: 'premium' }] }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['t1'],
      unique: [1, 2, 3],
      basket: [{ tier: 'premium' }],
    })
  })

  // Exactly minItems.
  // ちょうど minItems の要素数。
  it('minItems accepts one tag', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['x'], unique: [1, 2, 3], basket: [{ tier: 'premium' }] }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['x'],
      unique: [1, 2, 3],
      basket: [{ tier: 'premium' }],
    })
  })

  // Exactly maxItems.
  // ちょうど maxItems の要素数。
  it('maxItems accepts five tags', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['1', '2', '3', '4', '5'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['1', '2', '3', '4', '5'],
      unique: [1, 2, 3],
      basket: [{ tier: 'premium' }],
    })
  })

  // Nothing can repeat in an empty array.
  // 空配列では、重複が起こりえない。
  it('uniqueItems accepts an empty list', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: ['t1'], unique: [], basket: [{ tier: 'premium' }] }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['t1'],
      unique: [],
      basket: [{ tier: 'premium' }],
    })
  })

  // Inside the range of 1 to 3.
  // 1〜3 の範囲内。
  it('contains accepts two premium items', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }, { tier: 'premium' }],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['t1'],
      unique: [1, 2, 3],
      basket: [{ tier: 'premium' }, { tier: 'premium' }],
    })
  })

  // Exactly maxContains.
  // ちょうど maxContains の個数。
  it('maxContains accepts three premium items', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [{ tier: 'premium' }, { tier: 'premium' }, { tier: 'premium' }],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['t1'],
      unique: [1, 2, 3],
      basket: [{ tier: 'premium' }, { tier: 'premium' }, { tier: 'premium' }],
    })
  })

  // Three premium items and two basic ones: five items, three matches.
  // premium が3つ、basic が2つ。要素は5つだが、一致するのは3つである。
  it('contains counts the matching items only', async () => {
    const res = await app.request('/array-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tags: ['t1'],
        unique: [1, 2, 3],
        basket: [
          { tier: 'premium' },
          { tier: 'basic' },
          { tier: 'premium' },
          { tier: 'basic' },
          { tier: 'premium' },
        ],
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tags: ['t1'],
      unique: [1, 2, 3],
      basket: [
        { tier: 'premium' },
        { tier: 'basic' },
        { tier: 'premium' },
        { tier: 'basic' },
        { tier: 'premium' },
      ],
    })
  })
})

// minProperties, maxProperties, additionalProperties, propertyNames, patternProperties,
// dependentRequired and dependentSchemas.
// minProperties・maxProperties・additionalProperties・propertyNames・patternProperties・
// dependentRequired・dependentSchemas。
describe('object keywords', () => {
  // One profile property, two namespace keys, an empty dependent.
  // profile のプロパティが1つ、namespace のキーが2つ、dependent は空。
  it('accepts a body that satisfies every keyword', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      profile: { a: '1' },
      namespace: { x_one: 'ok', x_two: 'ok' },
      dependent: {},
    })
  })

  // Exactly maxProperties.
  // ちょうど maxProperties の個数。
  it('maxProperties accepts three properties', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1', b: '2', c: '3' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: {},
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      profile: { a: '1', b: '2', c: '3' },
      namespace: { x_one: 'ok', x_two: 'ok' },
      dependent: {},
    })
  })

  // Only keys that start with x_ have to be strings.
  // string でなければならないのは、x_ で始まるキーだけである。
  it('patternProperties leaves a key that does not match alone', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: { a: '1' }, namespace: { other: 42 }, dependent: {} }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      profile: { a: '1' },
      namespace: { other: 42 },
      dependent: {},
    })
  })

  // billing is required when cc is present, and it is.
  // cc が存在する場合は billing が必須となり、billing も存在している。
  it('dependentRequired accepts cc with billing', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: { cc: '4111111111111111', billing: '00000' },
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      profile: { a: '1' },
      namespace: { x_one: 'ok', x_two: 'ok' },
      dependent: { cc: '4111111111111111', billing: '00000' },
    })
  })

  // The dependency goes one way.
  // 依存関係は一方向である。
  it('dependentRequired accepts billing alone', async () => {
    const res = await app.request('/object-edge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: { a: '1' },
        namespace: { x_one: 'ok', x_two: 'ok' },
        dependent: { billing: '00000' },
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      profile: { a: '1' },
      namespace: { x_one: 'ok', x_two: 'ok' },
      dependent: { billing: '00000' },
    })
  })
})

// allOf, anyOf, oneOf and not, each with its message extension.
// allOf・anyOf・oneOf・not と、それぞれのメッセージ拡張。
describe('combinators', () => {
  // merged satisfies both branches.
  // merged は、両方の分岐を満たしている。
  it('accepts a body that satisfies every combinator', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      merged: { name: 'taro', age: 30 },
      picked: 'hello',
      exclusive: 'world',
      banned: 'allowed',
    })
  })

  // The string branch.
  // string 側の分岐。
  it('anyOf accepts a string', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'x',
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      merged: { name: 'taro', age: 30 },
      picked: 'x',
      exclusive: 'world',
      banned: 'allowed',
    })
  })

  // The integer branch.
  // integer 側の分岐。
  it('anyOf accepts an integer', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 7,
        exclusive: 'world',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      merged: { name: 'taro', age: 30 },
      picked: 7,
      exclusive: 'world',
      banned: 'allowed',
    })
  })

  // The string branch.
  // string 側の分岐。
  it('oneOf accepts a string', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'a',
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      merged: { name: 'taro', age: 30 },
      picked: 'hello',
      exclusive: 'a',
      banned: 'allowed',
    })
  })

  // The integer branch.
  // integer 側の分岐。
  it('oneOf accepts an integer', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 1,
        banned: 'allowed',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      merged: { name: 'taro', age: 30 },
      picked: 'hello',
      exclusive: 1,
      banned: 'allowed',
    })
  })

  // Anything but the constant.
  // 定数値以外であれば、何でもよい。
  it('not accepts another value', async () => {
    const res = await app.request('/combinators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merged: { name: 'taro', age: 30 },
        picked: 'hello',
        exclusive: 'world',
        banned: 'other',
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      merged: { name: 'taro', age: 30 },
      picked: 'hello',
      exclusive: 'world',
      banned: 'other',
    })
  })
})

// A string enum, an integer enum and a boolean enum.
// string・integer・boolean の enum。
describe('enums', () => {
  // admin, 2 and true.
  // admin・2・true。
  it('accepts a member of every enum', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 2, accepted: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ role: 'admin', priority: 2, accepted: true })
  })

  // Another member.
  // 別のメンバー。
  it('accepts the role editor', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'editor', priority: 2, accepted: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ role: 'editor', priority: 2, accepted: true })
  })

  // The last member.
  // 最後のメンバー。
  it('accepts the role viewer', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'viewer', priority: 2, accepted: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ role: 'viewer', priority: 2, accepted: true })
  })

  // The first member.
  // 最初のメンバー。
  it('accepts the priority 1', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 1, accepted: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ role: 'admin', priority: 1, accepted: true })
  })

  // The last member.
  // 最後のメンバー。
  it('accepts the priority 3', async () => {
    const res = await app.request('/enums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin', priority: 3, accepted: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ role: 'admin', priority: 3, accepted: true })
  })
})
