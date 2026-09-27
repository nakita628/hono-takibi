// Every parameter shape the generator supports, sent as a real header. Headers arrive as
// strings just like query and path values, but they reach the generator through a
// different branch, one that used to skip coercion entirely, so every numeric or boolean
// header rejected its own input.
//
// 生成器が対応するすべてのパラメータ形状を、実際のヘッダーとして送信して検証する。
// ヘッダーもクエリやパスと同じく文字列で届くが、生成器内では別の分岐を通る。その分岐は
// かつて coerce を完全にスキップしており、数値・真偽値のヘッダーはすべて自身の入力を
// 拒否していた。
//
// How to read a test / テストの読み方:
//   Every route answers the headers its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A header that
//   was not sent and has no default is absent from the answer. A rejected request answers
//   422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取ったヘッダーを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないヘッダーは、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// What a header cannot carry / ヘッダーで運べない値:
//   A header value is a ByteString, and the Fetch API strips the whitespace around it. So a
//   value with a character past U+00FF, or with leading or trailing whitespace, never
//   reaches the server as written, and the values of that kind that the path and query
//   suites test have no counterpart here. `format: emoji` has no header for the same
//   reason. invalid.test.ts proves each of these limits.
//   ヘッダー値は ByteString であり、Fetch API は前後の空白を取り除く。そのため、U+00FF を
//   超える文字を含む値や、前後に空白のある値は、書かれたとおりにはサーバーへ届かない。
//   path・query のスイートが検証するその種の値は、ここには対応するテストがない。
//   `format: emoji` のヘッダーが存在しないのも同じ理由である。これらの制限は、
//   invalid.test.ts で個別に検証している。
//
// Routes / ルート:
//   /headers   every shape as `x-<shape>`, and the array `x-ids`, all optional
//              全形状(`x-<shape>`)と配列 `x-ids`。すべて任意
//   /optional  literals, constraints, transforms, odd names / リテラル・制約・変換・名前
//   /defaults  headers with a default / デフォルト値を持つヘッダー
//   /required  required headers / 必須ヘッダー
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
//   - wire: what a header value carries
//   - arrays
//   - leniency: what z.coerce reads beyond a decimal literal (pinned, not endorsed)
import { describe, expect, it } from 'vite-plus/test'

import { headerParamsApp } from './app'

// A non-string shape that coerces carelessly would accept anything. A word must be rejected
// by every one of them.
// 雑な coerce を行う非文字列形状は、何でも受理してしまう。単語は、
// どの非文字列形状でも拒否されなければならない。
describe('shapes: a shape that is not a string rejects a word', () => {
  // A word is not a number.
  // 単語は number ではない。
  it('x-integer rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-integer': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-int32 rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': 'not-a-value' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int32'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('x-int64 rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': 'not-a-value' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('x-bigint rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-bigint': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-bigint'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-uint32 rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uint32': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint32'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('x-uint64 rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uint64': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint64'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-number rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-number': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-number'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-float rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float': 'not-a-value' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-float32 rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-float32': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float32'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-float64 rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-float64': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float64'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-double rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-double': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-double'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('x-numpassword rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-numpassword': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-numpassword'] })
  })

  // A word is not a boolean.
  // 単語は boolean ではない。
  it('x-boolean rejects "not-a-value"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-boolean': 'not-a-value' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-boolean'] })
  })
})

