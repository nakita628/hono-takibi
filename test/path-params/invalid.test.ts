// Every parameter shape the generator supports, sent as a real path segment. A path value
// is always single and always required, so each shape has a route of its own
// (`/<shape>/{value}`) and fails alone.
//
// 生成器が対応するすべてのパラメータ形状を、実際のパスセグメントとして送信して検証する。
// パスの値は常に単一かつ必須なので、形状ごとに専用ルート(`/<shape>/{value}`)を持ち、
// 失敗は形状単位で切り分けられる。
//
// How to read a test / テストの読み方:
//   Every route answers `{ valueType, valueText }`: the runtime `typeof` the parameter
//   arrived as in the handler, and the value as text. A rejected request answers 422 with
//   `{ issues: [...] }`, the name of each parameter that failed.
//   すべてのルートは `{ valueType, valueText }` を返す。ハンドラに届いた時点の `typeof` と、
//   値の文字列表現である。拒否されたリクエストは 422 と `{ issues: [...] }`(失敗した
//   パラメータ名の一覧)を返す。
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
//   - transforms: x-* extensions and format: trim
//   - literals: enum and const
//   - constraints: numeric and string
//   - combinators: oneOf and allOf
//   - declarations: several parameters in one path
//   - declarations: parameter names that are not identifiers
//   - declarations: $ref and path-item level
//   - wire: routing
//   - styles: simple, label and matrix
//   - objects: an object in one segment
//   - strictness: what the wire grammar does not read
import { describe, expect, it } from 'vite-plus/test'

import { pathParamsApp } from './app'

