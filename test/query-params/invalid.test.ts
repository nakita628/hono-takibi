// Every parameter shape the generator supports, sent as a real query string and checked
// for the JavaScript type and value it arrives as. HTTP carries all of them as strings, so
// a schema that forgets to coerce rejects its own input: the failure this file exists to
// catch.
//
// 生成器が対応するすべてのパラメータ形状を、実際のクエリ文字列として送信し、届いた時点の
// JavaScript の型と値を検証する。HTTP はすべてを文字列で運ぶため、coerce を忘れたスキーマは
// 自身の入力を拒否してしまう。このファイルは、その種の不具合を検出するためにある。
//
// How to read a test / テストの読み方:
//   Every route answers the parameters its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A parameter
//   that was not sent and has no default is absent from the answer. A rejected request
//   answers 422 with `{ issues: [...] }`: the path of every issue, which for an array
//   element is `<name>.<index>`.
//   すべてのルートは、ハンドラが受け取ったパラメータを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないパラメータは、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }` を返す。issue のパスは、配列要素の場合 `<名前>.<インデックス>` になる。
//
// Routes / ルート:
//   /params    every shape, scalar (`<shape>`) and array (`<shape>_arr`), all optional
//              全形状のスカラー(`<shape>`)と配列(`<shape>_arr`)。すべて任意
//   /literals  enum, const, oneOf, nullable / enum・const・oneOf・nullable
//   /optional  optional parameters and odd names / 任意パラメータと特殊な名前
//   /defaults  parameters with a default / デフォルト値を持つパラメータ
//   /required  required parameters / 必須パラメータ
//   /limits    constraints / 制約
//   /styles    serialisation styles / シリアライズ形式
//   /objects   parameters that are an object / オブジェクトであるパラメータ
//   /absent    allowEmptyValue, a default beside a reference
//              allowEmptyValue と、参照と並ぶデフォルト値
//   /refs      a schema behind $ref / $ref の先にあるスキーマ
//   /combinators  allOf, oneOf, anyOf, not, mixed enum, tuple
//              allOf・oneOf・anyOf・not・型混在の enum・タプル
//   /content   a JSON document / JSON 文書
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
//   - array elements: rejected values
//   - array elements: string formats
//   - arrays
//   - transforms: x-* extensions
//   - literals: enum, const and oneOf
//   - optional: absent and present
//   - defaults
//   - required
//   - names: parameter names that are not identifiers
//   - constraints
//   - wire: encoding, separators and repetition
//   - absent: an empty value that stands for none, and a default beside a reference
//   - objects: a parameter spread over the query
//   - styles: serialisations other than form + explode
//   - references: a schema behind $ref
//   - combinators: the text is read once
//   - content: a JSON document
//   - strictness: what the wire grammar does not read
import { describe, expect, it } from 'vite-plus/test'

import { queryParamsApp } from './app'