// One past each boundary, and text that is not an integer.
// 各境界を 1 超えた値と、整数でない文字列。
describe('integers: rejected values', () => {
  // A fraction is not an integer.
  // 小数は整数ではない。
  it('x-integer rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // Past MAX_SAFE_INTEGER a double would round to a different number, so the value is refused.
  // MAX_SAFE_INTEGER を超えると double は別の数値に丸めてしまうため、拒否される。
  it('x-integer rejects "9007199254740993"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-integer': '9007199254740993' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // Past MIN_SAFE_INTEGER, for the same reason.
  // MIN_SAFE_INTEGER を下回る値も同じ理由で拒否される。
  it('x-integer rejects "-9007199254740993"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-integer': '-9007199254740993' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('x-integer rejects "Infinity"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': 'Infinity' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // Negative infinity is not finite.
  // -Infinity は有限の数ではない。
  it('x-integer rejects "-Infinity"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '-Infinity' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('x-integer rejects "NaN"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': 'NaN' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // A thousands separator is not part of a number.
  // 桁区切りのカンマは数値の一部ではない。
  it('x-integer rejects "1,000"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '1,000' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // The JavaScript numeric separator is source syntax, not a value.
  // JavaScript の数値セパレータはソース上の記法であり、値ではない。
  it('x-integer rejects "1_000"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '1_000' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // The word "null" is not a number.
  // "null" という単語は数値ではない。
  it('x-integer rejects "null"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': 'null' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // A boolean is not a number.
  // 真偽値は数値ではない。
  it('x-integer rejects "true"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': 'true' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // Digits followed by text are not a number.
  // 数字の後ろに文字が続く値は数値ではない。
  it('x-integer rejects "12abc"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '12abc' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-integer'] })
  })

  // One past the int32 maximum.
  // int32 の最大値を 1 超える。
  it('x-int32 rejects "2147483648"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '2147483648' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int32'] })
  })

  // One past the int32 minimum.
  // int32 の最小値を 1 下回る。
  it('x-int32 rejects "-2147483649"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '-2147483649' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int32'] })
  })

  // A fraction is not an int32.
  // 小数は int32 ではない。
  it('x-int32 rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int32'] })
  })

  // One past the uint32 maximum.
  // uint32 の最大値を 1 超える。
  it('x-uint32 rejects "4294967296"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint32': '4294967296' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint32'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('x-uint32 rejects "-1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint32': '-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint32'] })
  })

  // A fraction is not a uint32.
  // 小数は uint32 ではない。
  it('x-uint32 rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint32': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint32'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('x-int64 rejects "9223372036854775808"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '9223372036854775808' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64'] })
  })

  // One past the int64 minimum.
  // int64 の最小値を 1 下回る。
  it('x-int64 rejects "-9223372036854775809"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '-9223372036854775809' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('x-int64 rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64'] })
  })

  // Exponent notation cannot become a bigint.
  // 指数表記は bigint に変換できない。
  it('x-int64 rejects "1e3"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '1e3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64'] })
  })

  // The JavaScript bigint suffix is source syntax, not a value.
  // JavaScript の bigint 接尾辞はソース上の記法であり、値ではない。
  it('x-int64 rejects "1n"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '1n' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64'] })
  })

  // One past the uint64 maximum.
  // uint64 の最大値を 1 超える。
  it('x-uint64 rejects "18446744073709551616"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uint64': '18446744073709551616' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint64'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('x-uint64 rejects "-1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint64': '-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint64'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('x-uint64 rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint64': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uint64'] })
  })

  // A fraction cannot become a bigint, even a zero one.
  // 小数部が 0 でも、小数は bigint に変換できない。
  it('x-bigint rejects "1.0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-bigint': '1.0' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-bigint'] })
  })

  // Exponent notation cannot become a bigint.
  // 指数表記は bigint に変換できない。
  it('x-bigint rejects "1e3"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-bigint': '1e3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-bigint'] })
  })
})

// Values that are not finite, overflow, or are not a number at all.
// 有限でない値、オーバーフローする値、そもそも数値でない値。
describe('floats: rejected values', () => {
  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('x-number rejects "Infinity"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': 'Infinity' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-number'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('x-number rejects "NaN"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': 'NaN' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-number'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('x-number rejects "1e400"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '1e400' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-number'] })
  })

  // A decimal comma is not a decimal point.
  // 小数点としてのカンマは認められない。
  it('x-number rejects "1,5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '1,5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-number'] })
  })

  // Two decimal points.
  // 小数点が2つある。
  it('x-number rejects "1.5.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '1.5.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-number'] })
  })

  // Past the float32 maximum; format: float is a float32.
  // float32 の最大値を超える。format: float は float32 である。
  it('x-float rejects "3.5e38"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float': '3.5e38' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float'] })
  })

  // Past the float32 maximum.
  // float32 の最大値を超える。
  it('x-float32 rejects "3.5e38"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float32': '3.5e38' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float32'] })
  })

  // Past the float32 minimum.
  // float32 の最小値を下回る。
  it('x-float32 rejects "-3.5e38"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float32': '-3.5e38' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float32'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('x-float64 rejects "1e309"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float64': '1e309' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float64'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('x-float64 rejects "Infinity"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float64': 'Infinity' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-float64'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('x-double rejects "1e309"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-double': '1e309' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-double'] })
  })

  // format: password does not loosen the number check.
  // format: password を付けても、数値の検証は緩まない。
  it('x-numpassword rejects "NaN"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-numpassword': 'NaN' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-numpassword'] })
  })
})