// HTTP delivers text, so a non-string shape that forgets to coerce rejects everything, and
// one that coerces carelessly accepts anything. A word must be rejected by every one of them.
// HTTP が運ぶのは文字列である。coerce を忘れた非文字列形状はすべてを拒否し、
// 雑な coerce は何でも受理してしまう。単語は、どの非文字列形状でも拒否されなければならない。
describe('shapes: a shape that is not a string rejects a word', () => {
  // A word is not a number.
  // 単語は number ではない。
  it('integer rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/integer/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('int32 rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/int32/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('int64 rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/int64/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('bigint rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/bigint/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('uint32 rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/uint32/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('uint64 rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/uint64/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('number rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/number/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/float/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float32 rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/float32/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float64 rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/float64/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('double rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/double/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('numpassword rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/numpassword/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a boolean.
  // 単語は boolean ではない。
  it('boolean rejects "not-a-value"', async () => {
    const res = await pathParamsApp.request('/boolean/not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// One past each boundary, and text that is not an integer.
// 各境界を 1 超えた値と、整数でない文字列。
describe('integers: rejected values', () => {
  // A fraction is not an integer.
  // 小数は整数ではない。
  it('integer rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/integer/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past MAX_SAFE_INTEGER a double would round to a different number, so the value is refused.
  // MAX_SAFE_INTEGER を超えると double は別の数値に丸めてしまうため、拒否される。
  it('integer rejects "9007199254740993"', async () => {
    const res = await pathParamsApp.request('/integer/9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past MIN_SAFE_INTEGER, for the same reason.
  // MIN_SAFE_INTEGER を下回る値も同じ理由で拒否される。
  it('integer rejects "-9007199254740993"', async () => {
    const res = await pathParamsApp.request('/integer/-9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('integer rejects "Infinity"', async () => {
    const res = await pathParamsApp.request('/integer/Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Negative infinity is not finite.
  // -Infinity は有限の数ではない。
  it('integer rejects "-Infinity"', async () => {
    const res = await pathParamsApp.request('/integer/-Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('integer rejects "NaN"', async () => {
    const res = await pathParamsApp.request('/integer/NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A thousands separator is not part of a number.
  // 桁区切りのカンマは数値の一部ではない。
  it('integer rejects "1,000"', async () => {
    const res = await pathParamsApp.request(`/integer/${encodeURIComponent('1,000')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The JavaScript numeric separator is source syntax, not a value.
  // JavaScript の数値セパレータはソース上の記法であり、値ではない。
  it('integer rejects "1_000"', async () => {
    const res = await pathParamsApp.request('/integer/1_000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A full-width digit is not an ASCII digit.
  // 全角数字は ASCII の数字ではない。
  it('integer rejects "９"', async () => {
    const res = await pathParamsApp.request(`/integer/${encodeURIComponent('９')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The word "null" is not a number.
  // "null" という単語は数値ではない。
  it('integer rejects "null"', async () => {
    const res = await pathParamsApp.request('/integer/null')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A boolean is not a number.
  // 真偽値は数値ではない。
  it('integer rejects "true"', async () => {
    const res = await pathParamsApp.request('/integer/true')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Digits followed by text are not a number.
  // 数字の後ろに文字が続く値は数値ではない。
  it('integer rejects "12abc"', async () => {
    const res = await pathParamsApp.request('/integer/12abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One past the int32 maximum.
  // int32 の最大値を 1 超える。
  it('int32 rejects "2147483648"', async () => {
    const res = await pathParamsApp.request('/int32/2147483648')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One past the int32 minimum.
  // int32 の最小値を 1 下回る。
  it('int32 rejects "-2147483649"', async () => {
    const res = await pathParamsApp.request('/int32/-2147483649')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A fraction is not an int32.
  // 小数は int32 ではない。
  it('int32 rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/int32/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One past the uint32 maximum.
  // uint32 の最大値を 1 超える。
  it('uint32 rejects "4294967296"', async () => {
    const res = await pathParamsApp.request('/uint32/4294967296')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint32 rejects "-1"', async () => {
    const res = await pathParamsApp.request('/uint32/-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A fraction is not a uint32.
  // 小数は uint32 ではない。
  it('uint32 rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/uint32/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('int64 rejects "9223372036854775808"', async () => {
    const res = await pathParamsApp.request('/int64/9223372036854775808')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One past the int64 minimum.
  // int64 の最小値を 1 下回る。
  it('int64 rejects "-9223372036854775809"', async () => {
    const res = await pathParamsApp.request('/int64/-9223372036854775809')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('int64 rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/int64/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The JavaScript bigint suffix is source syntax, not a value.
  // JavaScript の bigint 接尾辞はソース上の記法であり、値ではない。
  it('int64 rejects "1n"', async () => {
    const res = await pathParamsApp.request('/int64/1n')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One past the uint64 maximum.
  // uint64 の最大値を 1 超える。
  it('uint64 rejects "18446744073709551616"', async () => {
    const res = await pathParamsApp.request('/uint64/18446744073709551616')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint64 rejects "-1"', async () => {
    const res = await pathParamsApp.request('/uint64/-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('uint64 rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/uint64/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// Values that are not finite, overflow, or are not a number at all.
// 有限でない値、オーバーフローする値、そもそも数値でない値。
describe('floats: rejected values', () => {
  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('number rejects "Infinity"', async () => {
    const res = await pathParamsApp.request('/number/Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('number rejects "NaN"', async () => {
    const res = await pathParamsApp.request('/number/NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('number rejects "1e400"', async () => {
    const res = await pathParamsApp.request('/number/1e400')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A decimal comma is not a decimal point.
  // 小数点としてのカンマは認められない。
  it('number rejects "1,5"', async () => {
    const res = await pathParamsApp.request(`/number/${encodeURIComponent('1,5')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Two decimal points.
  // 小数点が2つある。
  it('number rejects "1.5.5"', async () => {
    const res = await pathParamsApp.request('/number/1.5.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past the float32 maximum; format: float is a float32.
  // float32 の最大値を超える。format: float は float32 である。
  it('float rejects "3.5e38"', async () => {
    const res = await pathParamsApp.request('/float/3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past the float32 maximum.
  // float32 の最大値を超える。
  it('float32 rejects "3.5e38"', async () => {
    const res = await pathParamsApp.request('/float32/3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past the float32 minimum.
  // float32 の最小値を下回る。
  it('float32 rejects "-3.5e38"', async () => {
    const res = await pathParamsApp.request('/float32/-3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('float64 rejects "1e309"', async () => {
    const res = await pathParamsApp.request('/float64/1e309')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('float64 rejects "Infinity"', async () => {
    const res = await pathParamsApp.request('/float64/Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('double rejects "1e309"', async () => {
    const res = await pathParamsApp.request('/double/1e309')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // format: password does not loosen the number check.
  // format: password を付けても、数値の検証は緩まない。
  it('numpassword rejects "NaN"', async () => {
    const res = await pathParamsApp.request('/numpassword/NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// Anything outside the accepted spellings is rejected rather than read as true.
// 受理される表記以外は、true として読まれるのではなく拒否される。
describe('booleans: rejected values', () => {
  // A number that is neither 0 nor 1.
  // 0 でも 1 でもない数値。
  it('boolean rejects "2"', async () => {
    const res = await pathParamsApp.request('/boolean/2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An abbreviation outside the accepted spellings.
  // 受理される表記に含まれない略語。
  it('boolean rejects "t"', async () => {
    const res = await pathParamsApp.request('/boolean/t')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The word "null" is not a boolean.
  // "null" という単語は真偽値ではない。
  it('boolean rejects "null"', async () => {
    const res = await pathParamsApp.request('/boolean/null')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Leading whitespace is not trimmed.
  // 先頭の空白はトリムされない。
  it('boolean rejects " true"', async () => {
    const res = await pathParamsApp.request(`/boolean/${encodeURIComponent(' true')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Trailing whitespace is not trimmed.
  // 末尾の空白はトリムされない。
  it('boolean rejects "true "', async () => {
    const res = await pathParamsApp.request(`/boolean/${encodeURIComponent('true ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word that merely starts with "true".
  // "true" で始まるだけの別の単語。
  it('boolean rejects "truthy"', async () => {
    const res = await pathParamsApp.request('/boolean/truthy')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
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
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('a@b')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No local part.
  // ローカル部がない。
  it('email rejects "@example.com"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('@example.com')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No domain.
  // ドメインがない。
  it('email rejects "user@"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user@')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A trailing dot.
  // 末尾にドットがある。
  it('email rejects "user@example.com."', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user@example.com.')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A space in the local part.
  // ローカル部に空白がある。
  it('email rejects "user @example.com"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user @example.com')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Two at signs.
  // アットマークが2つある。
  it('email rejects "user@@example.com"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user@@example.com')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A non-ASCII domain.
  // ASCII でないドメイン。
  it('email rejects "user@例え.jp"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user@例え.jp')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('uuid rejects "0190b1f400007000800000000000000"', async () => {
    const res = await pathParamsApp.request('/uuid/0190b1f400007000800000000000000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Version 9 does not exist.
  // バージョン 9 は存在しない。
  it('uuid rejects "a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await pathParamsApp.request('/uuid/a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Wrapped in braces.
  // 波括弧で囲まれている。
  it('uuid rejects "{0190b1f4-0000-7000-8000-000000000000}"', async () => {
    const res = await pathParamsApp.request(
      `/uuid/${encodeURIComponent('{0190b1f4-0000-7000-8000-000000000000}')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One digit short.
  // 1桁足りない。
  it('uuid rejects "0190b1f4-0000-7000-8000-00000000000"', async () => {
    const res = await pathParamsApp.request('/uuid/0190b1f4-0000-7000-8000-00000000000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('uuid rejects "0190b1f4-0000-7000-8000-00000000000g"', async () => {
    const res = await pathParamsApp.request('/uuid/0190b1f4-0000-7000-8000-00000000000g')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A version 7 UUID is not a version 4 one.
  // バージョン 7 の UUID はバージョン 4 ではない。
  it('uuidv4 rejects "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await pathParamsApp.request('/uuidv4/0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A version 4 UUID is not a version 7 one.
  // バージョン 4 の UUID はバージョン 7 ではない。
  it('uuidv7 rejects "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await pathParamsApp.request('/uuidv7/a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('guid rejects "a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d"', async () => {
    const res = await pathParamsApp.request('/guid/a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No scheme.
  // スキームがない。
  it('url rejects "example.com"', async () => {
    const res = await pathParamsApp.request('/url/example.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No host.
  // ホストがない。
  it('url rejects "https://"', async () => {
    const res = await pathParamsApp.request(`/url/${encodeURIComponent('https://')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A relative reference.
  // 相対参照である。
  it('url rejects "/path"', async () => {
    const res = await pathParamsApp.request(`/url/${encodeURIComponent('/path')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No scheme.
  // スキームがない。
  it('uri rejects "example.com"', async () => {
    const res = await pathParamsApp.request('/uri/example.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl rejects "ftp://example.com"', async () => {
    const res = await pathParamsApp.request(`/httpurl/${encodeURIComponent('ftp://example.com')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl rejects "mailto:a@b.c"', async () => {
    const res = await pathParamsApp.request(`/httpurl/${encodeURIComponent('mailto:a@b.c')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A label that starts with a hyphen.
  // ラベルがハイフンで始まっている。
  it('hostname rejects "-bad.com"', async () => {
    const res = await pathParamsApp.request('/hostname/-bad.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An underscore.
  // アンダースコアを含む。
  it('hostname rejects "exa_mple.com"', async () => {
    const res = await pathParamsApp.request('/hostname/exa_mple.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A label longer than 63 octets.
  // ラベルが 63 オクテットを超えている。
  it('hostname rejects "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com"', async () => {
    const res = await pathParamsApp.request(
      '/hostname/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Non-ASCII, not punycode.
  // Punycode でない非 ASCII 文字。
  it('hostname rejects "例え.jp"', async () => {
    const res = await pathParamsApp.request(`/hostname/${encodeURIComponent('例え.jp')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A 0x prefix.
  // 0x 接頭辞が付いている。
  it('hex rejects "0x1f"', async () => {
    const res = await pathParamsApp.request('/hex/0x1f')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not hexadecimal.
  // 16進数ではない。
  it('hex rejects "xyz"', async () => {
    const res = await pathParamsApp.request('/hex/xyz')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A letter.
  // 英字である。
  it('emoji rejects "a"', async () => {
    const res = await pathParamsApp.request('/emoji/a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A digit.
  // 数字である。
  it('emoji rejects "1"', async () => {
    const res = await pathParamsApp.request('/emoji/1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An emoji followed by a letter.
  // 絵文字の後ろに英字が続く。
  it('emoji rejects "🔥a"', async () => {
    const res = await pathParamsApp.request(`/emoji/${encodeURIComponent('🔥a')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Missing padding.
  // パディングが欠けている。
  it('base64 rejects "aGVsbG8"', async () => {
    const res = await pathParamsApp.request('/base64/aGVsbG8')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The base64url alphabet.
  // base64url の文字を使っている。
  it('base64 rejects "a-b_"', async () => {
    const res = await pathParamsApp.request('/base64/a-b_')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Outside the alphabet.
  // 使用できない文字である。
  it('base64 rejects "!!!!"', async () => {
    const res = await pathParamsApp.request('/base64/!!!!')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Padding is not allowed.
  // パディングは許可されない。
  it('base64url rejects "aGVsbG8="', async () => {
    const res = await pathParamsApp.request(`/base64url/${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The base64 alphabet.
  // base64 の文字を使っている。
  it('base64url rejects "a+b/"', async () => {
    const res = await pathParamsApp.request(`/base64url/${encodeURIComponent('a+b/')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Too short.
  // 短すぎる。
  it('nanoid rejects "short"', async () => {
    const res = await pathParamsApp.request('/nanoid/short')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One character too long.
  // 1文字長い。
  it('nanoid rejects "V1StGXR8_Z5jdHi6B-myT1"', async () => {
    const res = await pathParamsApp.request('/nanoid/V1StGXR8_Z5jdHi6B-myT1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('nanoid rejects "V1StGXR8_Z5jdHi6B!myT"', async () => {
    const res = await pathParamsApp.request('/nanoid/V1StGXR8_Z5jdHi6B!myT')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Upper case.
  // 大文字を含む。
  it('cuid2 rejects "Tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await pathParamsApp.request('/cuid2/Tz4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A hyphen.
  // ハイフンを含む。
  it('cuid2 rejects "tz4a98-xat96iws9zmbrgj3a"', async () => {
    const res = await pathParamsApp.request('/cuid2/tz4a98-xat96iws9zmbrgj3a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One character short.
  // 1文字足りない。
  it('ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FA"', async () => {
    const res = await pathParamsApp.request('/ulid/01ARZ3NDEKTSV4RRFFQ69G5FA')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Crockford base32 leaves out the letter U.
  // Crockford base32 は文字 U を含まない。
  it('ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FAU"', async () => {
    const res = await pathParamsApp.request('/ulid/01ARZ3NDEKTSV4RRFFQ69G5FAU')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An octet past 255.
  // オクテットが 255 を超えている。
  it('ipv4 rejects "256.0.0.1"', async () => {
    const res = await pathParamsApp.request('/ipv4/256.0.0.1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Three octets.
  // オクテットが3つしかない。
  it('ipv4 rejects "1.2.3"', async () => {
    const res = await pathParamsApp.request('/ipv4/1.2.3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Five octets.
  // オクテットが5つある。
  it('ipv4 rejects "1.2.3.4.5"', async () => {
    const res = await pathParamsApp.request('/ipv4/1.2.3.4.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A leading zero.
  // 先頭にゼロがある。
  it('ipv4 rejects "01.2.3.4"', async () => {
    const res = await pathParamsApp.request('/ipv4/01.2.3.4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An IPv6 address.
  // IPv6 アドレスである。
  it('ipv4 rejects "::1"', async () => {
    const res = await pathParamsApp.request(`/ipv4/${encodeURIComponent('::1')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A group that is not hexadecimal.
  // 16進数でないグループを含む。
  it('ipv6 rejects "2001:db8::g"', async () => {
    const res = await pathParamsApp.request(`/ipv6/${encodeURIComponent('2001:db8::g')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An IPv4 address.
  // IPv4 アドレスである。
  it('ipv6 rejects "1.2.3.4"', async () => {
    const res = await pathParamsApp.request('/ipv6/1.2.3.4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Wrapped in brackets, as in a URL.
  // URL のように角括弧で囲まれている。
  it('ipv6 rejects "[::1]"', async () => {
    const res = await pathParamsApp.request(`/ipv6/${encodeURIComponent('[::1]')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv4 rejects "192.168.0.0"', async () => {
    const res = await pathParamsApp.request('/cidrv4/192.168.0.0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A prefix past 32.
  // プレフィックス長が 32 を超えている。
  it('cidrv4 rejects "192.168.0.0/33"', async () => {
    const res = await pathParamsApp.request(`/cidrv4/${encodeURIComponent('192.168.0.0/33')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv6 rejects "2001:db8::"', async () => {
    const res = await pathParamsApp.request(`/cidrv6/${encodeURIComponent('2001:db8::')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A prefix past 128.
  // プレフィックス長が 128 を超えている。
  it('cidrv6 rejects "2001:db8::/129"', async () => {
    const res = await pathParamsApp.request(`/cidrv6/${encodeURIComponent('2001:db8::/129')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // 29 February of a year that is not a leap year.
  // うるう年でない年の 2月29日。
  it('date rejects "2021-02-29"', async () => {
    const res = await pathParamsApp.request('/date/2021-02-29')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Month 13.
  // 13 月。
  it('date rejects "2020-13-01"', async () => {
    const res = await pathParamsApp.request('/date/2020-13-01')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // 31 April.
  // 4月31日。
  it('date rejects "2020-04-31"', async () => {
    const res = await pathParamsApp.request('/date/2020-04-31')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('date rejects "2020-1-2"', async () => {
    const res = await pathParamsApp.request('/date/2020-1-2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The basic format, with no hyphens.
  // ハイフンのない基本形式。
  it('date rejects "20200102"', async () => {
    const res = await pathParamsApp.request('/date/20200102')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Slashes.
  // スラッシュ区切り。
  it('date rejects "2020/01/02"', async () => {
    const res = await pathParamsApp.request(`/date/${encodeURIComponent('2020/01/02')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A date-time is not a date.
  // 日時は日付ではない。
  it('date rejects "2020-01-02T00:00:00Z"', async () => {
    const res = await pathParamsApp.request(`/date/${encodeURIComponent('2020-01-02T00:00:00Z')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Hour 24.
  // 24 時。
  it('time rejects "24:00:00"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('24:00:00')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A leap second.
  // うるう秒。
  it('time rejects "23:59:60"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('23:59:60')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('time rejects "1:02:03"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('1:02:03')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A zone designator.
  // タイムゾーン指定子が付いている。
  it('time rejects "12:34:56Z"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('12:34:56Z')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An offset.
  // オフセットが付いている。
  it('time rejects "12:34:56+09:00"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('12:34:56+09:00')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No zone designator.
  // タイムゾーン指定子がない。
  it('datetime rejects "2020-01-02T03:04:05"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-01-02T03:04:05')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An offset instead of Z: the generated z.iso.datetime() takes Z only.
  // Z ではなくオフセット。生成される z.iso.datetime() は Z のみを受理する。
  it('datetime rejects "2020-01-02T03:04:05+09:00"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-01-02T03:04:05+09:00')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A date is not a date-time.
  // 日付は日時ではない。
  it('datetime rejects "2020-01-02"', async () => {
    const res = await pathParamsApp.request('/datetime/2020-01-02')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A space instead of T.
  // T の代わりに空白を使っている。
  it('datetime rejects "2020-01-02 03:04:05Z"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-01-02 03:04:05Z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Lower-case designators.
  // 指定子が小文字である。
  it('datetime rejects "2020-01-02t03:04:05z"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-01-02t03:04:05z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // 30 February.
  // 2月30日。
  it('datetime rejects "2020-02-30T00:00:00Z"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-02-30T00:00:00Z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No component.
  // 要素がない。
  it('duration rejects "P"', async () => {
    const res = await pathParamsApp.request('/duration/P')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No time component after T.
  // T の後に時刻要素がない。
  it('duration rejects "PT"', async () => {
    const res = await pathParamsApp.request('/duration/PT')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No P designator.
  // P 指定子がない。
  it('duration rejects "1Y"', async () => {
    const res = await pathParamsApp.request('/duration/1Y')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Negative.
  // 負の期間。
  it('duration rejects "-P1D"', async () => {
    const res = await pathParamsApp.request('/duration/-P1D')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A fractional day.
  // 小数の日数。
  it('duration rejects "P1.5D"', async () => {
    const res = await pathParamsApp.request('/duration/P1.5D')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Weeks mixed with other units.
  // 週を他の単位と混在させている。
  it('duration rejects "P1M1W"', async () => {
    const res = await pathParamsApp.request('/duration/P1M1W')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Hyphen separators.
  // ハイフン区切り。
  it('mac rejects "00-1a-2b-3c-4d-5e"', async () => {
    const res = await pathParamsApp.request('/mac/00-1a-2b-3c-4d-5e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No separators.
  // 区切り文字がない。
  it('mac rejects "001a2b3c4d5e"', async () => {
    const res = await pathParamsApp.request('/mac/001a2b3c4d5e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Dotted triples.
  // ドット区切りの3グループ表記。
  it('mac rejects "001a.2b3c.4d5e"', async () => {
    const res = await pathParamsApp.request('/mac/001a.2b3c.4d5e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Five octets.
  // オクテットが5つしかない。
  it('mac rejects "00:1a:2b:3c:4d"', async () => {
    const res = await pathParamsApp.request(`/mac/${encodeURIComponent('00:1a:2b:3c:4d')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('mac rejects "00:1a:2b:3c:4d:5g"', async () => {
    const res = await pathParamsApp.request(`/mac/${encodeURIComponent('00:1a:2b:3c:4d:5g')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No plus sign.
  // プラス記号がない。
  it('e164 rejects "14155552671"', async () => {
    const res = await pathParamsApp.request('/e164/14155552671')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A country code that starts with 0.
  // 国番号が 0 で始まっている。
  it('e164 rejects "+0123456789"', async () => {
    const res = await pathParamsApp.request(`/e164/${encodeURIComponent('+0123456789')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Too short.
  // 短すぎる。
  it('e164 rejects "+1"', async () => {
    const res = await pathParamsApp.request(`/e164/${encodeURIComponent('+1')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past 15 digits.
  // 15桁を超えている。
  it('e164 rejects "+1234567890123456"', async () => {
    const res = await pathParamsApp.request(`/e164/${encodeURIComponent('+1234567890123456')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A letter.
  // 英字を含む。
  it('e164 rejects "+1415555267a"', async () => {
    const res = await pathParamsApp.request(`/e164/${encodeURIComponent('+1415555267a')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Fails the Luhn check.
  // Luhn チェックに失敗する。
  it('creditcard rejects "4111111111111112"', async () => {
    const res = await pathParamsApp.request('/creditcard/4111111111111112')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Too short.
  // 短すぎる。
  it('creditcard rejects "1234"', async () => {
    const res = await pathParamsApp.request('/creditcard/1234')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Fails the checksum.
  // チェックサムが一致しない。
  it('iban rejects "DE89370400440532013001"', async () => {
    const res = await pathParamsApp.request('/iban/DE89370400440532013001')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Lower case.
  // 小文字である。
  it('iban rejects "de89370400440532013000"', async () => {
    const res = await pathParamsApp.request('/iban/de89370400440532013000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The printed form, with spaces.
  // 空白入りの印字形式。
  it('iban rejects "DE89 3704 0044 0532 0130 00"', async () => {
    const res = await pathParamsApp.request(
      `/iban/${encodeURIComponent('DE89 3704 0044 0532 0130 00')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Too short.
  // 短すぎる。
  it('iban rejects "XX00"', async () => {
    const res = await pathParamsApp.request('/iban/XX00')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Lower case.
  // 小文字である。
  it('currencycode rejects "usd"', async () => {
    const res = await pathParamsApp.request('/currencycode/usd')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not an ISO 4217 code.
  // ISO 4217 に存在しないコード。
  it('currencycode rejects "ZZZ"', async () => {
    const res = await pathParamsApp.request('/currencycode/ZZZ')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Two letters.
  // 2文字しかない。
  it('currencycode rejects "US"', async () => {
    const res = await pathParamsApp.request('/currencycode/US')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Four letters.
  // 4文字ある。
  it('currencycode rejects "USDD"', async () => {
    const res = await pathParamsApp.request('/currencycode/USDD')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A numeric code.
  // 数字のコード。
  it('currencycode rejects "999"', async () => {
    const res = await pathParamsApp.request('/currencycode/999')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One character short.
  // 1文字足りない。
  it('ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT"', async () => {
    const res = await pathParamsApp.request('/ksuid/0ujsszwN8NRY24YaXiTIE2VWDT')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT!"', async () => {
    const res = await pathParamsApp.request('/ksuid/0ujsszwN8NRY24YaXiTIE2VWDT!')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One character short.
  // 1文字足りない。
  it('xid rejects "9m4e2mr0ui3e8a215n4"', async () => {
    const res = await pathParamsApp.request('/xid/9m4e2mr0ui3e8a215n4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The letter z is not in base32hex.
  // 文字 z は base32hex に含まれない。
  it('xid rejects "9m4e2mr0ui3e8a215n4z"', async () => {
    const res = await pathParamsApp.request('/xid/9m4e2mr0ui3e8a215n4z')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// A transform changes the value before it reaches the handler, so these tests assert the
// value that arrives.
// 変換はハンドラに届く前に値を書き換える。そのため、ここでは届いた値を検証する。
describe('transforms: x-* extensions and format: trim', () => {
  // The transform runs first and the format check second, on the transformed value:
  // lower-cased, this is still not an email.
  // 変換が先、フォーマット検証が後であり、検証は変換後の値に対して行われる。小文字化しても、
  // これはメールアドレスではない。
  it('txemail rejects "NOT-AN-EMAIL"', async () => {
    const res = await pathParamsApp.request('/txemail/NOT-AN-EMAIL')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Lower-casing does not trim, so the leading space fails the email check.
  // 小文字化はトリムを行わないため、先頭の空白がメールアドレスの検証で失敗する。
  it('txemail rejects " USER@EXAMPLE.COM"', async () => {
    const res = await pathParamsApp.request(`/txemail/${encodeURIComponent(' USER@EXAMPLE.COM')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// A numeric or boolean enum / const names a typed value, and the segment is text: the literal
// used to be matched against the raw string, so every such request was rejected.
// 数値・真偽値の enum / const は型付きの値を指すが、セグメントは文字列である。
// かつてはリテラルを生の文字列と比較していたため、該当リクエストはすべて拒否されていた。
describe('literals: enum and const', () => {
  // Outside the enum.
  // enum に含まれない値。
  it('ienum rejects "3"', async () => {
    const res = await pathParamsApp.request('/ienum/3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Outside the enum.
  // enum に含まれない値。
  it('ienum rejects "0"', async () => {
    const res = await pathParamsApp.request('/ienum/0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Between two members.
  // 2つのメンバーの中間の値。
  it('ienum rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/ienum/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A boolean is not a member of an integer enum.
  // 真偽値は integer の enum のメンバーではない。
  it('ienum rejects "true"', async () => {
    const res = await pathParamsApp.request('/ienum/true')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Outside the number enum.
  // number の enum に含まれない値。
  it('nenum rejects "1"', async () => {
    const res = await pathParamsApp.request('/nenum/1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The boolean the enum leaves out.
  // enum に含まれていない側の真偽値。
  it('benum rejects "false"', async () => {
    const res = await pathParamsApp.request('/benum/false')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // False, spelled as a digit.
  // 数字で表記した false。
  it('benum rejects "0"', async () => {
    const res = await pathParamsApp.request('/benum/0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not the constant.
  // 定数値ではない。
  it('iconst rejects "8"', async () => {
    const res = await pathParamsApp.request('/iconst/8')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('iconst rejects "seven"', async () => {
    const res = await pathParamsApp.request('/iconst/seven')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A string enum is case-sensitive.
  // string の enum は大文字小文字を区別する。
  it('senum rejects "ASC"', async () => {
    const res = await pathParamsApp.request('/senum/ASC')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Trailing whitespace makes it a different string.
  // 末尾に空白があると別の文字列になる。
  it('senum rejects "asc "', async () => {
    const res = await pathParamsApp.request(`/senum/${encodeURIComponent('asc ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A longer word that merely starts with a member.
  // メンバーで始まるだけの、より長い単語。
  it('senum rejects "ascending"', async () => {
    const res = await pathParamsApp.request('/senum/ascending')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A string const is case-sensitive.
  // string の const は大文字小文字を区別する。
  it('sconst rejects "Fixed"', async () => {
    const res = await pathParamsApp.request('/sconst/Fixed')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not the constant.
  // 定数値ではない。
  it('sconst rejects "other"', async () => {
    const res = await pathParamsApp.request('/sconst/other')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Numerically equal to "02", textually not: nothing coerces a string enum.
  // 数値としては "02" と等しいが、文字列としては異なる。string enum は coerce されない。
  it('numericsenum rejects "2"', async () => {
    const res = await pathParamsApp.request('/numericsenum/2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Numerically equal to "1", textually not.
  // 数値としては "1" と等しいが、文字列としては異なる。
  it('numericsenum rejects "01"', async () => {
    const res = await pathParamsApp.request('/numericsenum/01')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Numerically equal to "1", textually not.
  // 数値としては "1" と等しいが、文字列としては異なる。
  it('numericsenum rejects "1.0"', async () => {
    const res = await pathParamsApp.request('/numericsenum/1.0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The case differs from the member "true".
  // メンバー "true" と大文字小文字が異なる。
  it('numericsenum rejects "TRUE"', async () => {
    const res = await pathParamsApp.request('/numericsenum/TRUE')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// A constraint on a numeric parameter applies to the coerced value, not to the text of the
// segment.
// 数値パラメータの制約は、セグメントの文字列ではなく coerce 後の値に適用される。
describe('constraints: numeric and string', () => {
  // One below the minimum.
  // 最小値を 1 下回る。
  it('range rejects "0"', async () => {
    const res = await pathParamsApp.request('/range/0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('range rejects "11"', async () => {
    const res = await pathParamsApp.request('/range/11')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Negative.
  // 負の値。
  it('range rejects "-1"', async () => {
    const res = await pathParamsApp.request('/range/-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // In range, and not an integer.
  // 範囲内だが整数ではない。
  it('range rejects "5.5"', async () => {
    const res = await pathParamsApp.request('/range/5.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The exclusive minimum itself.
  // exclusiveMinimum の値そのもの。
  it('exclusive rejects "0"', async () => {
    const res = await pathParamsApp.request('/exclusive/0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The exclusive maximum itself.
  // exclusiveMaximum の値そのもの。
  it('exclusive rejects "1"', async () => {
    const res = await pathParamsApp.request('/exclusive/1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Below the minimum.
  // 最小値を下回る。
  it('exclusive rejects "-0.1"', async () => {
    const res = await pathParamsApp.request('/exclusive/-0.1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Not a multiple of 5.
  // 5 の倍数ではない。
  it('multiple rejects "7"', async () => {
    const res = await pathParamsApp.request('/multiple/7')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Half of the step, and not an integer.
  // ステップの半分であり、整数でもない。
  it('multiple rejects "2.5"', async () => {
    const res = await pathParamsApp.request('/multiple/2.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('int64range rejects "0"', async () => {
    const res = await pathParamsApp.request('/int64range/0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('int64range rejects "101"', async () => {
    const res = await pathParamsApp.request('/int64range/101')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One below minLength.
  // minLength を 1 下回る。
  it('length rejects "a"', async () => {
    const res = await pathParamsApp.request('/length/a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One above maxLength.
  // maxLength を 1 超える。
  it('length rejects "abcde"', async () => {
    const res = await pathParamsApp.request('/length/abcde')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One character, though two UTF-16 code units: below minLength.
  // 1文字(UTF-16 では 2 コードユニット)であり、minLength を下回る。
  it('length rejects "🔥"', async () => {
    const res = await pathParamsApp.request(`/length/${encodeURIComponent('🔥')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Five characters: above maxLength.
  // 5文字であり、maxLength を超える。
  it('length rejects "🔥🔥🔥🔥🔥"', async () => {
    const res = await pathParamsApp.request(`/length/${encodeURIComponent('🔥🔥🔥🔥🔥')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Four digits where three are allowed.
  // 3桁までのところに4桁ある。
  it('pattern rejects "abc-1234"', async () => {
    const res = await pathParamsApp.request('/pattern/abc-1234')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Upper case.
  // 大文字である。
  it('pattern rejects "ABC-1"', async () => {
    const res = await pathParamsApp.request('/pattern/ABC-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No digits.
  // 数字がない。
  it('pattern rejects "abc-"', async () => {
    const res = await pathParamsApp.request('/pattern/abc-')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // No letters.
  // 英字がない。
  it('pattern rejects "-1"', async () => {
    const res = await pathParamsApp.request('/pattern/-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The anchors must hold: a match in the middle is not enough.
  // アンカーが効いていること。途中の一致だけでは不十分である。
  it('pattern rejects "xabc-1x"', async () => {
    const res = await pathParamsApp.request('/pattern/xabc-1x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A trailing line feed: $ must not match before it.
  // 末尾の改行。$ はその直前に一致してはならない。
  it('pattern rejects "abc-1\\n"', async () => {
    const res = await pathParamsApp.request(`/pattern/${encodeURIComponent('abc-1\n')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A full-width digit is not matched by \d.
  // 全角数字は \d に一致しない。
  it('pattern rejects "abc-１"', async () => {
    const res = await pathParamsApp.request(`/pattern/${encodeURIComponent('abc-１')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Past the int64 range as well as past the maximum: both checks fail, so the parameter is
  // reported twice.
  // int64 の範囲と maximum の両方を超える。両方の検証が失敗するため、
  // 同じパラメータが2回報告される。
  it('int64range rejects "9223372036854775808"', async () => {
    const res = await pathParamsApp.request('/int64range/9223372036854775808')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value', 'value'] })
  })
})

// The parameter is oneOf an integer or the string "all". The integer branch coerces; the
// string branch does not need to.
// パラメータは integer または文字列 "all" の oneOf である。integer 側の分岐は coerce され、
// string 側の分岐は coerce 不要である。
describe('combinators: oneOf and allOf', () => {
  // Matches neither branch.
  // どちらの分岐にも一致しない。
  it('oneof rejects "other"', async () => {
    const res = await pathParamsApp.request('/oneof/other')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The string branch is case-sensitive.
  // string 側は大文字小文字を区別する。
  it('oneof rejects "ALL"', async () => {
    const res = await pathParamsApp.request('/oneof/ALL')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A fraction matches neither branch.
  // 小数はどちらの分岐にも一致しない。
  it('oneof rejects "1.5"', async () => {
    const res = await pathParamsApp.request('/oneof/1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // One below the minimum of the second branch.
  // 2番目の分岐の最小値を 1 下回る。
  it('allof rejects a value below the minimum', async () => {
    const res = await pathParamsApp.request('/allof/4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not an integer, the first branch. It is a rejection, not a server error.
  // 単語は、1番目の分岐が求める整数ではない。サーバーエラーではなく、拒否となる。
  it('allof rejects a word', async () => {
    const res = await pathParamsApp.request('/allof/x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// The route is /orgs/{orgId}/repos/{repoId}/issues/{issueId}.
// ルートは /orgs/{orgId}/repos/{repoId}/issues/{issueId} である。
describe('declarations: several parameters in one path', () => {
  // All three are invalid. Every failing parameter is reported, in declaration order, not just
  // the first.
  // 3つとも不正な値である。最初の1件だけでなく、
  // 失敗したすべてのパラメータが宣言順に報告される。
  it('reports every parameter that fails', async () => {
    const res = await pathParamsApp.request('/orgs/x/repos/y/issues/z')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['orgId', 'repoId', 'issueId'] })
  })

  // Only the first parameter is invalid, so only it is reported.
  // 不正なのは最初のパラメータだけなので、それだけが報告される。
  it('reports only orgId when only orgId fails', async () => {
    const res = await pathParamsApp.request(
      '/orgs/x/repos/0190b1f4-0000-7000-8000-000000000000/issues/1',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['orgId'] })
  })

  // Only the middle parameter is invalid.
  // 不正なのは中間のパラメータだけである。
  it('reports only repoId when only repoId fails', async () => {
    const res = await pathParamsApp.request('/orgs/1/repos/not-a-uuid/issues/1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['repoId'] })
  })

  // Only the last parameter is invalid: a fraction cannot become a bigint.
  // 不正なのは最後のパラメータだけである。小数は bigint に変換できない。
  it('reports only issueId when only issueId fails', async () => {
    const res = await pathParamsApp.request(
      '/orgs/1/repos/0190b1f4-0000-7000-8000-000000000000/issues/1.5',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['issueId'] })
  })

  // With no last segment the path matches no route; the request never reaches validation.
  // 最後のセグメントがないとどのルートにも一致せず、リクエストは検証まで到達しない。
  it('answers 404 when the last parameter is missing', async () => {
    const res = await pathParamsApp.request(
      '/orgs/1/repos/0190b1f4-0000-7000-8000-000000000000/issues',
    )
    expect(res.status).toBe(404)
  })

  // An empty segment is not a parameter value.
  // 空のセグメントはパラメータの値にならない。
  it('answers 404 when a middle parameter is empty', async () => {
    const res = await pathParamsApp.request('/orgs/1/repos//issues/1')
    expect(res.status).toBe(404)
  })

  // "repo" is not "repos": static segments match exactly.
  // "repo" は "repos" ではない。静的セグメントは完全一致で照合される。
  it('answers 404 when a static segment is misspelled', async () => {
    const res = await pathParamsApp.request(
      '/orgs/1/repo/0190b1f4-0000-7000-8000-000000000000/issues/1',
    )
    expect(res.status).toBe(404)
  })
})

// The route is /named/{user-id}/{post_id}.
// ルートは /named/{user-id}/{post_id} である。
describe('declarations: parameter names that are not identifiers', () => {
  // The issue carries the name exactly as the spec declares it.
  // issue には、仕様で宣言されたとおりの名前が入る。
  it('reports a failure under the declared name', async () => {
    const res = await pathParamsApp.request('/named/x/maybe')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['user-id', 'post_id'] })
  })

  // The boolean is valid, the integer is not.
  // boolean は有効で、integer だけが不正である。
  it('reports only the hyphenated name when only it fails', async () => {
    const res = await pathParamsApp.request('/named/x/true')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['user-id'] })
  })
})

// How a parameter is declared must not change how it is coerced.
// パラメータの宣言方法によって、coerce の結果が変わってはならない。
describe('declarations: $ref and path-item level', () => {
  // The issue is reported under the name the referenced parameter declares, "id".
  // issue は、参照先のパラメータが宣言する名前 "id" で報告される。
  it('a parameter $ref rejects what its schema rejects', async () => {
    const res = await pathParamsApp.request('/paramref/x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // The inherited declaration validates as well as coerces.
  // 継承された宣言は、coerce だけでなく検証も行う。
  it('a path-item parameter rejects a word for GET', async () => {
    const res = await pathParamsApp.request('/shared/x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // And it validates there too.
  // そこでも検証が行われる。
  it('a path-item parameter rejects a word for DELETE', async () => {
    const res = await pathParamsApp.request('/shared/x', { method: 'DELETE' })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // /shared/{id} declares GET and DELETE only.
  // /shared/{id} が宣言しているのは GET と DELETE だけである。
  it('a method the path item does not declare is not routed', async () => {
    const res = await pathParamsApp.request('/shared/1', { method: 'POST' })
    expect(res.status).toBe(404)
  })

  // A word would have passed the path item's string schema; the operation's integer schema
  // rejects it.
  // 単語はパスアイテムの string スキーマなら通るが、
  // オペレーションの integer スキーマでは拒否される。
  it('an overridden parameter rejects what the operation schema rejects', async () => {
    const res = await pathParamsApp.request('/override/x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // -1 is an integer, and below the minimum of the referenced schema, 0: the constraint of
  // the component applies to the value read from the segment.
  // -1 は整数であり、参照先スキーマの最小値 0 を下回る。
  // コンポーネントの制約は、セグメントから読み取った値に適用される。
  it('a schema $ref rejects a value below the referenced minimum', async () => {
    const res = await pathParamsApp.request('/schemaref/-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A word is not an integer, behind a reference as much as inline.
  // 単語は整数ではない。参照経由でも、インライン宣言と同じである。
  it('a schema $ref rejects a word', async () => {
    const res = await pathParamsApp.request('/schemaref/abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})

// What decides whether a request reaches the route at all.
// リクエストがそもそもルートに到達するかどうかを決める要素。
describe('wire: routing', () => {
  // "/integer/" has no value to validate.
  // "/integer/" には検証する値がない。
  it('answers 404 when the segment is empty', async () => {
    const res = await pathParamsApp.request('/integer/')
    expect(res.status).toBe(404)
  })

  // "/integer" is a different path.
  // "/integer" は別のパスである。
  it('answers 404 when the segment is absent', async () => {
    const res = await pathParamsApp.request('/integer')
    expect(res.status).toBe(404)
  })

  // The route has exactly one parameter segment.
  // ルートのパラメータセグメントは1つだけである。
  it('answers 404 when there is a segment too many', async () => {
    const res = await pathParamsApp.request('/integer/1/extra')
    expect(res.status).toBe(404)
  })

  // A trailing slash makes it a different path.
  // 末尾のスラッシュがあると別のパスになる。
  it('answers 404 when there is a trailing slash', async () => {
    const res = await pathParamsApp.request('/integer/1/')
    expect(res.status).toBe(404)
  })

  // Paths are case-sensitive.
  // パスは大文字小文字を区別する。
  it('answers 404 when the static segment differs in case', async () => {
    const res = await pathParamsApp.request('/INTEGER/1')
    expect(res.status).toBe(404)
  })

  // An unencoded slash splits the value into two segments; the client has to send %2F.
  // エンコードされていないスラッシュは、値を2つのセグメントに分割する。
  // クライアントは %2F を送る必要がある。
  it('answers 404 when the value holds an unencoded slash', async () => {
    const res = await pathParamsApp.request('/cidrv4/192.168.0.0/24')
    expect(res.status).toBe(404)
  })

  // "." is resolved by URL parsing before routing sees it, leaving "/string/".
  // "." はルーティングより前に URL パースで解決され、"/string/" になる。
  it('answers 404 when the segment is a single dot', async () => {
    const res = await pathParamsApp.request('/string/.')
    expect(res.status).toBe(404)
  })

  // ".." is resolved by URL parsing too, leaving "/".
  // ".." も URL パースで解決され、"/" になる。
  it('answers 404 when the segment is a double dot', async () => {
    const res = await pathParamsApp.request('/string/..')
    expect(res.status).toBe(404)
  })

  // Hono answers HEAD through the GET route, so the parameter is validated the same way: an
  // invalid one is rejected.
  // Hono は HEAD を GET のルートで処理するため、パラメータは同じように検証される。
  // 不正な値は拒否される。
  it('rejects an invalid HEAD request like the GET it mirrors', async () => {
    const res = await pathParamsApp.request('/integer/x', { method: 'HEAD' })
    expect(res.status).toBe(422)
  })
})

// An element of a split segment is validated on its own and reported at its index.
// 分割されたセグメントの要素は、個別に検証され、そのインデックスで報告される。
describe('styles: simple, label and matrix', () => {
  // The second element is not an integer.
  // 2番目の要素が整数ではない。
  it('simplearr rejects a word among its elements', async () => {
    const res = await pathParamsApp.request('/simplearr/1,x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.1'] })
  })

  // Two commas in a row leave an empty element, which is not an integer.
  // カンマが連続すると空の要素が残る。空の要素は整数ではない。
  it('simplearr rejects an empty element', async () => {
    const res = await pathParamsApp.request('/simplearr/1,,2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.1'] })
  })

  // The prefix is stripped and what is left is not an integer.
  // 接頭辞を取り除いた残りが、整数ではない。
  it('label rejects a word after the dot', async () => {
    const res = await pathParamsApp.request('/label/.x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The third element is not an integer.
  // 3番目の要素が整数ではない。
  it('labelarr rejects a word among its elements', async () => {
    const res = await pathParamsApp.request('/labelarr/.1,2,x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.2'] })
  })

  // The prefix is stripped and what is left is not an integer.
  // 接頭辞を取り除いた残りが、整数ではない。
  it('matrix rejects a word after the prefix', async () => {
    const res = await pathParamsApp.request('/matrix/;value=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The prefix carries the name of the parameter, value. Another name is not stripped, and what
  // is left is not an integer.
  // 接頭辞にはパラメータ名である value が入る。別の名前は取り除かれず、
  // 残った文字列は整数ではない。
  it('matrix rejects the prefix of another name', async () => {
    const res = await pathParamsApp.request('/matrix/;other=5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The second element is not an integer.
  // 2番目の要素が整数ではない。
  it('matrixexplode rejects a word among its elements', async () => {
    const res = await pathParamsApp.request('/matrixexplode/;value=1;value=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.1'] })
  })
})

// A property is validated on its own and reported under its name; a segment that does not come
// apart as the style says is rejected as a whole.
// プロパティは個別に検証され、その名前で報告される。スタイルの規則どおりに分解できない
// セグメントは、全体として拒否される。
describe('objects: an object in one segment', () => {
  // a is an integer.
  // a は integer である。
  it('simpleobj rejects a word where a property is an integer', async () => {
    const res = await pathParamsApp.request('/simpleobj/a,x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.a'] })
  })

  // One part cannot be a pair.
  // 1つの部分だけでは、ペアにならない。
  it('simpleobj rejects a name left without its value', async () => {
    const res = await pathParamsApp.request('/simpleobj/a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // a has no "=".
  // a には "=" がない。
  it('simpleobjx rejects a part that is not an assignment', async () => {
    const res = await pathParamsApp.request('/simpleobjx/a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // a is an integer.
  // a は integer である。
  it('simpleobjx rejects a word where a property is an integer', async () => {
    const res = await pathParamsApp.request('/simpleobjx/a=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.a'] })
  })

  // a is an integer.
  // a は integer である。
  it('matrixobjx rejects a word where a property is an integer', async () => {
    const res = await pathParamsApp.request('/matrixobjx/;a=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value.a'] })
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
    const res = await pathParamsApp.request(`/integer/${encodeURIComponent('+1')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An explicit plus sign is not part of a decimal literal.
  // 明示的なプラス記号は、10進リテラルには含まれない。
  it('int64 rejects "+5"', async () => {
    const res = await pathParamsApp.request(`/int64/${encodeURIComponent('+5')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('integer rejects "0x10"', async () => {
    const res = await pathParamsApp.request('/integer/0x10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A binary literal is not decimal.
  // 2進リテラルは10進表記ではない。
  it('integer rejects "0b11"', async () => {
    const res = await pathParamsApp.request('/integer/0b11')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // An octal literal is not decimal.
  // 8進リテラルは10進表記ではない。
  it('integer rejects "0o7"', async () => {
    const res = await pathParamsApp.request('/integer/0o7')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('number rejects "0x1F"', async () => {
    const res = await pathParamsApp.request('/number/0x1F')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('int64 rejects "0x10"', async () => {
    const res = await pathParamsApp.request('/int64/0x10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Surrounding whitespace is not trimmed.
  // 前後の空白は取り除かれない。
  it('integer rejects " 42 "', async () => {
    const res = await pathParamsApp.request(`/integer/${encodeURIComponent(' 42 ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('integer rejects " "', async () => {
    const res = await pathParamsApp.request(`/integer/${encodeURIComponent(' ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('number rejects " "', async () => {
    const res = await pathParamsApp.request(`/number/${encodeURIComponent(' ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('int64 rejects " "', async () => {
    const res = await pathParamsApp.request(`/int64/${encodeURIComponent(' ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('ienum rejects "0x1"', async () => {
    const res = await pathParamsApp.request('/ienum/0x1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // The opposite case, stricter than the name suggests: httpUrl requires a dotted domain, so a
  // bare localhost does not pass.
  // 逆に、名前から想像されるより厳しい例。httpUrl はドットを含むドメインを要求するため、
  // localhost 単体は通らない。
  it('httpurl rejects "https://localhost"', async () => {
    const res = await pathParamsApp.request(`/httpurl/${encodeURIComponent('https://localhost')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})
