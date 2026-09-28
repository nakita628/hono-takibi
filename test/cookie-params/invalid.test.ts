// Every parameter shape the generator supports, sent as a real cookie. A cookie reaches
// the handler as a string just like a query or header value, but it took the branch that
// used to skip coercion entirely, so every numeric or boolean cookie rejected its own
// input.
//
// 生成器が対応するすべてのパラメータ形状を、実際の Cookie として送信して検証する。
// Cookie もクエリやヘッダーと同じく文字列で届くが、かつて coerce を完全にスキップしていた
// 分岐を通るため、数値・真偽値の Cookie はすべて自身の入力を拒否していた。
//
// How to read a test / テストの読み方:
//   Every route answers the cookies its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A cookie that
//   was not sent and has no default is absent from the answer. A rejected request answers
//   422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取った Cookie を名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもない Cookie は、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// How a value is sent / 値の送信方法:
//   A value that holds anything but plain ASCII is percent-encoded with
//   `encodeURIComponent`, the way a client sets such a cookie; Hono decodes it before
//   validation. The tests named "wire" send the `Cookie:` header exactly as written instead.
//   プレーンな ASCII 以外を含む値は、クライアントが Cookie を設定するときと同じく
//   `encodeURIComponent` でパーセントエンコードして送信する。Hono は検証の前にこれを
//   デコードする。"wire" と名付けたテストでは、`Cookie:` ヘッダーを書かれたとおりに送信する。
//
// Routes / ルート:
//   /cookies   every shape as `<shape>`, and the array `ids`, all optional
//              全形状(`<shape>`)と配列 `ids`。すべて任意
//   /optional  literals, constraints, transforms, odd names / リテラル・制約・変換・名前
//   /defaults  cookies with a default / デフォルト値を持つ Cookie
//   /required  required cookies / 必須 Cookie
//
// This file holds the requests that are rejected. Each answers 422 with the name of every
// parameter that failed, or 404 when the request matches no route at all.
// このファイルには、拒否されるリクエストをまとめている。いずれも、
// 失敗した各パラメータの名前とともに 422 を返すか、
// どのルートにも一致しない場合は 404 を返す。
//
// Contents / 目次:
//   - shapes: a shape that is not a string rejects a word
//   - integers: rejected values
//   - floats: rejected values
//   - booleans: rejected values
//   - formats: what each string format rejects
//   - literals, constraints and transforms
//   - optional: absent and present
//   - defaults
//   - required
//   - names
//   - wire: the Cookie header
//   - arrays
//   - objects: an object in cookies
//   - references: a schema behind $ref
//   - strictness: what the wire grammar does not read
import { describe, expect, it } from 'vite-plus/test'

import { cookieParamsApp } from './app'