// Anything outside the accepted spellings is rejected rather than read as true.
// 受理される表記以外は、true として読まれるのではなく拒否される。
describe('booleans: rejected values', () => {
  // A number that is neither 0 nor 1.
  // 0 でも 1 でもない数値。
  it('x-boolean rejects "2"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': '2' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-boolean'] })
  })

  // An abbreviation outside the accepted spellings.
  // 受理される表記に含まれない略語。
  it('x-boolean rejects "t"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 't' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-boolean'] })
  })

  // The word "null" is not a boolean.
  // "null" という単語は真偽値ではない。
  it('x-boolean rejects "null"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'null' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-boolean'] })
  })

  // A word that merely starts with "true".
  // "true" で始まるだけの別の単語。
  it('x-boolean rejects "truthy"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'truthy' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-boolean'] })
  })
})

// A string format is a validator: a value that does not fit is rejected, not passed through
// as plain text.
// 文字列フォーマットはバリデータである。形式に合わない値は、
// 素の文字列として素通りせず拒否される。
describe('formats: what each string format rejects', () => {
  // No top-level domain.
  // トップレベルドメインがない。
  it('x-email rejects "a@b"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-email': 'a@b' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-email'] })
  })

  // No local part.
  // ローカル部がない。
  it('x-email rejects "@example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': '@example.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-email'] })
  })

  // No domain.
  // ドメインがない。
  it('x-email rejects "user@"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-email': 'user@' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-email'] })
  })

  // A trailing dot.
  // 末尾にドットがある。
  it('x-email rejects "user@example.com."', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'user@example.com.' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-email'] })
  })

  // A space in the local part.
  // ローカル部に空白がある。
  it('x-email rejects "user @example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'user @example.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-email'] })
  })

  // Two at signs.
  // アットマークが2つある。
  it('x-email rejects "user@@example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'user@@example.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-email'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('x-uuid rejects "0190b1f400007000800000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '0190b1f400007000800000000000000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuid'] })
  })

  // Version 9 does not exist.
  // バージョン 9 は存在しない。
  it('x-uuid rejects "a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': 'a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuid'] })
  })

  // Wrapped in braces.
  // 波括弧で囲まれている。
  it('x-uuid rejects "{0190b1f4-0000-7000-8000-000000000000}"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '{0190b1f4-0000-7000-8000-000000000000}' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuid'] })
  })

  // One digit short.
  // 1桁足りない。
  it('x-uuid rejects "0190b1f4-0000-7000-8000-00000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '0190b1f4-0000-7000-8000-00000000000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuid'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('x-uuid rejects "0190b1f4-0000-7000-8000-00000000000g"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '0190b1f4-0000-7000-8000-00000000000g' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuid'] })
  })

  // A version 7 UUID is not a version 4 one.
  // バージョン 7 の UUID はバージョン 4 ではない。
  it('x-uuidv4 rejects "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuidv4': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuidv4'] })
  })

  // A version 4 UUID is not a version 7 one.
  // バージョン 4 の UUID はバージョン 7 ではない。
  it('x-uuidv7 rejects "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuidv7': 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uuidv7'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('x-guid rejects "a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-guid': 'a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-guid'] })
  })

  // No scheme.
  // スキームがない。
  it('x-url rejects "example.com"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-url': 'example.com' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-url'] })
  })

  // No host.
  // ホストがない。
  it('x-url rejects "https://"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-url': 'https://' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-url'] })
  })

  // A relative reference.
  // 相対参照である。
  it('x-url rejects "/path"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-url': '/path' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-url'] })
  })

  // No scheme.
  // スキームがない。
  it('x-uri rejects "example.com"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uri': 'example.com' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-uri'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('x-httpurl rejects "ftp://example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-httpurl': 'ftp://example.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-httpurl'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('x-httpurl rejects "mailto:a@b.c"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-httpurl': 'mailto:a@b.c' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-httpurl'] })
  })

  // A label that starts with a hyphen.
  // ラベルがハイフンで始まっている。
  it('x-hostname rejects "-bad.com"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hostname': '-bad.com' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-hostname'] })
  })

  // An underscore.
  // アンダースコアを含む。
  it('x-hostname rejects "exa_mple.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-hostname': 'exa_mple.com' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-hostname'] })
  })

  // A label longer than 63 octets.
  // ラベルが 63 オクテットを超えている。
  it('x-hostname rejects "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: {
        'x-hostname': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
      },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-hostname'] })
  })

  // A 0x prefix.
  // 0x 接頭辞が付いている。
  it('x-hex rejects "0x1f"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hex': '0x1f' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-hex'] })
  })

  // Not hexadecimal.
  // 16進数ではない。
  it('x-hex rejects "xyz"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hex': 'xyz' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-hex'] })
  })

  // Missing padding.
  // パディングが欠けている。
  it('x-base64 rejects "aGVsbG8"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64': 'aGVsbG8' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-base64'] })
  })

  // The base64url alphabet.
  // base64url の文字を使っている。
  it('x-base64 rejects "a-b_"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64': 'a-b_' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-base64'] })
  })

  // Outside the alphabet.
  // 使用できない文字である。
  it('x-base64 rejects "!!!!"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64': '!!!!' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-base64'] })
  })

  // Padding is not allowed.
  // パディングは許可されない。
  it('x-base64url rejects "aGVsbG8="', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-base64url': 'aGVsbG8=' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-base64url'] })
  })

  // The base64 alphabet.
  // base64 の文字を使っている。
  it('x-base64url rejects "a+b/"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64url': 'a+b/' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-base64url'] })
  })

  // Too short.
  // 短すぎる。
  it('x-nanoid rejects "short"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-nanoid': 'short' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-nanoid'] })
  })

  // One character too long.
  // 1文字長い。
  it('x-nanoid rejects "V1StGXR8_Z5jdHi6B-myT1"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-nanoid': 'V1StGXR8_Z5jdHi6B-myT1' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-nanoid'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('x-nanoid rejects "V1StGXR8_Z5jdHi6B!myT"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-nanoid': 'V1StGXR8_Z5jdHi6B!myT' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-nanoid'] })
  })

  // Upper case.
  // 大文字を含む。
  it('x-cuid2 rejects "Tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cuid2': 'Tz4a98xxat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-cuid2'] })
  })

  // A hyphen.
  // ハイフンを含む。
  it('x-cuid2 rejects "tz4a98-xat96iws9zmbrgj3a"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cuid2': 'tz4a98-xat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-cuid2'] })
  })

  // One character short.
  // 1文字足りない。
  it('x-ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FA"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ulid': '01ARZ3NDEKTSV4RRFFQ69G5FA' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ulid'] })
  })

  // Crockford base32 leaves out the letter U.
  // Crockford base32 は文字 U を含まない。
  it('x-ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FAU"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ulid': '01ARZ3NDEKTSV4RRFFQ69G5FAU' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ulid'] })
  })

  // An octet past 255.
  // オクテットが 255 を超えている。
  it('x-ipv4 rejects "256.0.0.1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '256.0.0.1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv4'] })
  })

  // Three octets.
  // オクテットが3つしかない。
  it('x-ipv4 rejects "1.2.3"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '1.2.3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv4'] })
  })

  // Five octets.
  // オクテットが5つある。
  it('x-ipv4 rejects "1.2.3.4.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '1.2.3.4.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv4'] })
  })

  // A leading zero.
  // 先頭にゼロがある。
  it('x-ipv4 rejects "01.2.3.4"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '01.2.3.4' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv4'] })
  })

  // An IPv6 address.
  // IPv6 アドレスである。
  it('x-ipv4 rejects "::1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '::1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv4'] })
  })

  // A group that is not hexadecimal.
  // 16進数でないグループを含む。
  it('x-ipv6 rejects "2001:db8::g"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv6': '2001:db8::g' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv6'] })
  })

  // An IPv4 address.
  // IPv4 アドレスである。
  it('x-ipv6 rejects "1.2.3.4"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv6': '1.2.3.4' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv6'] })
  })

  // Wrapped in brackets, as in a URL.
  // URL のように角括弧で囲まれている。
  it('x-ipv6 rejects "[::1]"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv6': '[::1]' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ipv6'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('x-cidrv4 rejects "192.168.0.0"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv4': '192.168.0.0' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-cidrv4'] })
  })

  // A prefix past 32.
  // プレフィックス長が 32 を超えている。
  it('x-cidrv4 rejects "192.168.0.0/33"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv4': '192.168.0.0/33' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-cidrv4'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('x-cidrv6 rejects "2001:db8::"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-cidrv6': '2001:db8::' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-cidrv6'] })
  })

  // A prefix past 128.
  // プレフィックス長が 128 を超えている。
  it('x-cidrv6 rejects "2001:db8::/129"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv6': '2001:db8::/129' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-cidrv6'] })
  })

  // 29 February of a year that is not a leap year.
  // うるう年でない年の 2月29日。
  it('x-date rejects "2021-02-29"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2021-02-29' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // Month 13.
  // 13 月。
  it('x-date rejects "2020-13-01"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2020-13-01' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // 31 April.
  // 4月31日。
  it('x-date rejects "2020-04-31"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2020-04-31' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('x-date rejects "2020-1-2"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2020-1-2' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // The basic format, with no hyphens.
  // ハイフンのない基本形式。
  it('x-date rejects "20200102"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '20200102' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // Slashes.
  // スラッシュ区切り。
  it('x-date rejects "2020/01/02"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2020/01/02' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // A date-time is not a date.
  // 日時は日付ではない。
  it('x-date rejects "2020-01-02T00:00:00Z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-date': '2020-01-02T00:00:00Z' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-date'] })
  })

  // Hour 24.
  // 24 時。
  it('x-time rejects "24:00:00"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '24:00:00' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-time'] })
  })

  // A leap second.
  // うるう秒。
  it('x-time rejects "23:59:60"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '23:59:60' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-time'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('x-time rejects "1:02:03"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '1:02:03' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-time'] })
  })

  // A zone designator.
  // タイムゾーン指定子が付いている。
  it('x-time rejects "12:34:56Z"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '12:34:56Z' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-time'] })
  })

  // An offset.
  // オフセットが付いている。
  it('x-time rejects "12:34:56+09:00"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-time': '12:34:56+09:00' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-time'] })
  })

  // No zone designator.
  // タイムゾーン指定子がない。
  it('x-datetime rejects "2020-01-02T03:04:05"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02T03:04:05' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-datetime'] })
  })

  // An offset instead of Z: the generated z.iso.datetime() takes Z only.
  // Z ではなくオフセット。生成される z.iso.datetime() は Z のみを受理する。
  it('x-datetime rejects "2020-01-02T03:04:05+09:00"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02T03:04:05+09:00' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-datetime'] })
  })

  // A date is not a date-time.
  // 日付は日時ではない。
  it('x-datetime rejects "2020-01-02"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-datetime'] })
  })

  // A space instead of T.
  // T の代わりに空白を使っている。
  it('x-datetime rejects "2020-01-02 03:04:05Z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02 03:04:05Z' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-datetime'] })
  })

  // Lower-case designators.
  // 指定子が小文字である。
  it('x-datetime rejects "2020-01-02t03:04:05z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02t03:04:05z' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-datetime'] })
  })

  // 30 February.
  // 2月30日。
  it('x-datetime rejects "2020-02-30T00:00:00Z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-02-30T00:00:00Z' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-datetime'] })
  })

  // No component.
  // 要素がない。
  it('x-duration rejects "P"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'P' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-duration'] })
  })

  // No time component after T.
  // T の後に時刻要素がない。
  it('x-duration rejects "PT"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'PT' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-duration'] })
  })

  // No P designator.
  // P 指定子がない。
  it('x-duration rejects "1Y"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': '1Y' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-duration'] })
  })

  // Negative.
  // 負の期間。
  it('x-duration rejects "-P1D"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': '-P1D' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-duration'] })
  })

  // A fractional day.
  // 小数の日数。
  it('x-duration rejects "P1.5D"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'P1.5D' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-duration'] })
  })

  // Weeks mixed with other units.
  // 週を他の単位と混在させている。
  it('x-duration rejects "P1M1W"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'P1M1W' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-duration'] })
  })

  // Hyphen separators.
  // ハイフン区切り。
  it('x-mac rejects "00-1a-2b-3c-4d-5e"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-mac': '00-1a-2b-3c-4d-5e' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-mac'] })
  })

  // No separators.
  // 区切り文字がない。
  it('x-mac rejects "001a2b3c4d5e"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-mac': '001a2b3c4d5e' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-mac'] })
  })

  // Dotted triples.
  // ドット区切りの3グループ表記。
  it('x-mac rejects "001a.2b3c.4d5e"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-mac': '001a.2b3c.4d5e' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-mac'] })
  })

  // Five octets.
  // オクテットが5つしかない。
  it('x-mac rejects "00:1a:2b:3c:4d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-mac': '00:1a:2b:3c:4d' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-mac'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('x-mac rejects "00:1a:2b:3c:4d:5g"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-mac': '00:1a:2b:3c:4d:5g' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-mac'] })
  })

  // No plus sign.
  // プラス記号がない。
  it('x-e164 rejects "14155552671"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-e164': '14155552671' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-e164'] })
  })

  // A country code that starts with 0.
  // 国番号が 0 で始まっている。
  it('x-e164 rejects "+0123456789"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-e164': '+0123456789' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-e164'] })
  })

  // Too short.
  // 短すぎる。
  it('x-e164 rejects "+1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-e164': '+1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-e164'] })
  })

  // Past 15 digits.
  // 15桁を超えている。
  it('x-e164 rejects "+1234567890123456"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-e164': '+1234567890123456' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-e164'] })
  })

  // A letter.
  // 英字を含む。
  it('x-e164 rejects "+1415555267a"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-e164': '+1415555267a' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-e164'] })
  })

  // Fails the Luhn check.
  // Luhn チェックに失敗する。
  it('x-creditcard rejects "4111111111111112"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-creditcard': '4111111111111112' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-creditcard'] })
  })

  // Too short.
  // 短すぎる。
  it('x-creditcard rejects "1234"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-creditcard': '1234' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-creditcard'] })
  })

  // Fails the checksum.
  // チェックサムが一致しない。
  it('x-iban rejects "DE89370400440532013001"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-iban': 'DE89370400440532013001' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-iban'] })
  })

  // Lower case.
  // 小文字である。
  it('x-iban rejects "de89370400440532013000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-iban': 'de89370400440532013000' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-iban'] })
  })

  // The printed form, with spaces.
  // 空白入りの印字形式。
  it('x-iban rejects "DE89 3704 0044 0532 0130 00"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-iban': 'DE89 3704 0044 0532 0130 00' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-iban'] })
  })

  // Too short.
  // 短すぎる。
  it('x-iban rejects "XX00"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-iban': 'XX00' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-iban'] })
  })

  // Lower case.
  // 小文字である。
  it('x-currencycode rejects "usd"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'usd' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-currencycode'] })
  })

  // Not an ISO 4217 code.
  // ISO 4217 に存在しないコード。
  it('x-currencycode rejects "ZZZ"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'ZZZ' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-currencycode'] })
  })

  // Two letters.
  // 2文字しかない。
  it('x-currencycode rejects "US"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'US' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-currencycode'] })
  })

  // Four letters.
  // 4文字ある。
  it('x-currencycode rejects "USDD"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'USDD' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-currencycode'] })
  })

  // A numeric code.
  // 数字のコード。
  it('x-currencycode rejects "999"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': '999' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-currencycode'] })
  })

  // One character short.
  // 1文字足りない。
  it('x-ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ksuid': '0ujsszwN8NRY24YaXiTIE2VWDT' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ksuid'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('x-ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT!"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ksuid': '0ujsszwN8NRY24YaXiTIE2VWDT!' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ksuid'] })
  })

  // One character short.
  // 1文字足りない。
  it('x-xid rejects "9m4e2mr0ui3e8a215n4"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-xid': '9m4e2mr0ui3e8a215n4' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-xid'] })
  })

  // The letter z is not in base32hex.
  // 文字 z は base32hex に含まれない。
  it('x-xid rejects "9m4e2mr0ui3e8a215n4z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-xid': '9m4e2mr0ui3e8a215n4z' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-xid'] })
  })
})