// A non-string shape that coerces carelessly would accept anything. A word must be rejected
// by every one of them.
// 雑な coerce を行う非文字列形状は、何でも受理してしまう。単語は、
// どの非文字列形状でも拒否されなければならない。
describe('shapes: a shape that is not a string rejects a word', () => {
  // A word is not a number.
  // 単語は number ではない。
  it('integer rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?integer=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('int32 rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?int32=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('int64 rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?int64=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('bigint rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?bigint=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bigint'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('uint32 rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?uint32=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('uint64 rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?uint64=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('number rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?number=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?float=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float32 rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?float32=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float64 rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?float64=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('double rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?double=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['double'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('numpassword rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?numpassword=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numpassword'] })
  })

  // A word is not a boolean.
  // 単語は boolean ではない。
  it('boolean rejects "not-a-value"', async () => {
    const res = await queryParamsApp.request('/params?boolean=not-a-value')
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
    const res = await queryParamsApp.request('/params?integer=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Past MAX_SAFE_INTEGER a double would round to a different number, so the value is refused.
  // MAX_SAFE_INTEGER を超えると double は別の数値に丸めてしまうため、拒否される。
  it('integer rejects "9007199254740993"', async () => {
    const res = await queryParamsApp.request('/params?integer=9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Past MIN_SAFE_INTEGER, for the same reason.
  // MIN_SAFE_INTEGER を下回る値も同じ理由で拒否される。
  it('integer rejects "-9007199254740993"', async () => {
    const res = await queryParamsApp.request('/params?integer=-9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('integer rejects "Infinity"', async () => {
    const res = await queryParamsApp.request('/params?integer=Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Negative infinity is not finite.
  // -Infinity は有限の数ではない。
  it('integer rejects "-Infinity"', async () => {
    const res = await queryParamsApp.request('/params?integer=-Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('integer rejects "NaN"', async () => {
    const res = await queryParamsApp.request('/params?integer=NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A thousands separator is not part of a number.
  // 桁区切りのカンマは数値の一部ではない。
  it('integer rejects "1,000"', async () => {
    const res = await queryParamsApp.request(`/params?integer=${encodeURIComponent('1,000')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // The JavaScript numeric separator is source syntax, not a value.
  // JavaScript の数値セパレータはソース上の記法であり、値ではない。
  it('integer rejects "1_000"', async () => {
    const res = await queryParamsApp.request('/params?integer=1_000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A full-width digit is not an ASCII digit.
  // 全角数字は ASCII の数字ではない。
  it('integer rejects "９"', async () => {
    const res = await queryParamsApp.request(`/params?integer=${encodeURIComponent('９')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // The word "null" is not a number.
  // "null" という単語は数値ではない。
  it('integer rejects "null"', async () => {
    const res = await queryParamsApp.request('/params?integer=null')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A boolean is not a number.
  // 真偽値は数値ではない。
  it('integer rejects "true"', async () => {
    const res = await queryParamsApp.request('/params?integer=true')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Digits followed by text are not a number.
  // 数字の後ろに文字が続く値は数値ではない。
  it('integer rejects "12abc"', async () => {
    const res = await queryParamsApp.request('/params?integer=12abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // One past the int32 maximum.
  // int32 の最大値を 1 超える。
  it('int32 rejects "2147483648"', async () => {
    const res = await queryParamsApp.request('/params?int32=2147483648')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // One past the int32 minimum.
  // int32 の最小値を 1 下回る。
  it('int32 rejects "-2147483649"', async () => {
    const res = await queryParamsApp.request('/params?int32=-2147483649')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // A fraction is not an int32.
  // 小数は int32 ではない。
  it('int32 rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/params?int32=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32'] })
  })

  // One past the uint32 maximum.
  // uint32 の最大値を 1 超える。
  it('uint32 rejects "4294967296"', async () => {
    const res = await queryParamsApp.request('/params?uint32=4294967296')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint32 rejects "-1"', async () => {
    const res = await queryParamsApp.request('/params?uint32=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // A fraction is not a uint32.
  // 小数は uint32 ではない。
  it('uint32 rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/params?uint32=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('int64 rejects "9223372036854775808"', async () => {
    const res = await queryParamsApp.request('/params?int64=9223372036854775808')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // One past the int64 minimum.
  // int64 の最小値を 1 下回る。
  it('int64 rejects "-9223372036854775809"', async () => {
    const res = await queryParamsApp.request('/params?int64=-9223372036854775809')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('int64 rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/params?int64=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // The JavaScript bigint suffix is source syntax, not a value.
  // JavaScript の bigint 接尾辞はソース上の記法であり、値ではない。
  it('int64 rejects "1n"', async () => {
    const res = await queryParamsApp.request('/params?int64=1n')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // One past the uint64 maximum.
  // uint64 の最大値を 1 超える。
  it('uint64 rejects "18446744073709551616"', async () => {
    const res = await queryParamsApp.request('/params?uint64=18446744073709551616')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint64 rejects "-1"', async () => {
    const res = await queryParamsApp.request('/params?uint64=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('uint64 rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/params?uint64=1.5')
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
    const res = await queryParamsApp.request('/params?number=Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('number rejects "NaN"', async () => {
    const res = await queryParamsApp.request('/params?number=NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('number rejects "1e400"', async () => {
    const res = await queryParamsApp.request('/params?number=1e400')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A decimal comma is not a decimal point.
  // 小数点としてのカンマは認められない。
  it('number rejects "1,5"', async () => {
    const res = await queryParamsApp.request(`/params?number=${encodeURIComponent('1,5')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Two decimal points.
  // 小数点が2つある。
  it('number rejects "1.5.5"', async () => {
    const res = await queryParamsApp.request('/params?number=1.5.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Past the float32 maximum; format: float is a float32.
  // float32 の最大値を超える。format: float は float32 である。
  it('float rejects "3.5e38"', async () => {
    const res = await queryParamsApp.request('/params?float=3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float'] })
  })

  // Past the float32 maximum.
  // float32 の最大値を超える。
  it('float32 rejects "3.5e38"', async () => {
    const res = await queryParamsApp.request('/params?float32=3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32'] })
  })

  // Past the float32 minimum.
  // float32 の最小値を下回る。
  it('float32 rejects "-3.5e38"', async () => {
    const res = await queryParamsApp.request('/params?float32=-3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('float64 rejects "1e309"', async () => {
    const res = await queryParamsApp.request('/params?float64=1e309')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('float64 rejects "Infinity"', async () => {
    const res = await queryParamsApp.request('/params?float64=Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('double rejects "1e309"', async () => {
    const res = await queryParamsApp.request('/params?double=1e309')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['double'] })
  })

  // format: password does not loosen the number check.
  // format: password を付けても、数値の検証は緩まない。
  it('numpassword rejects "NaN"', async () => {
    const res = await queryParamsApp.request('/params?numpassword=NaN')
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
    const res = await queryParamsApp.request('/params?boolean=2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // An abbreviation outside the accepted spellings.
  // 受理される表記に含まれない略語。
  it('boolean rejects "t"', async () => {
    const res = await queryParamsApp.request('/params?boolean=t')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // The word "null" is not a boolean.
  // "null" という単語は真偽値ではない。
  it('boolean rejects "null"', async () => {
    const res = await queryParamsApp.request('/params?boolean=null')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // Leading whitespace is not trimmed.
  // 先頭の空白はトリムされない。
  it('boolean rejects " true"', async () => {
    const res = await queryParamsApp.request(`/params?boolean=${encodeURIComponent(' true')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // Trailing whitespace is not trimmed.
  // 末尾の空白はトリムされない。
  it('boolean rejects "true "', async () => {
    const res = await queryParamsApp.request(`/params?boolean=${encodeURIComponent('true ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean'] })
  })

  // A word that merely starts with "true".
  // "true" で始まるだけの別の単語。
  it('boolean rejects "truthy"', async () => {
    const res = await queryParamsApp.request('/params?boolean=truthy')
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
    const res = await queryParamsApp.request(`/params?email=${encodeURIComponent('a@b')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // No local part.
  // ローカル部がない。
  it('email rejects "@example.com"', async () => {
    const res = await queryParamsApp.request(`/params?email=${encodeURIComponent('@example.com')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // No domain.
  // ドメインがない。
  it('email rejects "user@"', async () => {
    const res = await queryParamsApp.request(`/params?email=${encodeURIComponent('user@')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // A trailing dot.
  // 末尾にドットがある。
  it('email rejects "user@example.com."', async () => {
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('user@example.com.')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // A space in the local part.
  // ローカル部に空白がある。
  it('email rejects "user @example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('user @example.com')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // Two at signs.
  // アットマークが2つある。
  it('email rejects "user@@example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('user@@example.com')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // A non-ASCII domain.
  // ASCII でないドメイン。
  it('email rejects "user@例え.jp"', async () => {
    const res = await queryParamsApp.request(`/params?email=${encodeURIComponent('user@例え.jp')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('uuid rejects "0190b1f400007000800000000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuid=0190b1f400007000800000000000000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // Version 9 does not exist.
  // バージョン 9 は存在しない。
  it('uuid rejects "a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await queryParamsApp.request('/params?uuid=a1b2c3d4-e5f6-9a7b-8c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // Wrapped in braces.
  // 波括弧で囲まれている。
  it('uuid rejects "{0190b1f4-0000-7000-8000-000000000000}"', async () => {
    const res = await queryParamsApp.request(
      `/params?uuid=${encodeURIComponent('{0190b1f4-0000-7000-8000-000000000000}')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // One digit short.
  // 1桁足りない。
  it('uuid rejects "0190b1f4-0000-7000-8000-00000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuid=0190b1f4-0000-7000-8000-00000000000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('uuid rejects "0190b1f4-0000-7000-8000-00000000000g"', async () => {
    const res = await queryParamsApp.request('/params?uuid=0190b1f4-0000-7000-8000-00000000000g')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid'] })
  })

  // A version 7 UUID is not a version 4 one.
  // バージョン 7 の UUID はバージョン 4 ではない。
  it('uuidv4 rejects "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuidv4=0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuidv4'] })
  })

  // A version 4 UUID is not a version 7 one.
  // バージョン 4 の UUID はバージョン 7 ではない。
  it('uuidv7 rejects "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await queryParamsApp.request('/params?uuidv7=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuidv7'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('guid rejects "a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d"', async () => {
    const res = await queryParamsApp.request('/params?guid=a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['guid'] })
  })

  // No scheme.
  // スキームがない。
  it('url rejects "example.com"', async () => {
    const res = await queryParamsApp.request('/params?url=example.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url'] })
  })

  // No host.
  // ホストがない。
  it('url rejects "https://"', async () => {
    const res = await queryParamsApp.request(`/params?url=${encodeURIComponent('https://')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url'] })
  })

  // A relative reference.
  // 相対参照である。
  it('url rejects "/path"', async () => {
    const res = await queryParamsApp.request(`/params?url=${encodeURIComponent('/path')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url'] })
  })

  // No scheme.
  // スキームがない。
  it('uri rejects "example.com"', async () => {
    const res = await queryParamsApp.request('/params?uri=example.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uri'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl rejects "ftp://example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl=${encodeURIComponent('ftp://example.com')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl rejects "mailto:a@b.c"', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl=${encodeURIComponent('mailto:a@b.c')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl'] })
  })

  // A label that starts with a hyphen.
  // ラベルがハイフンで始まっている。
  it('hostname rejects "-bad.com"', async () => {
    const res = await queryParamsApp.request('/params?hostname=-bad.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // An underscore.
  // アンダースコアを含む。
  it('hostname rejects "exa_mple.com"', async () => {
    const res = await queryParamsApp.request('/params?hostname=exa_mple.com')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // A label longer than 63 octets.
  // ラベルが 63 オクテットを超えている。
  it('hostname rejects "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com"', async () => {
    const res = await queryParamsApp.request(
      '/params?hostname=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // Non-ASCII, not punycode.
  // Punycode でない非 ASCII 文字。
  it('hostname rejects "例え.jp"', async () => {
    const res = await queryParamsApp.request(`/params?hostname=${encodeURIComponent('例え.jp')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname'] })
  })

  // A 0x prefix.
  // 0x 接頭辞が付いている。
  it('hex rejects "0x1f"', async () => {
    const res = await queryParamsApp.request('/params?hex=0x1f')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hex'] })
  })

  // Not hexadecimal.
  // 16進数ではない。
  it('hex rejects "xyz"', async () => {
    const res = await queryParamsApp.request('/params?hex=xyz')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hex'] })
  })

  // A letter.
  // 英字である。
  it('emoji rejects "a"', async () => {
    const res = await queryParamsApp.request('/params?emoji=a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji'] })
  })

  // A digit.
  // 数字である。
  it('emoji rejects "1"', async () => {
    const res = await queryParamsApp.request('/params?emoji=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji'] })
  })

  // An emoji followed by a letter.
  // 絵文字の後ろに英字が続く。
  it('emoji rejects "🔥a"', async () => {
    const res = await queryParamsApp.request(`/params?emoji=${encodeURIComponent('🔥a')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji'] })
  })

  // Missing padding.
  // パディングが欠けている。
  it('base64 rejects "aGVsbG8"', async () => {
    const res = await queryParamsApp.request('/params?base64=aGVsbG8')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64'] })
  })

  // The base64url alphabet.
  // base64url の文字を使っている。
  it('base64 rejects "a-b_"', async () => {
    const res = await queryParamsApp.request('/params?base64=a-b_')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64'] })
  })

  // Outside the alphabet.
  // 使用できない文字である。
  it('base64 rejects "!!!!"', async () => {
    const res = await queryParamsApp.request('/params?base64=!!!!')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64'] })
  })

  // Padding is not allowed.
  // パディングは許可されない。
  it('base64url rejects "aGVsbG8="', async () => {
    const res = await queryParamsApp.request(`/params?base64url=${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64url'] })
  })

  // The base64 alphabet.
  // base64 の文字を使っている。
  it('base64url rejects "a+b/"', async () => {
    const res = await queryParamsApp.request(`/params?base64url=${encodeURIComponent('a+b/')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64url'] })
  })

  // Too short.
  // 短すぎる。
  it('nanoid rejects "short"', async () => {
    const res = await queryParamsApp.request('/params?nanoid=short')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid'] })
  })

  // One character too long.
  // 1文字長い。
  it('nanoid rejects "V1StGXR8_Z5jdHi6B-myT1"', async () => {
    const res = await queryParamsApp.request('/params?nanoid=V1StGXR8_Z5jdHi6B-myT1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('nanoid rejects "V1StGXR8_Z5jdHi6B!myT"', async () => {
    const res = await queryParamsApp.request('/params?nanoid=V1StGXR8_Z5jdHi6B!myT')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid'] })
  })

  // Upper case.
  // 大文字を含む。
  it('cuid2 rejects "Tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await queryParamsApp.request('/params?cuid2=Tz4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cuid2'] })
  })

  // A hyphen.
  // ハイフンを含む。
  it('cuid2 rejects "tz4a98-xat96iws9zmbrgj3a"', async () => {
    const res = await queryParamsApp.request('/params?cuid2=tz4a98-xat96iws9zmbrgj3a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cuid2'] })
  })

  // One character short.
  // 1文字足りない。
  it('ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FA"', async () => {
    const res = await queryParamsApp.request('/params?ulid=01ARZ3NDEKTSV4RRFFQ69G5FA')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ulid'] })
  })

  // Crockford base32 leaves out the letter U.
  // Crockford base32 は文字 U を含まない。
  it('ulid rejects "01ARZ3NDEKTSV4RRFFQ69G5FAU"', async () => {
    const res = await queryParamsApp.request('/params?ulid=01ARZ3NDEKTSV4RRFFQ69G5FAU')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ulid'] })
  })

  // An octet past 255.
  // オクテットが 255 を超えている。
  it('ipv4 rejects "256.0.0.1"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=256.0.0.1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // Three octets.
  // オクテットが3つしかない。
  it('ipv4 rejects "1.2.3"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=1.2.3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // Five octets.
  // オクテットが5つある。
  it('ipv4 rejects "1.2.3.4.5"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=1.2.3.4.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // A leading zero.
  // 先頭にゼロがある。
  it('ipv4 rejects "01.2.3.4"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=01.2.3.4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // An IPv6 address.
  // IPv6 アドレスである。
  it('ipv4 rejects "::1"', async () => {
    const res = await queryParamsApp.request(`/params?ipv4=${encodeURIComponent('::1')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4'] })
  })

  // A group that is not hexadecimal.
  // 16進数でないグループを含む。
  it('ipv6 rejects "2001:db8::g"', async () => {
    const res = await queryParamsApp.request(`/params?ipv6=${encodeURIComponent('2001:db8::g')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6'] })
  })

  // An IPv4 address.
  // IPv4 アドレスである。
  it('ipv6 rejects "1.2.3.4"', async () => {
    const res = await queryParamsApp.request('/params?ipv6=1.2.3.4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6'] })
  })

  // Wrapped in brackets, as in a URL.
  // URL のように角括弧で囲まれている。
  it('ipv6 rejects "[::1]"', async () => {
    const res = await queryParamsApp.request(`/params?ipv6=${encodeURIComponent('[::1]')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv4 rejects "192.168.0.0"', async () => {
    const res = await queryParamsApp.request('/params?cidrv4=192.168.0.0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv4'] })
  })

  // A prefix past 32.
  // プレフィックス長が 32 を超えている。
  it('cidrv4 rejects "192.168.0.0/33"', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv4=${encodeURIComponent('192.168.0.0/33')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv4'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv6 rejects "2001:db8::"', async () => {
    const res = await queryParamsApp.request(`/params?cidrv6=${encodeURIComponent('2001:db8::')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv6'] })
  })

  // A prefix past 128.
  // プレフィックス長が 128 を超えている。
  it('cidrv6 rejects "2001:db8::/129"', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv6=${encodeURIComponent('2001:db8::/129')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv6'] })
  })

  // 29 February of a year that is not a leap year.
  // うるう年でない年の 2月29日。
  it('date rejects "2021-02-29"', async () => {
    const res = await queryParamsApp.request('/params?date=2021-02-29')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Month 13.
  // 13 月。
  it('date rejects "2020-13-01"', async () => {
    const res = await queryParamsApp.request('/params?date=2020-13-01')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // 31 April.
  // 4月31日。
  it('date rejects "2020-04-31"', async () => {
    const res = await queryParamsApp.request('/params?date=2020-04-31')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('date rejects "2020-1-2"', async () => {
    const res = await queryParamsApp.request('/params?date=2020-1-2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // The basic format, with no hyphens.
  // ハイフンのない基本形式。
  it('date rejects "20200102"', async () => {
    const res = await queryParamsApp.request('/params?date=20200102')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Slashes.
  // スラッシュ区切り。
  it('date rejects "2020/01/02"', async () => {
    const res = await queryParamsApp.request(`/params?date=${encodeURIComponent('2020/01/02')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // A date-time is not a date.
  // 日時は日付ではない。
  it('date rejects "2020-01-02T00:00:00Z"', async () => {
    const res = await queryParamsApp.request(
      `/params?date=${encodeURIComponent('2020-01-02T00:00:00Z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date'] })
  })

  // Hour 24.
  // 24 時。
  it('time rejects "24:00:00"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('24:00:00')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // A leap second.
  // うるう秒。
  it('time rejects "23:59:60"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('23:59:60')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // Not zero-padded.
  // ゼロ埋めされていない。
  it('time rejects "1:02:03"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('1:02:03')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time'] })
  })

  // No zone designator.
  // タイムゾーン指定子がない。
  it('datetime rejects "2020-01-02T03:04:05"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-01-02T03:04:05')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // A date is not a date-time.
  // 日付は日時ではない。
  it('datetime rejects "2020-01-02"', async () => {
    const res = await queryParamsApp.request('/params?datetime=2020-01-02')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // A space instead of T.
  // T の代わりに空白を使っている。
  it('datetime rejects "2020-01-02 03:04:05Z"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-01-02 03:04:05Z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // Lower-case designators.
  // 指定子が小文字である。
  it('datetime rejects "2020-01-02t03:04:05z"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-01-02t03:04:05z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // 30 February.
  // 2月30日。
  it('datetime rejects "2020-02-30T00:00:00Z"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-02-30T00:00:00Z')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime'] })
  })

  // No component.
  // 要素がない。
  it('duration rejects "P"', async () => {
    const res = await queryParamsApp.request('/params?duration=P')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // No time component after T.
  // T の後に時刻要素がない。
  it('duration rejects "PT"', async () => {
    const res = await queryParamsApp.request('/params?duration=PT')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // No P designator.
  // P 指定子がない。
  it('duration rejects "1Y"', async () => {
    const res = await queryParamsApp.request('/params?duration=1Y')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // Negative.
  // 負の期間。
  it('duration rejects "-P1D"', async () => {
    const res = await queryParamsApp.request('/params?duration=-P1D')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // A fractional day.
  // 小数の日数。
  it('duration rejects "P1.5D"', async () => {
    const res = await queryParamsApp.request('/params?duration=P1.5D')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // Weeks mixed with other units.
  // 週を他の単位と混在させている。
  it('duration rejects "P1M1W"', async () => {
    const res = await queryParamsApp.request('/params?duration=P1M1W')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration'] })
  })

  // Hyphen separators.
  // ハイフン区切り。
  it('mac rejects "00-1a-2b-3c-4d-5e"', async () => {
    const res = await queryParamsApp.request('/params?mac=00-1a-2b-3c-4d-5e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // No separators.
  // 区切り文字がない。
  it('mac rejects "001a2b3c4d5e"', async () => {
    const res = await queryParamsApp.request('/params?mac=001a2b3c4d5e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // Dotted triples.
  // ドット区切りの3グループ表記。
  it('mac rejects "001a.2b3c.4d5e"', async () => {
    const res = await queryParamsApp.request('/params?mac=001a.2b3c.4d5e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // Five octets.
  // オクテットが5つしかない。
  it('mac rejects "00:1a:2b:3c:4d"', async () => {
    const res = await queryParamsApp.request(`/params?mac=${encodeURIComponent('00:1a:2b:3c:4d')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // A digit that is not hexadecimal.
  // 16進数でない文字を含む。
  it('mac rejects "00:1a:2b:3c:4d:5g"', async () => {
    const res = await queryParamsApp.request(
      `/params?mac=${encodeURIComponent('00:1a:2b:3c:4d:5g')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac'] })
  })

  // No plus sign.
  // プラス記号がない。
  it('e164 rejects "14155552671"', async () => {
    const res = await queryParamsApp.request('/params?e164=14155552671')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // A country code that starts with 0.
  // 国番号が 0 で始まっている。
  it('e164 rejects "+0123456789"', async () => {
    const res = await queryParamsApp.request(`/params?e164=${encodeURIComponent('+0123456789')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // Too short.
  // 短すぎる。
  it('e164 rejects "+1"', async () => {
    const res = await queryParamsApp.request(`/params?e164=${encodeURIComponent('+1')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // Past 15 digits.
  // 15桁を超えている。
  it('e164 rejects "+1234567890123456"', async () => {
    const res = await queryParamsApp.request(
      `/params?e164=${encodeURIComponent('+1234567890123456')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // A letter.
  // 英字を含む。
  it('e164 rejects "+1415555267a"', async () => {
    const res = await queryParamsApp.request(`/params?e164=${encodeURIComponent('+1415555267a')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // Fails the Luhn check.
  // Luhn チェックに失敗する。
  it('creditcard rejects "4111111111111112"', async () => {
    const res = await queryParamsApp.request('/params?creditcard=4111111111111112')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['creditcard'] })
  })

  // Too short.
  // 短すぎる。
  it('creditcard rejects "1234"', async () => {
    const res = await queryParamsApp.request('/params?creditcard=1234')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['creditcard'] })
  })

  // Fails the checksum.
  // チェックサムが一致しない。
  it('iban rejects "DE89370400440532013001"', async () => {
    const res = await queryParamsApp.request('/params?iban=DE89370400440532013001')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // Lower case.
  // 小文字である。
  it('iban rejects "de89370400440532013000"', async () => {
    const res = await queryParamsApp.request('/params?iban=de89370400440532013000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // The printed form, with spaces.
  // 空白入りの印字形式。
  it('iban rejects "DE89 3704 0044 0532 0130 00"', async () => {
    const res = await queryParamsApp.request(
      `/params?iban=${encodeURIComponent('DE89 3704 0044 0532 0130 00')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // Too short.
  // 短すぎる。
  it('iban rejects "XX00"', async () => {
    const res = await queryParamsApp.request('/params?iban=XX00')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban'] })
  })

  // Lower case.
  // 小文字である。
  it('currencycode rejects "usd"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=usd')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // Not an ISO 4217 code.
  // ISO 4217 に存在しないコード。
  it('currencycode rejects "ZZZ"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=ZZZ')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // Two letters.
  // 2文字しかない。
  it('currencycode rejects "US"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=US')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // Four letters.
  // 4文字ある。
  it('currencycode rejects "USDD"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=USDD')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // A numeric code.
  // 数字のコード。
  it('currencycode rejects "999"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=999')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode'] })
  })

  // One character short.
  // 1文字足りない。
  it('ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT"', async () => {
    const res = await queryParamsApp.request('/params?ksuid=0ujsszwN8NRY24YaXiTIE2VWDT')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ksuid'] })
  })

  // Outside the alphabet.
  // 使用できない文字を含む。
  it('ksuid rejects "0ujsszwN8NRY24YaXiTIE2VWDT!"', async () => {
    const res = await queryParamsApp.request('/params?ksuid=0ujsszwN8NRY24YaXiTIE2VWDT!')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ksuid'] })
  })

  // One character short.
  // 1文字足りない。
  it('xid rejects "9m4e2mr0ui3e8a215n4"', async () => {
    const res = await queryParamsApp.request('/params?xid=9m4e2mr0ui3e8a215n4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['xid'] })
  })

  // The letter z is not in base32hex.
  // 文字 z は base32hex に含まれない。
  it('xid rejects "9m4e2mr0ui3e8a215n4z"', async () => {
    const res = await queryParamsApp.request('/params?xid=9m4e2mr0ui3e8a215n4z')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['xid'] })
  })
})

// The wrapping must not lose the coercion, the format or the range. The issue path ends in
// the index of the failing element, 1.
// 配列に包む過程で、coerce・フォーマット・範囲のいずれも失われてはならない。issue のパスは、
// 失敗した要素のインデックス 1 で終わる。
describe('array elements: rejected values', () => {
  // A word is not a number.
  // 単語は number ではない。
  it('integer_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('int32_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32_arr.1'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('int64_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=not-a-value',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_arr.1'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('bigint_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?bigint_arr=9007199254740993&bigint_arr=not-a-value',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bigint_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('uint32_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32_arr.1'] })
  })

  // A word is not a bigint.
  // 単語は bigint ではない。
  it('uint64_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uint64_arr=18446744073709551615&uint64_arr=not-a-value',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('number_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float_arr=1.5&float_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float32_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('float64_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float64_arr=1.5&float64_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('double_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?double_arr=1.5&double_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['double_arr.1'] })
  })

  // A word is not a number.
  // 単語は number ではない。
  it('numpassword_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?numpassword_arr=1.5&numpassword_arr=not-a-value',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numpassword_arr.1'] })
  })

  // A word is not a boolean.
  // 単語は boolean ではない。
  it('boolean_arr rejects "not-a-value" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=not-a-value')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })

  // A fraction is not an integer.
  // 小数は整数ではない。
  it('integer_arr rejects "1.5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // Past MAX_SAFE_INTEGER a double would round to a different number, so the value is refused.
  // MAX_SAFE_INTEGER を超えると double は別の数値に丸めてしまうため、拒否される。
  it('integer_arr rejects "9007199254740993" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // Past MIN_SAFE_INTEGER, for the same reason.
  // MIN_SAFE_INTEGER を下回る値も同じ理由で拒否される。
  it('integer_arr rejects "-9007199254740993" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=-9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('integer_arr rejects "Infinity" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // Negative infinity is not finite.
  // -Infinity は有限の数ではない。
  it('integer_arr rejects "-Infinity" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=-Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('integer_arr rejects "NaN" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // A thousands separator is not part of a number.
  // 桁区切りのカンマは数値の一部ではない。
  it('integer_arr rejects "1,000" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?integer_arr=${encodeURIComponent('42')}&integer_arr=${encodeURIComponent('1,000')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // The JavaScript numeric separator is source syntax, not a value.
  // JavaScript の数値セパレータはソース上の記法であり、値ではない。
  it('integer_arr rejects "1_000" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=1_000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // A full-width digit is not an ASCII digit.
  // 全角数字は ASCII の数字ではない。
  it('integer_arr rejects "９" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?integer_arr=${encodeURIComponent('42')}&integer_arr=${encodeURIComponent('９')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // The word "null" is not a number.
  // "null" という単語は数値ではない。
  it('integer_arr rejects "null" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=null')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // A boolean is not a number.
  // 真偽値は数値ではない。
  it('integer_arr rejects "true" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=true')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // Digits followed by text are not a number.
  // 数字の後ろに文字が続く値は数値ではない。
  it('integer_arr rejects "12abc" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=12abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // One past the int32 maximum.
  // int32 の最大値を 1 超える。
  it('int32_arr rejects "2147483648" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=2147483648')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32_arr.1'] })
  })

  // One past the int32 minimum.
  // int32 の最小値を 1 下回る。
  it('int32_arr rejects "-2147483649" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=-2147483649')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32_arr.1'] })
  })

  // A fraction is not an int32.
  // 小数は int32 ではない。
  it('int32_arr rejects "1.5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int32_arr.1'] })
  })

  // One past the uint32 maximum.
  // uint32 の最大値を 1 超える。
  it('uint32_arr rejects "4294967296" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=4294967296')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32_arr.1'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint32_arr rejects "-1" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32_arr.1'] })
  })

  // A fraction is not a uint32.
  // 小数は uint32 ではない。
  it('uint32_arr rejects "1.5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint32_arr.1'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('int64_arr rejects "9223372036854775808" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=9223372036854775808',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_arr.1'] })
  })

  // One past the int64 minimum.
  // int64 の最小値を 1 下回る。
  it('int64_arr rejects "-9223372036854775809" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=-9223372036854775809',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_arr.1'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('int64_arr rejects "1.5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int64_arr=9007199254740993&int64_arr=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_arr.1'] })
  })

  // The JavaScript bigint suffix is source syntax, not a value.
  // JavaScript の bigint 接尾辞はソース上の記法であり、値ではない。
  it('int64_arr rejects "1n" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int64_arr=9007199254740993&int64_arr=1n')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_arr.1'] })
  })

  // One past the uint64 maximum.
  // uint64 の最大値を 1 超える。
  it('uint64_arr rejects "18446744073709551616" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uint64_arr=18446744073709551615&uint64_arr=18446744073709551616',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64_arr.1'] })
  })

  // An unsigned integer cannot be negative.
  // 符号なし整数は負の値を取れない。
  it('uint64_arr rejects "-1" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uint64_arr=18446744073709551615&uint64_arr=-1',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64_arr.1'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('uint64_arr rejects "1.5" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uint64_arr=18446744073709551615&uint64_arr=1.5',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uint64_arr.1'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('number_arr rejects "Infinity" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number_arr.1'] })
  })

  // NaN is not a number.
  // NaN は数値ではない。
  it('number_arr rejects "NaN" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number_arr.1'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('number_arr rejects "1e400" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=1e400')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number_arr.1'] })
  })

  // A decimal comma is not a decimal point.
  // 小数点としてのカンマは認められない。
  it('number_arr rejects "1,5" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?number_arr=${encodeURIComponent('1.5')}&number_arr=${encodeURIComponent('1,5')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number_arr.1'] })
  })

  // Two decimal points.
  // 小数点が2つある。
  it('number_arr rejects "1.5.5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=1.5.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number_arr.1'] })
  })

  // Past the float32 maximum; format: float is a float32.
  // float32 の最大値を超える。format: float は float32 である。
  it('float_arr rejects "3.5e38" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float_arr=1.5&float_arr=3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float_arr.1'] })
  })

  // Past the float32 maximum.
  // float32 の最大値を超える。
  it('float32_arr rejects "3.5e38" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32_arr.1'] })
  })

  // Past the float32 minimum.
  // float32 の最小値を下回る。
  it('float32_arr rejects "-3.5e38" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=-3.5e38')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float32_arr.1'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('float64_arr rejects "1e309" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float64_arr=1.5&float64_arr=1e309')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64_arr.1'] })
  })

  // Infinity is not finite.
  // Infinity は有限の数ではない。
  it('float64_arr rejects "Infinity" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float64_arr=1.5&float64_arr=Infinity')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['float64_arr.1'] })
  })

  // Overflows a double to Infinity.
  // double の範囲を超え、Infinity になる。
  it('double_arr rejects "1e309" as its second element', async () => {
    const res = await queryParamsApp.request('/params?double_arr=1.5&double_arr=1e309')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['double_arr.1'] })
  })

  // format: password does not loosen the number check.
  // format: password を付けても、数値の検証は緩まない。
  it('numpassword_arr rejects "NaN" as its second element', async () => {
    const res = await queryParamsApp.request('/params?numpassword_arr=1.5&numpassword_arr=NaN')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numpassword_arr.1'] })
  })

  // A number that is neither 0 nor 1.
  // 0 でも 1 でもない数値。
  it('boolean_arr rejects "2" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })

  // An abbreviation outside the accepted spellings.
  // 受理される表記に含まれない略語。
  it('boolean_arr rejects "t" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=t')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })

  // The word "null" is not a boolean.
  // "null" という単語は真偽値ではない。
  it('boolean_arr rejects "null" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=null')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })

  // Leading whitespace is not trimmed.
  // 先頭の空白はトリムされない。
  it('boolean_arr rejects " true" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?boolean_arr=${encodeURIComponent('true')}&boolean_arr=${encodeURIComponent(' true')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })

  // Trailing whitespace is not trimmed.
  // 末尾の空白はトリムされない。
  it('boolean_arr rejects "true " as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?boolean_arr=${encodeURIComponent('true')}&boolean_arr=${encodeURIComponent('true ')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })

  // A word that merely starts with "true".
  // "true" で始まるだけの別の単語。
  it('boolean_arr rejects "truthy" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=truthy')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['boolean_arr.1'] })
  })
})

// One value each format rejects, inside an array: the format check applies to every element.
// 各フォーマットが拒否する値を1つずつ、配列の中で検証する。
// フォーマット検証はすべての要素に適用される。
describe('array elements: string formats', () => {
  // No top-level domain.
  // トップレベルドメインがない。
  it('email_arr rejects "a@b" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?email_arr=${encodeURIComponent('user@example.com')}&email_arr=${encodeURIComponent('a@b')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['email_arr.1'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('uuid_arr rejects "0190b1f400007000800000000000000" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uuid_arr=0190b1f4-0000-7000-8000-000000000000&uuid_arr=0190b1f400007000800000000000000',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid_arr.1'] })
  })

  // A version 7 UUID is not a version 4 one.
  // バージョン 7 の UUID はバージョン 4 ではない。
  it('uuidv4_arr rejects "0190b1f4-0000-7000-8000-000000000000" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uuidv4_arr=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d&uuidv4_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuidv4_arr.1'] })
  })

  // A version 4 UUID is not a version 7 one.
  // バージョン 4 の UUID はバージョン 7 ではない。
  it('uuidv7_arr rejects "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uuidv7_arr=0190b1f4-0000-7000-8000-000000000000&uuidv7_arr=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuidv7_arr.1'] })
  })

  // No hyphens.
  // ハイフンがない。
  it('guid_arr rejects "a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?guid_arr=0190b1f4-0000-7000-8000-000000000000&guid_arr=a1b2c3d4e5f69a7b0c9d0e1f2a3b4c5d',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['guid_arr.1'] })
  })

  // No scheme.
  // スキームがない。
  it('url_arr rejects "example.com" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?url_arr=${encodeURIComponent('https://example.com')}&url_arr=${encodeURIComponent('example.com')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['url_arr.1'] })
  })

  // No scheme.
  // スキームがない。
  it('uri_arr rejects "example.com" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?uri_arr=${encodeURIComponent('https://example.com')}&uri_arr=${encodeURIComponent('example.com')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uri_arr.1'] })
  })

  // The scheme is not http or https.
  // スキームが http でも https でもない。
  it('httpurl_arr rejects "ftp://example.com" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl_arr=${encodeURIComponent('https://example.com')}&httpurl_arr=${encodeURIComponent('ftp://example.com')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl_arr.1'] })
  })

  // A label that starts with a hyphen.
  // ラベルがハイフンで始まっている。
  it('hostname_arr rejects "-bad.com" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?hostname_arr=example.com&hostname_arr=-bad.com',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hostname_arr.1'] })
  })

  // A 0x prefix.
  // 0x 接頭辞が付いている。
  it('hex_arr rejects "0x1f" as its second element', async () => {
    const res = await queryParamsApp.request('/params?hex_arr=deadbeef&hex_arr=0x1f')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['hex_arr.1'] })
  })

  // A letter.
  // 英字である。
  it('emoji_arr rejects "a" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?emoji_arr=${encodeURIComponent('🔥')}&emoji_arr=${encodeURIComponent('a')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['emoji_arr.1'] })
  })

  // Missing padding.
  // パディングが欠けている。
  it('base64_arr rejects "aGVsbG8" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?base64_arr=${encodeURIComponent('aGVsbG8=')}&base64_arr=${encodeURIComponent('aGVsbG8')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64_arr.1'] })
  })

  // Padding is not allowed.
  // パディングは許可されない。
  it('base64url_arr rejects "aGVsbG8=" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?base64url_arr=${encodeURIComponent('aGVsbG8')}&base64url_arr=${encodeURIComponent('aGVsbG8=')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['base64url_arr.1'] })
  })

  // Too short.
  // 短すぎる。
  it('nanoid_arr rejects "short" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?nanoid_arr=V1StGXR8_Z5jdHi6B-myT&nanoid_arr=short',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nanoid_arr.1'] })
  })

  // Upper case.
  // 大文字を含む。
  it('cuid2_arr rejects "Tz4a98xxat96iws9zmbrgj3a" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?cuid2_arr=tz4a98xxat96iws9zmbrgj3a&cuid2_arr=Tz4a98xxat96iws9zmbrgj3a',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cuid2_arr.1'] })
  })

  // One character short.
  // 1文字足りない。
  it('ulid_arr rejects "01ARZ3NDEKTSV4RRFFQ69G5FA" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?ulid_arr=01ARZ3NDEKTSV4RRFFQ69G5FAV&ulid_arr=01ARZ3NDEKTSV4RRFFQ69G5FA',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ulid_arr.1'] })
  })

  // An octet past 255.
  // オクテットが 255 を超えている。
  it('ipv4_arr rejects "256.0.0.1" as its second element', async () => {
    const res = await queryParamsApp.request('/params?ipv4_arr=192.168.0.1&ipv4_arr=256.0.0.1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv4_arr.1'] })
  })

  // A group that is not hexadecimal.
  // 16進数でないグループを含む。
  it('ipv6_arr rejects "2001:db8::g" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?ipv6_arr=${encodeURIComponent('2001:db8::1')}&ipv6_arr=${encodeURIComponent('2001:db8::g')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ipv6_arr.1'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv4_arr rejects "192.168.0.0" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv4_arr=${encodeURIComponent('192.168.0.0/24')}&cidrv4_arr=${encodeURIComponent('192.168.0.0')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv4_arr.1'] })
  })

  // No prefix length.
  // プレフィックス長がない。
  it('cidrv6_arr rejects "2001:db8::" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv6_arr=${encodeURIComponent('2001:db8::/32')}&cidrv6_arr=${encodeURIComponent('2001:db8::')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['cidrv6_arr.1'] })
  })

  // 29 February of a year that is not a leap year.
  // うるう年でない年の 2月29日。
  it('date_arr rejects "2021-02-29" as its second element', async () => {
    const res = await queryParamsApp.request('/params?date_arr=2020-01-02&date_arr=2021-02-29')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['date_arr.1'] })
  })

  // Hour 24.
  // 24 時。
  it('time_arr rejects "24:00:00" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?time_arr=${encodeURIComponent('12:34:56')}&time_arr=${encodeURIComponent('24:00:00')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['time_arr.1'] })
  })

  // No zone designator.
  // タイムゾーン指定子がない。
  it('datetime_arr rejects "2020-01-02T03:04:05" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime_arr=${encodeURIComponent('2020-01-02T03:04:05Z')}&datetime_arr=${encodeURIComponent('2020-01-02T03:04:05')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['datetime_arr.1'] })
  })

  // No component.
  // 要素がない。
  it('duration_arr rejects "P" as its second element', async () => {
    const res = await queryParamsApp.request('/params?duration_arr=P1Y2M3DT4H5M6S&duration_arr=P')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['duration_arr.1'] })
  })

  // Hyphen separators.
  // ハイフン区切り。
  it('mac_arr rejects "00-1a-2b-3c-4d-5e" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?mac_arr=${encodeURIComponent('00:1a:2b:3c:4d:5e')}&mac_arr=${encodeURIComponent('00-1a-2b-3c-4d-5e')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mac_arr.1'] })
  })

  // No plus sign.
  // プラス記号がない。
  it('e164_arr rejects "14155552671" as its second element', async () => {
    const res = await queryParamsApp.request(
      `/params?e164_arr=${encodeURIComponent('+14155552671')}&e164_arr=${encodeURIComponent('14155552671')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164_arr.1'] })
  })

  // Fails the Luhn check.
  // Luhn チェックに失敗する。
  it('creditcard_arr rejects "4111111111111112" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?creditcard_arr=4111111111111111&creditcard_arr=4111111111111112',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['creditcard_arr.1'] })
  })

  // Fails the checksum.
  // チェックサムが一致しない。
  it('iban_arr rejects "DE89370400440532013001" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?iban_arr=DE89370400440532013000&iban_arr=DE89370400440532013001',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iban_arr.1'] })
  })

  // Lower case.
  // 小文字である。
  it('currencycode_arr rejects "usd" as its second element', async () => {
    const res = await queryParamsApp.request('/params?currencycode_arr=USD&currencycode_arr=usd')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['currencycode_arr.1'] })
  })

  // One character short.
  // 1文字足りない。
  it('ksuid_arr rejects "0ujsszwN8NRY24YaXiTIE2VWDT" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?ksuid_arr=0ujsszwN8NRY24YaXiTIE2VWDTS&ksuid_arr=0ujsszwN8NRY24YaXiTIE2VWDT',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ksuid_arr.1'] })
  })

  // One character short.
  // 1文字足りない。
  it('xid_arr rejects "9m4e2mr0ui3e8a215n4" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?xid_arr=9m4e2mr0ui3e8a215n4g&xid_arr=9m4e2mr0ui3e8a215n4',
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['xid_arr.1'] })
  })
})

// What an array parameter does beyond what its elements do.
// 配列パラメータが、要素単体の挙動に加えて持つ性質。
describe('arrays', () => {
  // The second of three elements is invalid, so the issue path is integer_arr.1.
  // 3要素のうち2番目が不正なので、issue のパスは integer_arr.1 になる。
  it('reports the index of the element that failed', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=1&integer_arr=x&integer_arr=3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.1'] })
  })

  // The first and the third are invalid; both are reported.
  // 1番目と3番目が不正であり、両方が報告される。
  it('reports every element that failed', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=x&integer_arr=2&integer_arr=y')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.0', 'integer_arr.2'] })
  })

  // A failing array does not hide a failing scalar. Issues come in declaration order.
  // 配列の失敗が、スカラーの失敗を隠すことはない。issue は宣言順に並ぶ。
  it('reports failures across parameters', async () => {
    const res = await queryParamsApp.request('/params?email=x&integer_arr=x&boolean=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer_arr.0', 'boolean', 'email'] })
  })
})

// A transform changes the value before it reaches the handler, so these tests assert the
// value that arrives.
// 変換はハンドラに届く前に値を書き換える。そのため、ここでは届いた値を検証する。
describe('transforms: x-* extensions', () => {
  // The transform runs first and the format check second, on the transformed value: trimmed,
  // this is still not an email.
  // 変換が先、フォーマット検証が後であり、検証は変換後の値に対して行われる。トリムしても、
  // これはメールアドレスではない。
  it('tx_email_trim rejects " not an email "', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_email_trim=${encodeURIComponent(' not an email ')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tx_email_trim'] })
  })

  // Trimmed, and still not a UUID.
  // トリムしても UUID ではない。
  it('tx_uuid_trim rejects " x "', async () => {
    const res = await queryParamsApp.request(`/params?tx_uuid_trim=${encodeURIComponent(' x ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tx_uuid_trim'] })
  })

  // Lower-cased, and still not an email.
  // 小文字化してもメールアドレスではない。
  it('tx_email_lower rejects "NOT-AN-EMAIL"', async () => {
    const res = await queryParamsApp.request('/params?tx_email_lower=NOT-AN-EMAIL')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tx_email_lower'] })
  })

  // Lower-casing does not trim, so the leading space fails the email check.
  // 小文字化はトリムを行わないため、先頭の空白がメールアドレスの検証で失敗する。
  it('tx_email_lower rejects " USER@EXAMPLE.COM"', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_email_lower=${encodeURIComponent(' USER@EXAMPLE.COM')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tx_email_lower'] })
  })
})

// A numeric or boolean enum / const names a typed value, and the wire delivers text: the
// literal used to be matched against the raw string, so every such request was rejected.
// 数値・真偽値の enum / const は型付きの値を指すが、ワイヤが運ぶのは文字列である。
// かつてはリテラルを生の文字列と比較していたため、該当リクエストはすべて拒否されていた。
describe('literals: enum, const and oneOf', () => {
  // Outside the enum.
  // enum に含まれない値。
  it('ienum rejects "4"', async () => {
    const res = await queryParamsApp.request('/literals?ienum=4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum'] })
  })

  // Outside the enum.
  // enum に含まれない値。
  it('ienum rejects "0"', async () => {
    const res = await queryParamsApp.request('/literals?ienum=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum'] })
  })

  // Between two members.
  // 2つのメンバーの中間の値。
  it('ienum rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/literals?ienum=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum'] })
  })

  // Outside the number enum.
  // number の enum に含まれない値。
  it('nenum rejects "3.5"', async () => {
    const res = await queryParamsApp.request('/literals?nenum=3.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nenum'] })
  })

  // Between two members.
  // 2つのメンバーの中間の値。
  it('nenum rejects "2"', async () => {
    const res = await queryParamsApp.request('/literals?nenum=2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nenum'] })
  })

  // The boolean the enum leaves out.
  // enum に含まれていない側の真偽値。
  it('benum rejects "false"', async () => {
    const res = await queryParamsApp.request('/literals?benum=false')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['benum'] })
  })

  // False, spelled as a digit.
  // 数字で表記した false。
  it('benum rejects "0"', async () => {
    const res = await queryParamsApp.request('/literals?benum=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['benum'] })
  })

  // Not the constant.
  // 定数値ではない。
  it('iconst rejects "8"', async () => {
    const res = await queryParamsApp.request('/literals?iconst=8')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['iconst'] })
  })

  // A string enum is case-sensitive.
  // string の enum は大文字小文字を区別する。
  it('senum rejects "ASC"', async () => {
    const res = await queryParamsApp.request('/literals?senum=ASC')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['senum'] })
  })

  // Trailing whitespace makes it a different string.
  // 末尾に空白があると別の文字列になる。
  it('senum rejects "asc "', async () => {
    const res = await queryParamsApp.request(`/literals?senum=${encodeURIComponent('asc ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['senum'] })
  })

  // The empty string is not a member.
  // 空文字列はメンバーではない。
  it('senum rejects ""', async () => {
    const res = await queryParamsApp.request('/literals?senum=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['senum'] })
  })

  // A string const is case-sensitive.
  // string の const は大文字小文字を区別する。
  it('sconst rejects "Fixed"', async () => {
    const res = await queryParamsApp.request('/literals?sconst=Fixed')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['sconst'] })
  })

  // Numerically equal to "02", textually not: nothing coerces a string enum.
  // 数値としては "02" と等しいが、文字列としては異なる。string enum は coerce されない。
  it('numericsenum rejects "2"', async () => {
    const res = await queryParamsApp.request('/literals?numericsenum=2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numericsenum'] })
  })

  // Numerically equal to "1", textually not.
  // 数値としては "1" と等しいが、文字列としては異なる。
  it('numericsenum rejects "01"', async () => {
    const res = await queryParamsApp.request('/literals?numericsenum=01')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['numericsenum'] })
  })

  // Matches neither branch.
  // どちらの分岐にも一致しない。
  it('ioneof rejects "other"', async () => {
    const res = await queryParamsApp.request('/literals?ioneof=other')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ioneof'] })
  })

  // A fraction matches neither branch.
  // 小数はどちらの分岐にも一致しない。
  it('ioneof rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/literals?ioneof=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ioneof'] })
  })

  // The string branch is case-sensitive.
  // string 側は大文字小文字を区別する。
  it('ioneof rejects "ALL"', async () => {
    const res = await queryParamsApp.request('/literals?ioneof=ALL')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ioneof'] })
  })

  // 9 is not a member; the issue points at index 1.
  // 9 はメンバーではない。issue はインデックス 1 を指す。
  it('ienum_arr rejects an element outside the enum', async () => {
    const res = await queryParamsApp.request('/literals?ienum_arr=1&ienum_arr=9')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum_arr.1'] })
  })

  // The first and the third fail; the second is valid.
  // 1番目と3番目が失敗し、2番目は有効である。
  it('ienum_arr reports every element outside the enum', async () => {
    const res = await queryParamsApp.request('/literals?ienum_arr=9&ienum_arr=1&ienum_arr=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum_arr.0', 'ienum_arr.2'] })
  })

  // "up" is not a member; the issue points at index 1.
  // "up" はメンバーではない。issue はインデックス 1 を指す。
  it('senum_arr rejects an element outside the enum', async () => {
    const res = await queryParamsApp.request('/literals?senum_arr=asc&senum_arr=up')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['senum_arr.1'] })
  })

  // A literal is a single value. Repeating the parameter makes it an array on the wire, which
  // no literal matches, even though both values are members.
  // リテラルは単一の値である。パラメータを繰り返すとワイヤ上は配列になり、
  // 両方の値がメンバーであっても、どのリテラルとも一致しない。
  it('rejects a scalar literal sent twice', async () => {
    const res = await queryParamsApp.request('/literals?ienum=2&ienum=3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ienum'] })
  })
})

// /optional declares every parameter without required: true.
// /optional は、すべてのパラメータを required: true なしで宣言している。
describe('optional: absent and present', () => {
  // Optional does not mean unchecked: a value that is sent is validated.
  // 任意であることは無検証を意味しない。送信された値は検証される。
  it('int_opt rejects "x"', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // A fraction is not an integer, optional or not.
  // 任意であっても、小数は整数ではない。
  it('int_opt rejects "1.5"', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // One past the int64 maximum.
  // int64 の最大値を 1 超える。
  it('int64_opt rejects "9223372036854775808"', async () => {
    const res = await queryParamsApp.request('/optional?int64_opt=9223372036854775808')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_opt'] })
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('num_opt rejects "x"', async () => {
    const res = await queryParamsApp.request('/optional?num_opt=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['num_opt'] })
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('bool_opt rejects "maybe"', async () => {
    const res = await queryParamsApp.request('/optional?bool_opt=maybe')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bool_opt'] })
  })

  // Not a UUID.
  // UUID ではない。
  it('uuid_opt rejects "not-a-uuid"', async () => {
    const res = await queryParamsApp.request('/optional?uuid_opt=not-a-uuid')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid_opt'] })
  })

  // The second element is invalid.
  // 2番目の要素が不正である。
  it('arr_opt rejects a bad element at its index', async () => {
    const res = await queryParamsApp.request('/optional?arr_opt=1&arr_opt=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['arr_opt.1'] })
  })

  // Three invalid parameters, three issues, in declaration order.
  // 不正なパラメータが3つあり、issue も3つ、宣言順に報告される。
  it('reports every optional parameter that fails', async () => {
    const res = await queryParamsApp.request('/optional?bool_opt=z&int_opt=x&num_opt=y')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt', 'num_opt', 'bool_opt'] })
  })
})

// /defaults declares every parameter with a default.
// /defaults は、すべてのパラメータをデフォルト値付きで宣言している。
describe('defaults', () => {
  // A default does not rescue an invalid value: it replaces an absent one only.
  // デフォルトは不正な値を救済しない。置き換えるのは省略された場合のみである。
  it('rejects an invalid integer rather than falling back', async () => {
    const res = await queryParamsApp.request('/defaults?int_def=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_def'] })
  })

  // A fraction cannot become a bigint.
  // 小数は bigint に変換できない。
  it('rejects an invalid int64 rather than falling back', async () => {
    const res = await queryParamsApp.request('/defaults?int64_def=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_def'] })
  })

  // Not a boolean spelling.
  // 真偽値の表記ではない。
  it('rejects an invalid boolean rather than falling back', async () => {
    const res = await queryParamsApp.request('/defaults?bool_def=maybe')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bool_def'] })
  })

  // "up" is not a member.
  // "up" はメンバーではない。
  it('rejects a value outside the enum rather than falling back', async () => {
    const res = await queryParamsApp.request('/defaults?enum_def=up')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['enum_def'] })
  })

  // The second element is invalid.
  // 2番目の要素が不正である。
  it('rejects a bad element of a defaulted array', async () => {
    const res = await queryParamsApp.request('/defaults?arr_int_def=1&arr_int_def=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['arr_int_def.1'] })
  })
})

// /required declares id, big, flag, name and tags with required: true, and note without.
// /required は id・big・flag・name・tags を required: true で、
// note を required なしで宣言している。
describe('required', () => {
  // id is left out.
  // id を省略している。
  it('reports a missing required integer', async () => {
    const res = await queryParamsApp.request('/required?big=1&flag=true&name=n&tags=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // big is left out.
  // big を省略している。
  it('reports a missing required int64', async () => {
    const res = await queryParamsApp.request('/required?id=1&flag=true&name=n&tags=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['big'] })
  })

  // flag is left out.
  // flag を省略している。
  it('reports a missing required boolean', async () => {
    const res = await queryParamsApp.request('/required?id=1&big=1&name=n&tags=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['flag'] })
  })

  // name is left out.
  // name を省略している。
  it('reports a missing required string', async () => {
    const res = await queryParamsApp.request('/required?id=1&big=1&flag=true&tags=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['name'] })
  })

  // All five are reported, in declaration order.
  // 5つすべてが宣言順に報告される。
  it('reports every required parameter when none is sent', async () => {
    const res = await queryParamsApp.request('/required')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id', 'big', 'flag', 'name', 'tags'] })
  })

  // Present is not enough: the value has to be valid too.
  // 存在するだけでは不十分で、値も有効でなければならない。
  it('reports a required parameter that is present and invalid', async () => {
    const res = await queryParamsApp.request('/required?id=x&big=1&flag=true&name=n&tags=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })
})

// The name has to survive from the spec to the validated object, character for character.
// 名前は、仕様から検証済みオブジェクトに至るまで、1文字も変わらず保たれなければならない。
describe('names: parameter names that are not identifiers', () => {
  // Each issue carries the name exactly as the spec declares it.
  // 各 issue には、仕様で宣言されたとおりの名前が入る。
  it('reports a failure under the declared name', async () => {
    const res = await queryParamsApp.request('/optional?page-size=x&$top=x&user.id=x&ids[]=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['page-size', '$top', 'user.id', 'ids[].0'] })
  })
})

// A constraint on a numeric parameter applies to the coerced value, not to the text on the
// wire.
// 数値パラメータの制約は、ワイヤ上の文字列ではなく coerce 後の値に適用される。
describe('constraints', () => {
  // One below the minimum.
  // 最小値を 1 下回る。
  it('range rejects "0"', async () => {
    const res = await queryParamsApp.request('/limits?range=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['range'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('range rejects "101"', async () => {
    const res = await queryParamsApp.request('/limits?range=101')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['range'] })
  })

  // In range, and not an integer.
  // 範囲内だが整数ではない。
  it('range rejects "5.5"', async () => {
    const res = await queryParamsApp.request('/limits?range=5.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['range'] })
  })

  // The exclusive minimum itself.
  // exclusiveMinimum の値そのもの。
  it('exclusive rejects "0"', async () => {
    const res = await queryParamsApp.request('/limits?exclusive=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['exclusive'] })
  })

  // The exclusive maximum itself.
  // exclusiveMaximum の値そのもの。
  it('exclusive rejects "1"', async () => {
    const res = await queryParamsApp.request('/limits?exclusive=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['exclusive'] })
  })

  // Not a multiple of 5.
  // 5 の倍数ではない。
  it('multiple rejects "7"', async () => {
    const res = await queryParamsApp.request('/limits?multiple=7')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['multiple'] })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('int64range rejects "0"', async () => {
    const res = await queryParamsApp.request('/limits?int64range=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64range'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('int64range rejects "101"', async () => {
    const res = await queryParamsApp.request('/limits?int64range=101')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64range'] })
  })

  // One below minLength.
  // minLength を 1 下回る。
  it('length rejects "a"', async () => {
    const res = await queryParamsApp.request('/limits?length=a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['length'] })
  })

  // One above maxLength.
  // maxLength を 1 超える。
  it('length rejects "abcde"', async () => {
    const res = await queryParamsApp.request('/limits?length=abcde')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['length'] })
  })

  // The empty string is below minLength.
  // 空文字列は minLength を下回る。
  it('length rejects ""', async () => {
    const res = await queryParamsApp.request('/limits?length=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['length'] })
  })

  // Upper case.
  // 大文字である。
  it('pattern rejects "ABC-1"', async () => {
    const res = await queryParamsApp.request('/limits?pattern=ABC-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // Four digits where three are allowed.
  // 3桁までのところに4桁ある。
  it('pattern rejects "abc-1234"', async () => {
    const res = await queryParamsApp.request('/limits?pattern=abc-1234')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // The empty string does not match.
  // 空文字列は一致しない。
  it('pattern rejects ""', async () => {
    const res = await queryParamsApp.request('/limits?pattern=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // A trailing line feed: $ must not match before it.
  // 末尾の改行。$ はその直前に一致してはならない。
  it('pattern rejects "abc-1\\n"', async () => {
    const res = await queryParamsApp.request(`/limits?pattern=${encodeURIComponent('abc-1\n')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pattern'] })
  })

  // One below minItems. Too few is a failure of the array itself, so the issue path is the name
  // with no index.
  // minItems を 1 下回る。要素数の不足は配列そのものの失敗なので、
  // issue のパスはインデックスなしの名前になる。
  it('items rejects one element', async () => {
    const res = await queryParamsApp.request('/limits?items=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['items'] })
  })

  // One above maxItems.
  // maxItems を 1 超える。
  it('items rejects four elements', async () => {
    const res = await queryParamsApp.request('/limits?items=1&items=2&items=3&items=4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['items'] })
  })

  // The count is fine; the second element is not an integer.
  // 要素数は問題ないが、2番目の要素が整数ではない。
  it('items rejects a bad element at its index', async () => {
    const res = await queryParamsApp.request('/limits?items=1&items=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['items.1'] })
  })

  // The issue points at the second occurrence.
  // issue は2回目の出現位置を指す。
  it('unique rejects a duplicate', async () => {
    const res = await queryParamsApp.request('/limits?unique=1&unique=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['unique.1'] })
  })

  // uniqueItems compares the coerced values: "1" and "01" are the same integer.
  // uniqueItems は coerce 後の値を比較する。"1" と "01" は同じ整数である。
  it('unique rejects a duplicate spelled differently', async () => {
    const res = await queryParamsApp.request('/limits?unique=1&unique=01')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['unique.1'] })
  })

  // The first and the third are equal; the issue points at the third.
  // 1番目と3番目が等しい。issue は3番目を指す。
  it('unique rejects a duplicate that is not adjacent', async () => {
    const res = await queryParamsApp.request('/limits?unique=1&unique=2&unique=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['unique.2'] })
  })

  // The constraint is on the element, so the issue carries its index.
  // 制約は要素に対するものなので、issue にはインデックスが付く。
  it('ranged_items rejects one element past the maximum', async () => {
    const res = await queryParamsApp.request('/limits?ranged_items=1&ranged_items=10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ranged_items.1'] })
  })

  // 0 is below the minimum and 10 above the maximum.
  // 0 は最小値を下回り、10 は最大値を超える。
  it('ranged_items reports both elements out of range', async () => {
    const res = await queryParamsApp.request('/limits?ranged_items=0&ranged_items=10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ranged_items.0', 'ranged_items.1'] })
  })
})

// The query string is sent exactly as written in each test, because the wire format itself is
// the subject.
// ワイヤ形式そのものが検証対象のため、各テストではクエリ文字列を書かれたとおりに送信する。
describe('wire: encoding, separators and repetition', () => {
  // Sent unencoded, the "+" of the number becomes a space and the value is no longer E.164. The
  // client has to encode it.
  // エンコードせずに送信すると、番号の "+" は空白になり、値は E.164 ではなくなる。
  // クライアント側でエンコードする必要がある。
  it('reads an unencoded plus sign as a space, which e164 rejects', async () => {
    const res = await queryParamsApp.request('/params?e164=+14155552671')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['e164'] })
  })

  // ";" is not a separator: "1;num_opt=2" is the whole value of int_opt, which an integer
  // rejects.
  // ";" は区切り文字ではない。"1;num_opt=2" 全体が int_opt の値となり、
  // integer として拒否される。
  it('does not split on a semicolon', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1;num_opt=2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // A scalar sent twice is an array on the wire, and a scalar schema rejects an array. It does
  // not quietly keep the first or the last.
  // スカラーを2回送るとワイヤ上は配列になり、スカラースキーマは配列を拒否する。
  // 先頭や末尾の値を黙って採用することはない。
  it('rejects a scalar integer sent twice', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1&int_opt=2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // The same holds for a string.
  // string でも同様である。
  it('rejects a scalar string sent twice', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a&str_opt=b')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['str_opt'] })
  })

  // The same holds for a boolean.
  // boolean でも同様である。
  it('rejects a scalar boolean sent twice', async () => {
    const res = await queryParamsApp.request('/optional?bool_opt=true&bool_opt=false')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bool_opt'] })
  })

  // Even two identical values are an array.
  // 同じ値を2回送った場合でも、配列になる。
  it('rejects a scalar sent twice with the same value', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1&int_opt=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // /optional declares GET only.
  // /optional が宣言しているのは GET だけである。
  it('answers 404 to a method the spec does not declare', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1', { method: 'POST' })
    expect(res.status).toBe(404)
  })

  // Hono answers HEAD through the GET route, so the parameter is validated the same way: an
  // invalid one is rejected.
  // Hono は HEAD を GET のルートで処理するため、パラメータは同じように検証される。
  // 不正な値は拒否される。
  it('rejects an invalid HEAD request like the GET it mirrors', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=x', { method: 'HEAD' })
    expect(res.status).toBe(422)
  })
})

// Only the empty value stands for none. Anything else is a value, and has to be a valid one.
// 「指定なし」を意味するのは、空の値だけである。それ以外はすべて値であり、有効でなければならない。
describe('absent: an empty value that stands for none, and a default beside a reference', () => {
  // A word is a value, and not an integer.
  // 単語は値であり、整数ではない。
  it('empty_ok rejects a word', async () => {
    const res = await queryParamsApp.request('/absent?empty_ok=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['empty_ok'] })
  })

  // Whitespace is not the empty value.
  // 空白は、空の値ではない。
  it('empty_ok rejects whitespace', async () => {
    const res = await queryParamsApp.request('/absent?empty_ok=%20')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['empty_ok'] })
  })

  // The default does not cover a value that is wrong.
  // デフォルト値は、誤った値の代わりにはならない。
  it('empty_def rejects a word instead of falling back to its default', async () => {
    const res = await queryParamsApp.request('/absent?empty_def=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['empty_def'] })
  })

  // ref_def does not declare allowEmptyValue, so the empty value is a value, and not a number.
  // ref_def は allowEmptyValue を宣言していないため、空の値は値として扱われ、数値ではない。
  it('ref_def rejects an empty value', async () => {
    const res = await queryParamsApp.request('/absent?ref_def=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_def'] })
  })

  // -1 is below the minimum of Count.
  // -1 は Count の最小値を下回る。
  it('ref_def rejects a value below the minimum of the component', async () => {
    const res = await queryParamsApp.request('/absent?ref_def=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_def'] })
  })
})

// A property is validated like a parameter, and reported under the name of the object and its
// own.
// プロパティは、パラメータと同じように検証され、オブジェクト名と自身の名前で報告される。
describe('objects: a parameter spread over the query', () => {
  // age is an integer.
  // age は integer である。
  it('deep rejects a word where a property is an integer', async () => {
    const res = await queryParamsApp.request('/objects?deep[age]=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep.age'] })
  })

  // age has minimum: 0.
  // age は minimum: 0 である。
  it('deep rejects a property below its minimum', async () => {
    const res = await queryParamsApp.request('/objects?deep[age]=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep.age'] })
  })

  // ids is an array of integers.
  // ids は integer の配列である。
  it('deep rejects a bad element of an array property at its index', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids]=1&deep[ids]=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep.ids.1'] })
  })

  // name is a string, and a key sent twice arrives as an array.
  // name は string であり、2回送られたキーは配列として届く。
  it('deep rejects a scalar property sent twice', async () => {
    const res = await queryParamsApp.request('/objects?deep[name]=a&deep[name]=b')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep.name'] })
  })

  // deep=5 is a scalar under the name of the object, and a scalar is not an object.
  // deep=5 は、オブジェクトの名前で送られたスカラーである。スカラーはオブジェクトではない。
  it('deep rejects a value sent under its own name', async () => {
    const res = await queryParamsApp.request('/objects?deep=5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep'] })
  })

  // from is required by Range.
  // from は、Range で必須とされている。
  it('deep_ref reports a missing required property', async () => {
    const res = await queryParamsApp.request('/objects?deep_ref[to]=5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep_ref.from'] })
  })

  // from is an integer.
  // from は integer である。
  it('deep_ref rejects a word where the component declares an integer', async () => {
    const res = await queryParamsApp.request('/objects?deep_ref[from]=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep_ref.from'] })
  })

  // size is an integer.
  // size は integer である。
  it('spread rejects a word where a property is an integer', async () => {
    const res = await queryParamsApp.request('/objects?size=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['spread.size'] })
  })

  // sort is an enum of asc and desc.
  // sort は asc と desc の enum である。
  it('spread rejects a value that is not a member', async () => {
    const res = await queryParamsApp.request('/objects?sort=up')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['spread.sort'] })
  })

  // An exploded object is never sent under its own name: spread=1 is a scalar, not an object.
  // explode されたオブジェクトは、自身の名前で送られることはない。
  // spread=1 はスカラーであり、オブジェクトではない。
  it('spread rejects a value sent under its own name', async () => {
    const res = await queryParamsApp.request('/objects?spread=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['spread'] })
  })

  // age is an integer.
  // age は integer である。
  it('pairs rejects a word where a property is an integer', async () => {
    const res = await queryParamsApp.request('/objects?pairs=age,x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pairs.age'] })
  })

  // name,bob,age has three parts: the last name has no value.
  // name,bob,age は3つの部分からなる。最後の名前に対応する値がない。
  it('pairs rejects a name left without its value', async () => {
    const res = await queryParamsApp.request('/objects?pairs=name,bob,age')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pairs'] })
  })

  // An empty value holds no pair.
  // 空の値は、ペアを1つも含まない。
  it('pairs rejects an empty value', async () => {
    const res = await queryParamsApp.request('/objects?pairs=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pairs'] })
  })

  // filter of /styles is a deepObject whose age is an integer.
  // /styles の filter は deepObject であり、その age は integer である。
  it('filter validates the properties it gathers', async () => {
    const res = await queryParamsApp.request('/styles?filter[age]=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter.age'] })
  })

  // name is a string, so a key nested under it names a property name does not have.
  // name は string であるため、その下にネストしたキーは、name が持たないプロパティを指す。
  it('deep rejects a key nested under a property that is a string', async () => {
    const res = await queryParamsApp.request('/objects?deep[name][x]=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep.name'] })
  })

  // A key nested under range is read like a property of its own.
  // range の下にネストしたキーは、独立したプロパティと同じように読まれる。
  it('deep rejects a word nested under a property that is an integer', async () => {
    const res = await queryParamsApp.request('/objects?deep[range][min]=abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['deep.range.min'] })
  })

  // A key nothing declares is a property of extra, which holds it to an integer.
  // どこにも宣言されていないキーは extra のプロパティになり、integer であることを求められる。
  it('extra rejects a word for an additional property', async () => {
    const res = await queryParamsApp.request('/open?other=abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['extra.other'] })
  })
})

// An element of a split value is validated like an element of a repeated one, and reported at its
// index.
// 分割された値の要素は、繰り返し形式の要素と同じように検証され、そのインデックスで報告される。
describe('styles: serialisations other than form + explode', () => {
  // The second element is not an integer.
  // 2番目の要素が整数ではない。
  it('csv rejects a word among its elements', async () => {
    const res = await queryParamsApp.request('/styles?csv=1,x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['csv.1'] })
  })

  // Two commas in a row leave an empty element, which is not an integer.
  // カンマが連続すると空の要素が残る。空の要素は整数ではない。
  it('csv rejects an empty element', async () => {
    const res = await queryParamsApp.request('/styles?csv=1,,2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['csv.1'] })
  })

  // An empty value is one empty element, not an empty array.
  // 空の値は、空の配列ではなく、空の要素1つである。
  it('csv rejects an empty value', async () => {
    const res = await queryParamsApp.request('/styles?csv=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['csv.0'] })
  })

  // The separator of pipeDelimited is the pipe: 1,2 is one element, and not an integer.
  // pipeDelimited の区切り文字はパイプである。1,2 は1つの要素であり、整数ではない。
  it('pipes does not split on a comma', async () => {
    const res = await queryParamsApp.request('/styles?pipes=1,2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pipes.0'] })
  })

  // The separator of spaceDelimited is the space: 1,2 is one element, and not an integer.
  // spaceDelimited の区切り文字は空白である。1,2 は1つの要素であり、整数ではない。
  it('spaces does not split on a comma', async () => {
    const res = await queryParamsApp.request('/styles?spaces=1,2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['spaces.0'] })
  })
})

// What a component rejects, it rejects behind a reference too: the text is read the same way, and
// the constraints of the component apply to the value.
// コンポーネントが拒否する値は、参照経由でも拒否される。文字列は同じ方法で読み取られ、
// コンポーネントの制約はその値に適用される。
describe('references: a schema behind $ref', () => {
  // -1 is an integer, and below the minimum of Count.
  // -1 は整数であり、Count の最小値を下回る。
  it('ref_int rejects a value below the minimum of the component', async () => {
    const res = await queryParamsApp.request('/refs?ref_int=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })

  // A word is not an integer.
  // 単語は整数ではない。
  it('ref_int rejects a word', async () => {
    const res = await queryParamsApp.request('/refs?ref_int=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })

  // An empty value holds no digits, so it is not a number.
  // 空の値は数字を含まないため、数値ではない。
  it('ref_int rejects an empty value', async () => {
    const res = await queryParamsApp.request('/refs?ref_int=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('ref_int rejects a hexadecimal literal', async () => {
    const res = await queryParamsApp.request('/refs?ref_int=0x10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_int'] })
  })

  // A fraction is not an int64.
  // 小数は int64 ではない。
  it('ref_big rejects a fraction', async () => {
    const res = await queryParamsApp.request('/refs?ref_big=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_big'] })
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('ref_num rejects a word', async () => {
    const res = await queryParamsApp.request('/refs?ref_num=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_num'] })
  })

  // maybe is not a boolean spelling.
  // maybe は真偽値の表記ではない。
  it('ref_bool rejects a word', async () => {
    const res = await queryParamsApp.request('/refs?ref_bool=maybe')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_bool'] })
  })

  // 4 is an integer, and not a member of Level.
  // 4 は整数だが、Level のメンバーではない。
  it('ref_enum rejects a value that is not a member', async () => {
    const res = await queryParamsApp.request('/refs?ref_enum=4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_enum'] })
  })

  // Name has minLength: 2.
  // Name は minLength: 2 である。
  it('ref_str rejects a value shorter than minLength', async () => {
    const res = await queryParamsApp.request('/refs?ref_str=a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_str'] })
  })

  // The second element is not an integer.
  // 2番目の要素が整数ではない。
  it('ref_arr rejects a bad element at its index', async () => {
    const res = await queryParamsApp.request('/refs?ref_arr=1&ref_arr=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_arr.1'] })
  })

  // The second element is below the minimum of Count.
  // 2番目の要素が Count の最小値を下回る。
  it('arr_ref rejects an element below the minimum of the component', async () => {
    const res = await queryParamsApp.request('/refs?arr_ref=1&arr_ref=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['arr_ref.1'] })
  })

  // -1 is below the minimum of Count.
  // -1 は Count の最小値を下回る。
  it('allof_ref rejects a value below the minimum of the component', async () => {
    const res = await queryParamsApp.request('/refs?allof_ref=-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['allof_ref'] })
  })

  // A word is not an integer, however many references lead to the schema.
  // 何段の参照を経由しても、単語は整数ではない。
  it('ref_ref rejects a word', async () => {
    const res = await queryParamsApp.request('/refs?ref_ref=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref_ref'] })
  })
})

// The value a combinator rejects is reported under the name of the parameter, and a request it
// cannot satisfy is a rejection, never a server error.
// コンビネータが拒否した値は、パラメータ名で報告される。
// 満たせないリクエストは拒否となり、サーバーエラーにはならない。
describe('combinators: the text is read once', () => {
  // One below the minimum of the second branch.
  // 2番目の分岐の最小値を 1 下回る。
  it('allof rejects a value below the minimum', async () => {
    const res = await queryParamsApp.request('/combinators?allof=4')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['allof'] })
  })

  // A word is not an integer, the first branch.
  // 単語は、1番目の分岐が求める整数ではない。
  it('allof rejects a word', async () => {
    const res = await queryParamsApp.request('/combinators?allof=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['allof'] })
  })

  // 5.5 meets the minimum and is not an integer.
  // 5.5 は最小値を満たすが、整数ではない。
  it('allof rejects a fraction', async () => {
    const res = await queryParamsApp.request('/combinators?allof=5.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['allof'] })
  })

  // One below the minimum of the first branch.
  // 1番目の分岐の最小値を 1 下回る。
  it('allof_range rejects a value below the first bound', async () => {
    const res = await queryParamsApp.request('/combinators?allof_range=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['allof_range'] })
  })

  // One above the maximum of the second branch.
  // 2番目の分岐の最大値を 1 超える。
  it('allof_range rejects a value above the second bound', async () => {
    const res = await queryParamsApp.request('/combinators?allof_range=11')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['allof_range'] })
  })

  // x is not the text of an integer and not a boolean spelling.
  // x は整数の表記でも、真偽値の表記でもない。
  it('oneof_ib rejects a word that is neither', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_ib=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['oneof_ib'] })
  })

  // 3 is read as a number, and neither the number 3 nor the text "3" is a member.
  // 3 は number として読み取られるが、number の 3 も文字列の "3" もメンバーではない。
  it('mixed rejects a number that is not a member', async () => {
    const res = await queryParamsApp.request('/combinators?mixed=3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mixed'] })
  })

  // b is not a member.
  // b はメンバーではない。
  it('mixed rejects a word that is not a member', async () => {
    const res = await queryParamsApp.request('/combinators?mixed=b')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['mixed'] })
  })

  // Zero is the excluded value.
  // 0 は除外された値である。
  it('not_zero rejects zero', async () => {
    const res = await queryParamsApp.request('/combinators?not_zero=0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['not_zero'] })
  })

  // The type beside not still applies: a word is not an integer.
  // not と並ぶ type も適用される。単語は整数ではない。
  it('not_zero rejects a word', async () => {
    const res = await queryParamsApp.request('/combinators?not_zero=abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['not_zero'] })
  })

  // 1.5 is not zero, and not an integer either.
  // 1.5 は 0 ではないが、整数でもない。
  it('not_zero rejects a fraction', async () => {
    const res = await queryParamsApp.request('/combinators?not_zero=1.5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['not_zero'] })
  })

  // A word is a string.
  // 単語は string である。
  it('not_string rejects a word', async () => {
    const res = await queryParamsApp.request('/combinators?not_string=abc')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['not_string'] })
  })

  // 3 is a number, and not the constant.
  // 3 は数値だが、定数とは異なる。
  it('nconst rejects another number', async () => {
    const res = await queryParamsApp.request('/combinators?nconst=3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['nconst'] })
  })

  // The first position is an integer.
  // 1番目の位置は integer である。
  it('tuple rejects a word in an integer position', async () => {
    const res = await queryParamsApp.request('/combinators?tuple=x&tuple=a')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tuple.0'] })
  })

  // The third element is validated as items declares, a boolean.
  // 3番目の要素は、items の宣言どおり boolean として検証される。
  it('tuple rejects a word past the prefix', async () => {
    const res = await queryParamsApp.request('/combinators?tuple=1&tuple=a&tuple=maybe')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tuple.2'] })
  })

  // x is not the text of a number and not a boolean spelling.
  // x は数値の表記でも、真偽値の表記でもない。
  it('multi_nb rejects a word that is neither', async () => {
    const res = await queryParamsApp.request('/combinators?multi_nb=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['multi_nb'] })
  })
})

// A value that is not JSON is handed on as the text it is, which the schema of the document
// rejects.
// JSON でない値は文字列のまま渡され、文書のスキーマによって拒否される。
describe('content: a JSON document', () => {
  // In JSON "1" is a string. It is not read as a number: the document says what its types are.
  // JSON では "1" は string である。number としては読み取られない。
  // 型を決めるのは文書自身である。
  it('filter rejects a string where an integer is declared', async () => {
    const res = await queryParamsApp.request(
      `/content?filter=${encodeURIComponent('{"page":"1"}')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter.page'] })
  })

  // page is required.
  // page は必須である。
  it('filter rejects a document without its required property', async () => {
    const res = await queryParamsApp.request(
      `/content?filter=${encodeURIComponent('{"name":"bob"}')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter.page'] })
  })

  // The brace is never closed.
  // 波括弧が閉じられていない。
  it('filter rejects text that is not JSON', async () => {
    const res = await queryParamsApp.request(`/content?filter=${encodeURIComponent('{bad')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter'] })
  })

  // 5 is valid JSON, and not an object.
  // 5 は有効な JSON だが、オブジェクトではない。
  it('filter rejects a JSON number', async () => {
    const res = await queryParamsApp.request(`/content?filter=${encodeURIComponent('5')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter'] })
  })

  // An empty value is not a JSON document.
  // 空の値は JSON 文書ではない。
  it('filter rejects an empty value', async () => {
    const res = await queryParamsApp.request('/content?filter=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter'] })
  })

  // The second element is a JSON string.
  // 2番目の要素が JSON の string である。
  it('list rejects a string element', async () => {
    const res = await queryParamsApp.request(`/content?list=${encodeURIComponent('[1,"2"]')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['list.1'] })
  })

  // 1,2 is a serialised list, not a JSON array.
  // 1,2 はシリアライズされたリストであり、JSON の配列ではない。
  it('list rejects a comma-separated value', async () => {
    const res = await queryParamsApp.request('/content?list=1,2')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['list'] })
  })

  // A field of the form-encoded document is validated like a parameter.
  // フォームエンコードされた文書のフィールドは、パラメータと同じように検証される。
  it('form rejects a word where a field is an integer', async () => {
    const res = await queryParamsApp.request(`/content?form=${encodeURIComponent('a=abc')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['form.a'] })
  })

  // a is required by the schema of the document.
  // a は、文書のスキーマで必須とされている。
  it('form rejects a document without its required field', async () => {
    const res = await queryParamsApp.request(`/content?form=${encodeURIComponent('b=true')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['form.a'] })
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
  // The grammar is matched against whatever the client sends, so it must not backtrack: a
  // pattern that can split a run of digits in more than one way takes seconds on a run this
  // long, and one request would stall the server. The bound is generous; a backtracking
  // pattern misses it by an order of magnitude.
  // 文法はクライアントが送る任意の入力と照合されるため、バックトラックしてはならない。
  // 数字の並びを複数の方法で分割できるパターンは、この長さの入力に数秒を要し、
  // 1リクエストでサーバーが停止してしまう。上限には余裕を持たせているが、
  // バックトラックするパターンであれば、桁違いに超過する。
  it('number rejects 64000 digits followed by a letter without backtracking', async () => {
    const started = performance.now()
    const res = await queryParamsApp.request(`/params?number=${'1'.repeat(64000)}x`)
    const elapsed = performance.now() - started
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
    expect(elapsed).toBeLessThan(1000)
  })

  // The same for the integer grammar.
  // 整数の文法でも同様である。
  it('integer rejects 64000 digits followed by a letter without backtracking', async () => {
    const started = performance.now()
    const res = await queryParamsApp.request(`/params?integer=${'1'.repeat(64000)}x`)
    const elapsed = performance.now() - started
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
    expect(elapsed).toBeLessThan(1000)
  })

  // 64000 digits with nothing after them are a number, and one that is too large to hold.
  // 後ろに何も続かない 64000 桁は数値であるが、保持できる範囲を超えている。
  it('number rejects 64000 digits', async () => {
    const res = await queryParamsApp.request(`/params?number=${'1'.repeat(64000)}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // An integer beyond 2^53 cannot be held by a number: it would arrive as 9007199254740992, a
  // neighbouring value.
  // 2^53 を超える整数は number では保持できない。
  // 隣の値である 9007199254740992 として届いてしまう。
  it('number rejects "9007199254740993"', async () => {
    const res = await queryParamsApp.request('/params?number=9007199254740993')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A point with no digit on either side.
  // どちらの側にも数字がない小数点。
  it('number rejects "."', async () => {
    const res = await queryParamsApp.request('/params?number=.')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // An exponent with no digits.
  // 数字のない指数部。
  it('number rejects "1e"', async () => {
    const res = await queryParamsApp.request('/params?number=1e')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A numeric separator is source code syntax, not part of a decimal literal.
  // 数値セパレータはソースコードの構文であり、10進リテラルには含まれない。
  it('number rejects "1_000"', async () => {
    const res = await queryParamsApp.request('/params?number=1_000')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A minus sign with no digits.
  // 数字のないマイナス記号。
  it('integer rejects "-"', async () => {
    const res = await queryParamsApp.request('/params?integer=-')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // An explicit plus sign is not part of a decimal literal.
  // 明示的なプラス記号は、10進リテラルには含まれない。
  it('integer rejects "+1"', async () => {
    const res = await queryParamsApp.request(`/params?integer=${encodeURIComponent('+1')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // An explicit plus sign is not part of a decimal literal.
  // 明示的なプラス記号は、10進リテラルには含まれない。
  it('int64 rejects "+5"', async () => {
    const res = await queryParamsApp.request(`/params?int64=${encodeURIComponent('+5')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('integer rejects "0x10"', async () => {
    const res = await queryParamsApp.request('/params?integer=0x10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A binary literal is not decimal.
  // 2進リテラルは10進表記ではない。
  it('integer rejects "0b11"', async () => {
    const res = await queryParamsApp.request('/params?integer=0b11')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // An octal literal is not decimal.
  // 8進リテラルは10進表記ではない。
  it('integer rejects "0o7"', async () => {
    const res = await queryParamsApp.request('/params?integer=0o7')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('number rejects "0x1F"', async () => {
    const res = await queryParamsApp.request('/params?number=0x1F')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('int64 rejects "0x10"', async () => {
    const res = await queryParamsApp.request('/params?int64=0x10')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // Surrounding whitespace is not trimmed.
  // 前後の空白は取り除かれない。
  it('integer rejects " 42 "', async () => {
    const res = await queryParamsApp.request(`/params?integer=${encodeURIComponent(' 42 ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('integer rejects " "', async () => {
    const res = await queryParamsApp.request(`/params?integer=${encodeURIComponent(' ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['integer'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('number rejects " "', async () => {
    const res = await queryParamsApp.request(`/params?number=${encodeURIComponent(' ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['number'] })
  })

  // Whitespace alone is not a number.
  // 空白だけの値は数値ではない。
  it('int64 rejects " "', async () => {
    const res = await queryParamsApp.request(`/params?int64=${encodeURIComponent(' ')}`)
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64'] })
  })

  // An empty value holds no digits, so it is not a number.
  // 空の値は数字を含まないため、数値ではない。
  it('rejects an empty optional integer', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // With no "=" the value is empty too.
  // "=" がない場合も、値は空になる。
  it('rejects a bare integer name', async () => {
    const res = await queryParamsApp.request('/optional?int_opt')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_opt'] })
  })

  // An empty value holds no digits, so it is not an int64.
  // 空の値は数字を含まないため、int64 ではない。
  it('rejects an empty optional int64', async () => {
    const res = await queryParamsApp.request('/optional?int64_opt=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int64_opt'] })
  })

  // An empty value holds no digits, so it is not a number.
  // 空の値は数字を含まないため、数値ではない。
  it('rejects an empty optional number', async () => {
    const res = await queryParamsApp.request('/optional?num_opt=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['num_opt'] })
  })

  // The single empty value becomes a one-element array, and its element is not a number.
  // 単一の空の値は1要素の配列になり、その要素は数値ではない。
  it('rejects an empty array element', async () => {
    const res = await queryParamsApp.request('/optional?arr_opt=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['arr_opt.0'] })
  })

  // The empty first element is not a number; the second, 1, is.
  // 空である1番目の要素は数値ではない。2番目の 1 は数値である。
  it('rejects an empty element among others', async () => {
    const res = await queryParamsApp.request('/optional?arr_opt=&arr_opt=1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['arr_opt.0'] })
  })

  // The default of 20 does not apply, because the parameter was sent, and the empty value is not a
  // number.
  // パラメータ自体は送信されているため、デフォルトの 20 は適用されない。
  // 空の値は数値ではない。
  it('rejects an empty integer instead of falling back to its default', async () => {
    const res = await queryParamsApp.request('/defaults?int_def=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['int_def'] })
  })

  // type: [integer, null] reads null from the text "null"; the empty value is neither that
  // nor an integer.
  // type: [integer, null] は、テキスト "null" から null を読む。
  // 空の値は、そのテキストでも整数でもない。
  it('rejects an empty nullable integer', async () => {
    const res = await queryParamsApp.request('/literals?inull=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['inull'] })
  })

  // The text that stands for null is the one JSON spells, in lower case.
  // null を表すテキストは、JSON の表記どおり小文字である。
  it('rejects "NULL" for a nullable integer', async () => {
    const res = await queryParamsApp.request('/literals?inull=NULL')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['inull'] })
  })

  // Not every shape is that forgiving: the empty string is not a boolean spelling.
  // すべての形状が寛容なわけではない。空文字列は真偽値の表記ではない。
  it('rejects an empty boolean', async () => {
    const res = await queryParamsApp.request('/optional?bool_opt=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bool_opt'] })
  })

  // The empty string is not a UUID.
  // 空文字列は UUID ではない。
  it('rejects an empty UUID', async () => {
    const res = await queryParamsApp.request('/optional?uuid_opt=')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['uuid_opt'] })
  })

  // A required array that is absent is reported as tags, the array itself, and not as its
  // first element: the generated preprocess hands a missing value on as it is.
  // 必須配列が省略された場合、先頭要素ではなく配列そのものである tags として報告される。
  // 生成される preprocess は、欠落した値をそのまま渡すためである。
  it('reports an absent required array under its name', async () => {
    const res = await queryParamsApp.request('/required?id=1&big=1&flag=true&name=n')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['tags'] })
  })

  // The opposite case, stricter than the name suggests: httpUrl requires a dotted domain, so a
  // bare localhost does not pass.
  // 逆に、名前から想像されるより厳しい例。httpUrl はドットを含むドメインを要求するため、
  // localhost 単体は通らない。
  it('httpurl rejects "https://localhost"', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl=${encodeURIComponent('https://localhost')}`,
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['httpurl'] })
  })
})