// A non-string shape that coerces carelessly would accept anything. A word must be rejected
// by every one of them.
// 雑な coerce を行う非文字列形状は、何でも受理してしまう。単語は、
// どの非文字列形状でも拒否されなければならない。
describe('shapes: a shape that is not a string rejects a word', () => {
  // A word is not a number.
  // 単語は number ではない。
  it('integer rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('int32 rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int32=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('int64 rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('bigint rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'bigint=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bigint'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('uint32 rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint32=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('uint64 rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint64=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('number rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'number=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float32 rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float32=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float64 rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float64=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('double rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'double=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['double'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('numpassword rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'numpassword=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numpassword'] })
  })

  // A word is not a boolean.
  // 単語は boolean ではない。
  it('boolean rejects "not-a-value"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'boolean=not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })
})

// One past each boundary, and text that is not an integer.
// 各境界を 1 超えた値と、整数でない文字列。
describe('integers: rejected values', () => {
  // A fraction is not an integer.
  // 小数は整数ではない。
  it('integer rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Past MAX_SAFE_INTEGER a double would round to a different number, so the value is refused.
  // MAX_SAFE_INTEGER を超えると double は別の数値に丸めてしまうため、拒否される。
  it('integer rejects "9007199254740993"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=9007199254740993' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Past MIN_SAFE_INTEGER, for the same reason.
  // MIN_SAFE_INTEGER を下回る値も同じ理由で拒否される。
  it('integer rejects "-9007199254740993"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=-9007199254740993' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('integer rejects "Infinity"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=Infinity' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Negative infinity is not finite.
  // -Infinity は有限の数ではない。
  it('integer rejects "-Infinity"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=-Infinity' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('integer rejects "NaN"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=NaN' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A thousands separator is not part of a number.
  // 桁区切りのカンマは数値の一部ではない。
  it('integer rejects "1,000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `integer=${encodeURIComponent('1,000')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // The JavaScript numeric separator is source syntax, not a value.
  // JavaScript の数値セパレータはソース上の記法であり、値ではない。
  it('integer rejects "1_000"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=1_000' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A full-width digit is not an ASCII digit.
  // 全角数字は ASCII の数字ではない。
  it('integer rejects "９"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `integer=${encodeURIComponent('９')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // The word "null" is not a number.
  // "null" という単語は数値ではない。
  it('integer rejects "null"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=null' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A boolean is not a number.
  // 真偽値は数値ではない。
  it('integer rejects "true"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=true' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Digits followed by text are not a number.
  // 数字の後ろに文字が続く値は数値ではない。
  it('integer rejects "12abc"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=12abc' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // One past the int32 maximum.
  // int32 の最大値を 1 超える。
  it('int32 rejects "2147483648"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int32=2147483648' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // One past the int32 minimum.
  // int32 の最小値を 1 下回る。
  it('int32 rejects "-2147483649"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int32=-2147483649' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // A fraction is not an int32.
  // 小数は int32 ではない。
  it('int32 rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int32=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // One past the uint32 maximum.
  // uint32 の最大値を 1 超える。
  it('uint32 rejects "4294967296"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint32=4294967296' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint32 rejects "-1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'uint32=-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // A fraction is not a uint32.
  // 小数は uint32 ではない。
  it('uint32 rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'uint32=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('int64 rejects "9223372036854775808"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=9223372036854775808' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // One past the int64 minimum.
  // int64 の最小値を 1 下回る。
  it('int64 rejects "-9223372036854775809"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=-9223372036854775809' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('int64 rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // The JavaScript bigint suffix is source syntax, not a value.
  // JavaScript の bigint 接尾辞はソース上の記法であり、値ではない。
  it('int64 rejects "1n"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=1n' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // One past the uint64 maximum.
  // uint64 の最大値を 1 超える。
  it('uint64 rejects "18446744073709551616"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint64=18446744073709551616' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint64 rejects "-1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'uint64=-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('uint64 rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'uint64=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })
})

// Values that are not finite, overflow, or are not a number at all.
// 有限でない値、オーバーフローする値、そもそも数値でない値。
describe('floats: rejected values', () => {
  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('number rejects "Infinity"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'number=Infinity' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('number rejects "NaN"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=NaN' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('number rejects "1e400"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=1e400' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A decimal comma is not a decimal point.
  // 小数点としてのカンマは認められない。
  it('number rejects "1,5"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `number=${encodeURIComponent('1,5')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Two decimal points.
  // 小数点が2つある。
  it('number rejects "1.5.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=1.5.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Past the float32 maximum; format: float is a float32.
  // float32 の最大値を超える。format: float は float32 である。
  it('float rejects "3.5e38"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float=3.5e38' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float'] })
  })

  // Past the float32 maximum.
  // float32 の最大値を超える。
  it('float32 rejects "3.5e38"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float32=3.5e38' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32'] })
  })

  // Past the float32 minimum.
  // float32 の最小値を下回る。
  it('float32 rejects "-3.5e38"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float32=-3.5e38' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('float64 rejects "1e309"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float64=1e309' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('float64 rejects "Infinity"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float64=Infinity' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('double rejects "1e309"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'double=1e309' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['double'] })
  })

  // format: password does not loosen the number check.
  // format: password を付けても、数値の検証は緩まない。
  it('numpassword rejects "NaN"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'numpassword=NaN' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numpassword'] })
  })
})

// Anything outside the accepted spellings is rejected rather than read as true.
// 受理される表記以外は、true として読まれるのではなく拒否される。
describe('booleans: rejected values', () => {
  // A number that is neither 0 nor 1.
  // 0 でも 1 でもない数値。
  it('boolean rejects "2"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=2' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // An abbreviation outside the accepted spellings.
  // 受理される表記に含まれない略語。
  it('boolean rejects "t"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=t' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // The word "null" is not a boolean.
  // "null" という単語は真偽値ではない。
  it('boolean rejects "null"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=null' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // Leading whitespace is not trimmed.
  // 先頭の空白はトリムされない。
  it('boolean rejects " true"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `boolean=${encodeURIComponent(' true')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // Trailing whitespace is not trimmed.
  // 末尾の空白はトリムされない。
  it('boolean rejects "true "', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `boolean=${encodeURIComponent('true ')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // A word that merely starts with "true".
  // "true" で始まるだけの別の単語。
  it('boolean rejects "truthy"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=truthy' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })
})

// A string format is a validator: a value that does not fit is rejected, not passed through
// as plain text.
// 文字列フォーマットはバリデータである。形式に合わない値は、
// 素の文字列として素通りせず拒否される。
describe('formats: what each string format rejects', () => {
  // No top-level domain.
  // トップレベルドメインがない。
  it('email rejects "a@b"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('a@b')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // No local part.
  // ローカル部がない。
  it('email rejects "@example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('@example.com')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // No domain.
  // ドメインがない。
  it('email rejects "user@"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user@')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // A trailing dot.
  // 末尾にドットがある。
  it('email rejects "user@example.com."', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user@example.com.')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // A space in the local part.
  // ローカル部に空白がある。
  it('email rejects "user @example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user @example.com')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // Two at signs.
  // アットマークが2つある。
  it('email rejects "user@@example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user@@example.com')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // A non-ASCII domain.
  // ASCII でないドメイン。
  it('email rejects "user@例え.jp"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user@例え.jp')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('uuid rejects "0190b1f400007000800000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=0190b1f400007000800000000000000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // Version 9 does not exist.
  // バージョン 9 は存在しない。
  it('uuid rejects "a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // Wrapped in braces.
  // 波括弧で囲まれている。
  it('uuid rejects "{0190b1f4-0000-7000-8000-000000000000}"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `uuid=${encodeURIComponent('{0190b1f4-0000-7000-8000-000000000000}')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // One digit short.
  // 1桁足りない。
  it('uuid rejects "0190b1f4-0000-7000-8000-00000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=0190b1f4-0000-7000-8000-00000000000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('uuid rejects "0190b1f4-0000-7000-8000-00000000000g"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=0190b1f4-0000-7000-8000-00000000000g' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // A version 7 UUID is not a version 4 one.
  // バージョン 7 の UUID はバージョン 4 ではない。
  it('uuidv4 rejects "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuidv4=0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuidv4'] })
  })

  // A version 4 UUID is not a version 7 one.
  // バージョン 4 の UUID はバージョン 7 ではない。
  it('uuidv7 rejects "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuidv7=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuidv7'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('guid rejects "a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'guid=a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['guid'] })
  })

  // No scheme.
  // スキームがない。
  it('url rejects "example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'url=example.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url'] })
  })

  // No host.
  // ホストがない。
  it('url rejects "https://"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('https://')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url'] })
  })

  // A relative reference.
  // 相対参照である。
  it('url rejects "/path"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('/path')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url'] })
  })

  // No scheme.
  // スキームがない。
  it('uri rejects "example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uri=example.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uri'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl rejects "ftp://example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `httpurl=${encodeURIComponent('ftp://example.com')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl rejects "mailto:a@b.c"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `httpurl=${encodeURIComponent('mailto:a@b.c')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl'] })
  })

  // A label that starts with a hyphen.
  // ラベルがハイフンで始まっている。
  it('hostname rejects "-bad.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=-bad.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // An underscore.
  // アンダースコアを含む。
  it('hostname rejects "exa_mple.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=exa_mple.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // A label longer than 63 octets.
  // ラベルが 63 オクテットを超えている。
  it('hostname rejects "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: {
        Cookie: 'hostname=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
      },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // Non-ASCII, not punycode.
  // Punycode でない非 ASCII 文字。
  it('hostname rejects "例え.jp"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `hostname=${encodeURIComponent('例え.jp')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // A 0x prefix.
  // 0x 接頭辞が付いている。
  it('hex rejects "0x1f"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'hex=0x1f' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hex'] })
  })

  // Not hexadecimal.
  // 16進数ではない。
  it('hex rejects "xyz"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'hex=xyz' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hex'] })
  })

  // A letter.
  // 英字である。
  it('emoji rejects "a"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'emoji=a' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji'] })
  })

  // A digit.
  // 数字である。
  it('emoji rejects "1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'emoji=1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji'] })
  })

  // An emoji followed by a letter.
  // 絵文字の後ろに英字が続く。
  it('emoji rejects "🔥a"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `emoji=${encodeURIComponent('🔥a')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji'] })
  })

  // Missing padding.
  // パディングが欠けている。
  it('base64 rejects "aGVsbG8"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'base64=aGVsbG8' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64'] })
  })

  // The base64url alphabet.
  // base64url の文字を使っている。
  it('base64 rejects "a-b_"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'base64=a-b_' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64'] })
  })

  // Outside the alphabet.
  // 使用できない文字である。
  it('base64 rejects "!!!!"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'base64=!!!!' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64'] })
  })

  // Padding is not allowed.
  // パディングは許可されない。
  it('base64url rejects "aGVsbG8="', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `base64url=${encodeURIComponent('aGVsbG8=')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64url'] })
  })

  // The base64 alphabet.
  // base64 の文字を使っている。
  it('base64url rejects "a+b/"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `base64url=${encodeURIComponent('a+b/')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64url'] })
  })

  // Too short.
  // 短すぎる。
  it('nanoid rejects "short"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'nanoid=short' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid'] })
  })

  // One character too long.
  // 1文字長い。
  it('nanoid rejects "V1StGXR8_Z5jdHi6B-myT1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'nanoid=V1StGXR8_Z5jdHi6B-myT1' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('nanoid rejects "V1StGXR8_Z5jdHi6B!myT"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'nanoid=V1StGXR8_Z5jdHi6B!myT' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid'] })
  })

  // Upper case.
  // 大文字を含む。
  it('cuid2 rejects "Tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'cuid2=Tz4a98xxat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cuid2'] })
  })

  // A hyphen.
  // ハイフンを含む。
  it('cuid2 rejects "tz4a98-xat96iws9zmbrgj3a"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'cuid2=tz4a98-xat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cuid2'] })
  })

  // One character short.
  // 1文字足りない。
  it('ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FA"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ulid=01ARZ3NDEKTSV4RRFFQ69G5FA' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ulid'] })
  })

  // Crockford base32 leaves out the letter U.
  // Crockford base32 は文字 U を含まない。
  it('ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FAU"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ulid=01ARZ3NDEKTSV4RRFFQ69G5FAU' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ulid'] })
  })

  // An octet past 255.
  // オクテットが 255 を超えている。
  it('ipv4 rejects "256.0.0.1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ipv4=256.0.0.1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // Three octets.
  // オクテットが3つしかない。
  it('ipv4 rejects "1.2.3"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ipv4=1.2.3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // Five octets.
  // オクテットが5つある。
  it('ipv4 rejects "1.2.3.4.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ipv4=1.2.3.4.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // A leading zero.
  // 先頭にゼロがある。
  it('ipv4 rejects "01.2.3.4"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ipv4=01.2.3.4' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // An IPv6 address.
  // IPv6 アドレスである。
  it('ipv4 rejects "::1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv4=${encodeURIComponent('::1')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // A group that is not hexadecimal.
  // 16進数でないグループを含む。
  it('ipv6 rejects "2001:db8::g"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('2001:db8::g')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6'] })
  })

  // An IPv4 address.
  // IPv4 アドレスである。
  it('ipv6 rejects "1.2.3.4"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ipv6=1.2.3.4' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6'] })
  })

  // Wrapped in brackets, as in a URL.
  // URL のように角括弧で囲まれている。
  it('ipv6 rejects "[::1]"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('[::1]')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv4 rejects "192.168.0.0"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'cidrv4=192.168.0.0' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv4'] })
  })

  // A prefix past 32.
  // プレフィックス長が 32 を超えている。
  it('cidrv4 rejects "192.168.0.0/33"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv4=${encodeURIComponent('192.168.0.0/33')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv4'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv6 rejects "2001:db8::"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv6=${encodeURIComponent('2001:db8::')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv6'] })
  })

  // A prefix past 128.
  // プレフィックス長が 128 を超えている。
  it('cidrv6 rejects "2001:db8::/129"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv6=${encodeURIComponent('2001:db8::/129')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv6'] })
  })

  // 29 February of a year that is not a leap year.
  // うるう年でない年の 2月29日。
  it('date rejects "2021-02-29"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=2021-02-29' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Month 13.
  // 13 月。
  it('date rejects "2020-13-01"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=2020-13-01' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // 31 April.
  // 4月31日。
  it('date rejects "2020-04-31"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=2020-04-31' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('date rejects "2020-1-2"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'date=2020-1-2' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // The basic format, with no hyphens.
  // ハイフンのない基本形式。
  it('date rejects "20200102"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'date=20200102' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Slashes.
  // スラッシュ区切り。
  it('date rejects "2020/01/02"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `date=${encodeURIComponent('2020/01/02')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // A date-time is not a date.
  // 日時は日付ではない。
  it('date rejects "2020-01-02T00:00:00Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `date=${encodeURIComponent('2020-01-02T00:00:00Z')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Hour 24.
  // 24 時。
  it('time rejects "24:00:00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('24:00:00')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // A leap second.
  // うるう秒。
  it('time rejects "23:59:60"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('23:59:60')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('time rejects "1:02:03"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('1:02:03')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // A zone designator.
  // タイムゾーン指定子が付いている。
  it('time rejects "12:34:56Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34:56Z')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // An offset.
  // オフセットが付いている。
  it('time rejects "12:34:56+09:00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34:56+09:00')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // No zone designator.
  // タイムゾーン指定子がない。
  it('datetime rejects "2020-01-02T03:04:05"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02T03:04:05')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // An offset instead of Z: the generated z.iso.datetime() takes Z only.
  // Z ではなくオフセット。生成される z.iso.datetime() は Z のみを受理する。
  it('datetime rejects "2020-01-02T03:04:05+09:00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02T03:04:05+09:00')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // A date is not a date-time.
  // 日付は日時ではない。
  it('datetime rejects "2020-01-02"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'datetime=2020-01-02' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // A space instead of T.
  // T の代わりに空白を使っている。
  it('datetime rejects "2020-01-02 03:04:05Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02 03:04:05Z')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // Lower-case designators.
  // 指定子が小文字である。
  it('datetime rejects "2020-01-02t03:04:05z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02t03:04:05z')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // 30 February.
  // 2月30日。
  it('datetime rejects "2020-02-30T00:00:00Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-02-30T00:00:00Z')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // No component.
  // 要素がない。
  it('duration rejects "P"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=P' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // No time component after T.
  // T の後に時刻要素がない。
  it('duration rejects "PT"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=PT' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // No P designator.
  // P 指定子がない。
  it('duration rejects "1Y"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=1Y' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // Negative.
  // 負の期間。
  it('duration rejects "-P1D"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=-P1D' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // A fractional day.
  // 小数の日数。
  it('duration rejects "P1.5D"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=P1.5D' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // Weeks mixed with other units.
  // 週を他の単位と混在させている。
  it('duration rejects "P1M1W"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=P1M1W' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // Hyphen separators.
  // ハイフン区切り。
  it('mac rejects "00-1a-2b-3c-4d-5e"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'mac=00-1a-2b-3c-4d-5e' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // No separators.
  // 区切り文字がない。
  it('mac rejects "001a2b3c4d5e"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'mac=001a2b3c4d5e' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // Dotted triples.
  // ドット区切りの3グループ表記。
  it('mac rejects "001a.2b3c.4d5e"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'mac=001a.2b3c.4d5e' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // Five octets.
  // オクテットが5つしかない。
  it('mac rejects "00:1a:2b:3c:4d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `mac=${encodeURIComponent('00:1a:2b:3c:4d')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('mac rejects "00:1a:2b:3c:4d:5g"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `mac=${encodeURIComponent('00:1a:2b:3c:4d:5g')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // No plus sign.
  // プラス記号がない。
  it('e164 rejects "14155552671"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'e164=14155552671' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // A country code that starts with 0.
  // 国番号が 0 で始まっている。
  it('e164 rejects "+0123456789"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `e164=${encodeURIComponent('+0123456789')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // Too short.
  // 短すぎる。
  it('e164 rejects "+1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `e164=${encodeURIComponent('+1')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // Past 15 digits.
  // 15桁を超えている。
  it('e164 rejects "+1234567890123456"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `e164=${encodeURIComponent('+1234567890123456')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // A letter.
  // 英字を含む。
  it('e164 rejects "+1415555267a"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `e164=${encodeURIComponent('+1415555267a')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // Fails the Luhn check.
  // Luhn チェックに失敗する。
  it('creditcard rejects "4111111111111112"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'creditcard=4111111111111112' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['creditcard'] })
  })

  // Too short.
  // 短すぎる。
  it('creditcard rejects "1234"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'creditcard=1234' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['creditcard'] })
  })

  // Fails the checksum.
  // チェックサムが一致しない。
  it('iban rejects "DE89370400440532013001"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'iban=DE89370400440532013001' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // Lower case.
  // 小文字である。
  it('iban rejects "de89370400440532013000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'iban=de89370400440532013000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // The printed form, with spaces.
  // 空白入りの印字形式。
  it('iban rejects "DE89 3704 0044 0532 0130 00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `iban=${encodeURIComponent('DE89 3704 0044 0532 0130 00')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // Too short.
  // 短すぎる。
  it('iban rejects "XX00"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'iban=XX00' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // Lower case.
  // 小文字である。
  it('currencycode rejects "usd"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=usd' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // Not an ISO 4217 code.
  // ISO 4217 に存在しないコード。
  it('currencycode rejects "ZZZ"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=ZZZ' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // Two letters.
  // 2文字しかない。
  it('currencycode rejects "US"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=US' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // Four letters.
  // 4文字ある。
  it('currencycode rejects "USDD"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=USDD' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // A numeric code.
  // 数字のコード。
  it('currencycode rejects "999"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=999' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // One character short.
  // 1文字足りない。
  it('ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ksuid=0ujsszwN8NRY24YaXiTIE2VWDT' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ksuid'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT!"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ksuid=0ujsszwN8NRY24YaXiTIE2VWDT!' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ksuid'] })
  })

  // One character short.
  // 1文字足りない。
  it('xid rejects "9m4e2mr0ui3e8a215n4"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'xid=9m4e2mr0ui3e8a215n4' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['xid'] })
  })

  // The letter z is not in base32hex.
  // 文字 z は base32hex に含まれない。
  it('xid rejects "9m4e2mr0ui3e8a215n4z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'xid=9m4e2mr0ui3e8a215n4z' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['xid'] })
  })
})

// The same keywords as in a path or a query string, on the cookie branch of the generator.
// path や query と同じキーワードを、生成器の Cookie 用の分岐で検証する。
describe('literals, constraints and transforms', () => {
  // Outside the enum.
  // enum に含まれない値。
  it('ienum rejects "4"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ienum=4' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum'] })
  })

  // Between two members.
  // 2つのメンバーの中間の値。
  it('ienum rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ienum=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum'] })
  })

  // The boolean the enum leaves out.
  // enum に含まれていない側の真偽値。
  it('benum rejects "false"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'benum=false' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['benum'] })
  })

  // Not the constant.
  // 定数値ではない。
  it('iconst rejects "8"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'iconst=8' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iconst'] })
  })

  // A string enum is case-sensitive.
  // string の enum は大文字小文字を区別する。
  it('senum rejects "ASC"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'senum=ASC' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['senum'] })
  })

  // Outside the enum.
  // enum に含まれない値。
  it('senum rejects "up"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'senum=up' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['senum'] })
  })

  // Matches neither branch.
  // どちらの分岐にも一致しない。
  it('ioneof rejects "other"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ioneof=other' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ioneof'] })
  })

  // A fraction matches neither branch.
  // 小数はどちらの分岐にも一致しない。
  it('ioneof rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ioneof=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ioneof'] })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('range rejects "0"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'range=0' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['range'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('range rejects "101"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'range=101' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['range'] })
  })

  // One below minLength.
  // minLength を 1 下回る。
  it('length rejects "a"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'length=a' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['length'] })
  })

  // One above maxLength.
  // maxLength を 1 超える。
  it('length rejects "abcde"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'length=abcde' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['length'] })
  })

  // Upper case.
  // 大文字である。
  it('pattern rejects "ABC-1"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'pattern=ABC-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // Four digits where three are allowed.
  // 3桁までのところに4桁ある。
  it('pattern rejects "abc-1234"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'pattern=abc-1234' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // A trailing line feed: $ must not match before it.
  // 末尾の改行。$ はその直前に一致してはならない。
  it('pattern rejects "abc-1\\n"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: `pattern=${encodeURIComponent('abc-1\n')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // The transform runs first and the format check second, on the transformed value:
  // lower-cased, this is still not an email.
  // 変換が先、フォーマット検証が後であり、検証は変換後の値に対して行われる。小文字化しても、
  // これはメールアドレスではない。
  it('tx_email rejects "NOT-AN-EMAIL"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'tx_email=NOT-AN-EMAIL' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tx_email'] })
  })

  // Lower-casing does not trim, so the leading space fails the email check.
  // 小文字化はトリムを行わないため、先頭の空白がメールアドレスの検証で失敗する。
  it('tx_email rejects " USER@EXAMPLE.COM"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: `tx_email=${encodeURIComponent(' USER@EXAMPLE.COM')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tx_email'] })
  })
})

// /optional declares every cookie without required: true.
// /optional は、すべての Cookie を required: true なしで宣言している。
describe('optional: absent and present', () => {
  // Optional does not mean unchecked: a value that is sent is validated.
  // 任意であることは無検証を意味しない。送信された値は検証される。
  it('int_opt rejects "x"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'int_opt=x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // A fraction is not an integer, optional or not.
  // 任意であっても、小数は整数ではない。
  it('int_opt rejects "1.5"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'int_opt=1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('int64_opt rejects "9223372036854775808"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int64_opt=9223372036854775808' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_opt'] })
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('bool_opt rejects "maybe"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'bool_opt=maybe' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bool_opt'] })
  })

  // Three invalid cookies, three issues, in declaration order.
  // 不正な Cookie が3つあり、issue も3つ、宣言順に報告される。
  it('reports every cookie that fails', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'range=0; int_opt=x; bool_opt=maybe' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt', 'bool_opt', 'range'] })
  })
})