// The same keywords as in a path or a query string, on the header branch of the generator.
// path や query と同じキーワードを、生成器のヘッダー用の分岐で検証する。
describe('literals, constraints and transforms', () => {
  // Outside the enum.
  // enum に含まれない値。
  it('x-ienum rejects "4"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ienum': '4' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ienum'] })
  })

  // Between two members.
  // 2つのメンバーの中間の値。
  it('x-ienum rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ienum': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ienum'] })
  })

  // The boolean the enum leaves out.
  // enum に含まれていない側の真偽値。
  it('x-benum rejects "false"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-benum': 'false' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-benum'] })
  })

  // Not the constant.
  // 定数値ではない。
  it('x-iconst rejects "8"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-iconst': '8' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-iconst'] })
  })

  // A string enum is case-sensitive, even though a header name is not.
  // ヘッダー名と違い、string の enum の値は大文字小文字を区別する。
  it('x-senum rejects "ASC"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-senum': 'ASC' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-senum'] })
  })

  // Outside the enum.
  // enum に含まれない値。
  it('x-senum rejects "up"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-senum': 'up' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-senum'] })
  })

  // Matches neither branch.
  // どちらの分岐にも一致しない。
  it('x-ioneof rejects "other"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ioneof': 'other' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ioneof'] })
  })

  // A fraction matches neither branch.
  // 小数はどちらの分岐にも一致しない。
  it('x-ioneof rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ioneof': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ioneof'] })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('x-range rejects "0"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-range': '0' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-range'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('x-range rejects "101"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-range': '101' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-range'] })
  })

  // One below minLength.
  // minLength を 1 下回る。
  it('x-length rejects "a"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-length': 'a' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-length'] })
  })

  // One above maxLength.
  // maxLength を 1 超える。
  it('x-length rejects "abcde"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-length': 'abcde' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-length'] })
  })

  // Upper case.
  // 大文字である。
  it('x-pattern rejects "ABC-1"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-pattern': 'ABC-1' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-pattern'] })
  })

  // Four digits where three are allowed.
  // 3桁までのところに4桁ある。
  it('x-pattern rejects "abc-1234"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-pattern': 'abc-1234' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-pattern'] })
  })

  // The transform runs first and the format check second, on the transformed value:
  // lower-cased, this is still not an email.
  // 変換が先、フォーマット検証が後であり、検証は変換後の値に対して行われる。小文字化しても、
  // これはメールアドレスではない。
  it('x-tx-email rejects "NOT-AN-EMAIL"', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-tx-email': 'NOT-AN-EMAIL' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-tx-email'] })
  })
})

// /optional declares every header without required: true.
// /optional は、すべてのヘッダーを required: true なしで宣言している。
describe('optional: absent and present', () => {
  // Optional does not mean unchecked: a value that is sent is validated.
  // 任意であることは無検証を意味しない。送信された値は検証される。
  it('x-int-opt rejects "x"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-int-opt': 'x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int-opt'] })
  })

  // A fraction is not an integer, optional or not.
  // 任意であっても、小数は整数ではない。
  it('x-int-opt rejects "1.5"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-int-opt': '1.5' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int-opt'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('x-int64-opt rejects "9223372036854775808"', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-int64-opt': '9223372036854775808' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int64-opt'] })
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('x-bool-opt rejects "maybe"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-bool-opt': 'maybe' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-bool-opt'] })
  })

  // Three invalid headers, three issues, in declaration order.
  // 不正なヘッダーが3つあり、issue も3つ、宣言順に報告される。
  it('reports every header that fails', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-range': '0', 'x-int-opt': 'x', 'x-bool-opt': 'maybe' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int-opt', 'x-bool-opt', 'x-range'] })
  })
})

// /defaults declares every header with a default.
// /defaults は、すべてのヘッダーをデフォルト値付きで宣言している。
describe('defaults', () => {
  // A default does not rescue an invalid value: it replaces an absent one only.
  // デフォルトは不正な値を救済しない。置き換えるのは省略された場合のみである。
  it('rejects an invalid integer rather than falling back', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-int-def': 'x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-int-def'] })
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('rejects an invalid boolean rather than falling back', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-bool-def': 'maybe' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-bool-def'] })
  })
})