// /defaults declares every cookie with a default.
// /defaults は、すべての Cookie をデフォルト値付きで宣言している。
describe('defaults', () => {
  // A default does not rescue an invalid value: it replaces an absent one only.
  // デフォルトは不正な値を救済しない。置き換えるのは省略された場合のみである。
  it('rejects an invalid integer rather than falling back', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'int_def=x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_def'] })
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('rejects an invalid boolean rather than falling back', async () => {
    const res = await cookieParamsApp.request('/defaults', {
      headers: { Cookie: 'bool_def=maybe' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bool_def'] })
  })
})

// /required declares id, big, flag and name with required: true, and note without.
// /required は id・big・flag・name を required: true で、
// note を required なしで宣言している。
describe('required', () => {
  // id is left out.
  // id を省略している。
  it('reports a missing required integer', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'big=1; flag=true; name=n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // big is left out.
  // big を省略している。
  it('reports a missing required int64', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=1; flag=true; name=n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['big'] })
  })

  // flag is left out.
  // flag を省略している。
  it('reports a missing required boolean', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=1; big=1; name=n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['flag'] })
  })

  // name is left out.
  // name を省略している。
  it('reports a missing required string', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=1; big=1; flag=true' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['name'] })
  })

  // All four are reported, in declaration order.
  // 4つすべてが宣言順に報告される。
  it('reports every required cookie when there is no Cookie header', async () => {
    const res = await cookieParamsApp.request('/required')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id', 'big', 'flag', 'name'] })
  })

  // An empty header is the same as none.
  // 空のヘッダーは、ヘッダーがない場合と同じである。
  it('reports every required cookie when the Cookie header is empty', async () => {
    const res = await cookieParamsApp.request('/required', { headers: { Cookie: '' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id', 'big', 'flag', 'name'] })
  })

  // Present is not enough: the value has to be valid too.
  // 存在するだけでは不十分で、値も有効でなければならない。
  it('reports a required cookie that is present and invalid', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=x; big=1; flag=true; name=n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })
})