// /required declares x-id, x-big, x-flag and x-name with required: true, and x-note without.
// /required は x-id・x-big・x-flag・x-name を required: true で、
// x-note を required なしで宣言している。
describe('required', () => {
  // x-id is left out.
  // x-id を省略している。
  it('reports a missing required integer', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-big': '9007199254740993', 'x-flag': 'true', 'x-name': 'n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-id'] })
  })

  // x-big is left out.
  // x-big を省略している。
  it('reports a missing required int64', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-id': '1', 'x-flag': 'true', 'x-name': 'n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-big'] })
  })

  // x-flag is left out.
  // x-flag を省略している。
  it('reports a missing required boolean', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-id': '1', 'x-big': '9007199254740993', 'x-name': 'n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-flag'] })
  })

  // x-name is left out.
  // x-name を省略している。
  it('reports a missing required string', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-id': '1', 'x-big': '9007199254740993', 'x-flag': 'true' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-name'] })
  })

  // All four are reported, in declaration order.
  // 4つすべてが宣言順に報告される。
  it('reports every required header when none is sent', async () => {
    const res = await headerParamsApp.request('/required')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-id', 'x-big', 'x-flag', 'x-name'] })
  })

  // Present is not enough: the value has to be valid too.
  // 存在するだけでは不十分で、値も有効でなければならない。
  it('reports a required header that is present and invalid', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-id': 'x', 'x-big': '9007199254740993', 'x-flag': 'true', 'x-name': 'n' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-id'] })
  })
})

// How a header is named on the wire, and how it is named in the handler.
// ワイヤ上でのヘッダー名と、ハンドラ内でのヘッダー名。
describe('names', () => {
  // The issues carry the names as the spec declares them, not as the wire sent them.
  // issue には、ワイヤ上の表記ではなく、仕様で宣言された名前が入る。
  it('reports a mixed-case declaration under its declared name', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-request-id': 'nope', 'x-rate-limit': 'x' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['X-Request-Id', 'X-Rate-Limit'] })
  })
})

// What the transport does to a value before the schema sees it.
// スキーマに届く前に、トランスポートが値に対して行う処理。
describe('wire: what a header value carries', () => {
  // Why format: emoji has no header in the spec: the platform refuses to build a request whose
  // header value holds a character past U+00FF.
  // 仕様に format: emoji のヘッダーがない理由。
  // U+00FF を超える文字をヘッダー値に含むリクエストは、プラットフォームが構築を拒否する。
  it('cannot send an emoji in a header', () => {
    expect(() => new Headers({ 'x-string': '🔥' })).toThrow(TypeError)
  })

  // The same limit, for the full-width digit the path and query suites reject as an integer.
  // 同じ制限。path・query のスイートが integer として拒否する全角数字も、送信自体ができない。
  it('cannot send a full-width digit in a header', () => {
    expect(() => new Headers({ 'x-string': '９' })).toThrow(TypeError)
  })

  // A line feed would end the header.
  // 改行はヘッダーの終端になってしまう。
  it('cannot send a line feed in a header', () => {
    expect(() => new Headers({ 'x-string': 'a\nb' })).toThrow(TypeError)
  })

  // A carriage return would end the header.
  // 復帰文字はヘッダーの終端になってしまう。
  it('cannot send a carriage return in a header', () => {
    expect(() => new Headers({ 'x-string': 'a\rb' })).toThrow(TypeError)
  })

  // A NUL character is not allowed in a header value.
  // NUL 文字はヘッダー値に使用できない。
  it('cannot send a NUL in a header', () => {
    expect(() => new Headers({ 'x-string': 'a\u0000b' })).toThrow(TypeError)
  })

  // /optional declares GET only.
  // /optional が宣言しているのは GET だけである。
  it('answers 404 to a method the spec does not declare', async () => {
    const res = await headerParamsApp.request('/optional', {
      method: 'POST',
      headers: { 'x-int-opt': '1' },
    })
    expect(res.status).toBe(404)
  })

  // Hono answers HEAD through the GET route, so the header is validated the same way: an
  // invalid one is rejected.
  // Hono は HEAD を GET のルートで処理するため、ヘッダーは同じように検証される。
  // 不正な値は拒否される。
  it('rejects an invalid HEAD request like the GET it mirrors', async () => {
    const res = await headerParamsApp.request('/optional', {
      method: 'HEAD',
      headers: { 'x-int-opt': 'x' },
    })
    expect(res.status).toBe(422)
  })
})