// The name has to survive from the spec to the validated object, character for character.
// 名前は、仕様から検証済みオブジェクトに至るまで、1文字も変わらず保たれなければならない。
describe('names', () => {
  // Each issue carries the name exactly as the spec declares it.
  // 各 issue には、仕様で宣言されたとおりの名前が入る。
  it('reports a failure under the declared name', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'session-id=x; user.id=x' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['session-id', 'user.id'] })
  })
})

// The Cookie header is sent exactly as written in each test, because the wire format itself
// is the subject.
// ワイヤ形式そのものが検証対象のため、各テストでは Cookie ヘッダーを書かれたとおりに
// 送信する。
describe('wire: the Cookie header', () => {
  // The first value is the one that counts, and it is invalid.
  // 採用されるのは最初の値であり、それが不正である。
  it('rejects a name sent twice whose first value is invalid', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=x; int_opt=1' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // /optional declares GET only.
  // /optional が宣言しているのは GET だけである。
  it('answers 404 to a method the spec does not declare', async () => {
    const res = await cookieParamsApp.request('/optional', {
      method: 'POST',
      headers: { Cookie: 'int_opt=1' },
    })
    expect(res.status).toBe(404)
  })

  // Hono answers HEAD through the GET route, so the cookie is validated the same way: an
  // invalid one is rejected.
  // Hono は HEAD を GET のルートで処理するため、Cookieは同じように検証される。
  // 不正な値は拒否される。
  it('rejects an invalid HEAD request like the GET it mirrors', async () => {
    const res = await cookieParamsApp.request('/optional', {
      method: 'HEAD',
      headers: { Cookie: 'int_opt=x' },
    })
    expect(res.status).toBe(422)
  })
})

// ids is an array of integers.
// ids は integer の配列である。
describe('arrays', () => {
  // The issue path ends in the index of the element, 0.
  // issue のパスは、要素のインデックス 0 で終わる。
  it('rejects an element that is not an integer, at its index', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.0'] })
  })

  // The value is split on its commas, and the second element is not an integer.
  // 値はカンマで分割され、2番目の要素が整数ではない。
  it('rejects a word among comma-separated elements', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1,x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.1'] })
  })

  // Two commas in a row leave an empty element, which is not an integer.
  // カンマが連続すると空の要素が残る。空の要素は整数ではない。
  it('rejects an empty element between two commas', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1,,2' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.1'] })
  })
})