// x-ids is an array of integers and x-str-arr an array of strings.
// x-ids は integer の配列、x-str-arr は string の配列である。
describe('arrays', () => {
  // The issue path ends in the index of the element, 0.
  // issue のパスは、要素のインデックス 0 で終わる。
  it('rejects an element that is not an integer, at its index', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ids': 'x' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ids.0'] })
  })
})

// Numbers are coerced with z.coerce, that is Number(text) and BigInt(text). Both read more
// than a decimal literal, and these tests pin exactly how much more, so that a change to the
// coercion shows up here as a decision and not as a surprise. They record today's behaviour;
// they do not say it is desirable.
// 数値は z.coerce、すなわち Number(text) と BigInt(text) で変換される。
// どちらも10進リテラル以外も読み取るため、「どこまで読むか」をここで固定する。
// coerce の実装を変えたときに、想定外の変化ではなく意図した判断として差分が
// 現れるようにするためである。これらは現状の挙動の記録であり、
// 望ましい挙動だと主張するものではない。
describe('leniency: what z.coerce reads beyond a decimal literal (pinned, not endorsed)', () => {
  // Not every shape is that forgiving: the empty string is not a boolean spelling.
  // すべての形状が寛容なわけではない。空文字列は真偽値の表記ではない。
  it('rejects an empty boolean', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': '' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-boolean'] })
  })

  // The opposite case, stricter than the name suggests: httpUrl requires a dotted domain, so a
  // bare localhost does not pass.
  // 逆に、名前から想像されるより厳しい例。httpUrl はドットを含むドメインを要求するため、
  // localhost 単体は通らない。
  it('x-httpurl rejects "https://localhost"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-httpurl': 'https://localhost' },
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-httpurl'] })
  })
})