// A property is validated on its own and reported under the name of the object and its own.
// プロパティは個別に検証され、オブジェクト名と自身の名前で報告される。
describe('objects: an object in cookies', () => {
  // size is an integer.
  // size は integer である。
  it('prefs rejects a word where a property is an integer', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'size=x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['prefs.size'] })
  })

  // An exploded object is never sent under its own name: prefs=1 is a scalar, not an object.
  // explode されたオブジェクトは、自身の名前で送られることはない。
  // prefs=1 はスカラーであり、オブジェクトではない。
  it('prefs rejects a value sent under its own name', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'prefs=1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['prefs'] })
  })

  // a is an integer.
  // a は integer である。
  it('obj rejects a word where a property is an integer', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'obj=a,x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['obj.a'] })
  })

  // One part cannot be a pair.
  // 1つの部分だけでは、ペアにならない。
  it('obj rejects a name left without its value', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'obj=a' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['obj'] })
  })
})

// What a component rejects, it rejects behind a reference too.
// コンポーネントが拒否する値は、参照経由でも拒否される。
describe('references: a schema behind $ref', () => {
  // -1 is an integer, and below the minimum of Count.
  // -1 は整数であり、Count の最小値を下回る。
  it('ref_int rejects a value below the minimum of the component', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ref_int=-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })

  // A word is not an integer.
  // 単語は整数ではない。
  it('ref_int rejects a word', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ref_int=x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('ref_int rejects a hexadecimal literal', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ref_int=0x10' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })
})

// Numbers are read from text by a decimal grammar before they are validated: an optional
// minus sign and digits for an integer, and for a number a fraction and an exponent as well.
// Number(text) and BigInt(text) read more than that (an empty value as zero, a hexadecimal
// literal, surrounding whitespace), and none of it is accepted here.
// 数値は、検証の前に10進の文法で文字列から読み取られる。整数は任意のマイナス記号と数字、
// 数値はそれに加えて小数部と指数部である。Number(text) や BigInt(text) はそれ以上のもの
// (空の値を 0 とする、16進リテラル、前後の空白)も読み取るが、ここではいずれも受理しない。
describe('strictness: what the wire grammar does not read', () => {
  // An explicit plus sign is not part of a decimal literal.
  // 明示的なプラス記号は、10進リテラルには含まれない。
  it('integer rejects "+1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `integer=${encodeURIComponent('+1')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // An explicit plus sign is not part of a decimal literal.
  // 明示的なプラス記号は、10進リテラルには含まれない。
  it('int64 rejects "+5"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `int64=${encodeURIComponent('+5')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('integer rejects "0x10"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=0x10' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A binary literal is not decimal.
  // 2進リテラルは10進表記ではない。
  it('integer rejects "0b11"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=0b11' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // An octal literal is not decimal.
  // 8進リテラルは10進表記ではない。
  it('integer rejects "0o7"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=0o7' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('number rejects "0x1F"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=0x1F' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('int64 rejects "0x10"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=0x10' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // Surrounding whitespace is not trimmed.
  // 前後の空白は取り除かれない。
  it('integer rejects " 42 "', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `integer=${encodeURIComponent(' 42 ')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('integer rejects " "', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `integer=${encodeURIComponent(' ')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('number rejects " "', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `number=${encodeURIComponent(' ')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('int64 rejects " "', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `int64=${encodeURIComponent(' ')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // An empty value holds no digits, so it is not a number.
  // 空の値は数字を含まないため、数値ではない。
  it('rejects an empty integer', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // An empty value holds no digits, so it is not an int64.
  // 空の値は数字を含まないため、int64 ではない。
  it('rejects an empty int64', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // The default of 20 does not apply, because the parameter was sent, and the empty value is not a
  // number.
  // パラメータ自体は送信されているため、デフォルトの 20 は適用されない。
  // 空の値は数値ではない。
  it('rejects an empty integer instead of falling back to its default', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'int_def=' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_def'] })
  })

  // Not every shape is that forgiving: the empty string is not a boolean spelling.
  // すべての形状が寛容なわけではない。空文字列は真偽値の表記ではない。
  it('rejects an empty boolean', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // The opposite case, stricter than the name suggests: httpUrl requires a dotted domain, so a
  // bare localhost does not pass.
  // 逆に、名前から想像されるより厳しい例。httpUrl はドットを含むドメインを要求するため、
  // localhost 単体は通らない。
  it('httpurl rejects "https://localhost"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `httpurl=${encodeURIComponent('https://localhost')}` },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl'] })
  })
})
