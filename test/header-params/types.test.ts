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
// This file checks types, not requests: the static type each route hands its handler.
// このファイルでは、リクエストではなく型を検証する。各ルートがハンドラへ渡す静的型である。
import type { z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import type { Equal } from '../types/assert'
import { assertType } from '../types/assert'
import type {
  getDefaultsRoute,
  getHeadersRoute,
  getOptionalRoute,
  getRequiredRoute,
} from './__generated__/routes'

/**
 * What a handler reads from `c.req.valid('header')` for the route `R`.
 * ルート `R` のハンドラが `c.req.valid('header')` から受け取る型。
 */
type Header<R extends { request: { headers: z.ZodType } }> = z.output<R['request']['headers']>

/**
 * The type of the header `K` once it is present.
 * ヘッダー `K` が存在する場合の型。
 */
type Present<T, K extends keyof T> = NonNullable<T[K]>

// These are checked by `tsc`, not at run time: `assertType<Equal<A, B>>(true)` fails to
// compile unless A and B are the same type. A route can coerce correctly and still describe
// the value to its handler as `string`, or as `any`, which no request would reveal.
// これらは実行時ではなく `tsc` によって検証される。`assertType<Equal<A, B>>(true)` は、
// A と B が同じ型でなければコンパイルに失敗する。ルートが正しく coerce していても、
// ハンドラには値を `string` や `any` として見せている可能性があり、それはリクエストでは
// 検出できない。
describe('types: the static type handed to the handler', () => {
  // An integer and a number are both number.
  // integer と number は、どちらも number である。
  it('types integers and numbers as number', () => {
    type Shapes = Header<typeof getHeadersRoute>
    assertType<Equal<Present<Shapes, 'x-integer'>, number>>(true)
    assertType<Equal<Present<Shapes, 'x-number'>, number>>(true)
    assertType<Equal<Present<Shapes, 'x-uint32'>, number>>(true)
    expect.assertions(0)
  })

  // int64, uint64 and format: bigint are bigint, not a number that would lose precision.
  // int64・uint64・format: bigint は bigint である。桁落ちする number ではない。
  it('types 64-bit integers as bigint', () => {
    type Shapes = Header<typeof getHeadersRoute>
    assertType<Equal<Present<Shapes, 'x-int64'>, bigint>>(true)
    assertType<Equal<Present<Shapes, 'x-uint64'>, bigint>>(true)
    assertType<Equal<Present<Shapes, 'x-bigint'>, bigint>>(true)
    expect.assertions(0)
  })

  // A boolean is a boolean, not the string the wire carried.
  // boolean は boolean である。ワイヤが運んだ文字列ではない。
  it('types booleans as boolean', () => {
    assertType<Equal<Present<Header<typeof getHeadersRoute>, 'x-boolean'>, boolean>>(true)
    expect.assertions(0)
  })

  // A format does not change the type.
  // フォーマットを付けても、型は変わらない。
  it('types strings and string formats as string', () => {
    type Shapes = Header<typeof getHeadersRoute>
    assertType<Equal<Present<Shapes, 'x-string'>, string>>(true)
    assertType<Equal<Present<Shapes, 'x-uuid'>, string>>(true)
    assertType<Equal<Present<Shapes, 'x-date'>, string>>(true)
    expect.assertions(0)
  })

  // x-ids is number[] and x-str-arr is string[].
  // x-ids は number[]、x-str-arr は string[] である。
  it('types an array header as an array', () => {
    assertType<Equal<Present<Header<typeof getHeadersRoute>, 'x-ids'>, number[]>>(true)
    assertType<Equal<Present<Header<typeof getOptionalRoute>, 'x-str-arr'>, string[]>>(true)
    expect.assertions(0)
  })

  // An enum is the union of its members and a const is its one value.
  // enum はメンバーのユニオン型、const はその唯一の値の型になる。
  it('narrows literals to their members', () => {
    type Optional = Header<typeof getOptionalRoute>
    assertType<Equal<Present<Optional, 'x-ienum'>, 1 | 2 | 3>>(true)
    assertType<Equal<Present<Optional, 'x-benum'>, true>>(true)
    assertType<Equal<Present<Optional, 'x-iconst'>, 7>>(true)
    assertType<Equal<Present<Optional, 'x-senum'>, 'asc' | 'desc'>>(true)
    assertType<Equal<Present<Optional, 'x-ioneof'>, number | 'all'>>(true)
    expect.assertions(0)
  })

  // undefined is assignable to the type of an optional header.
  // 任意ヘッダーの型には、undefined を代入できる。
  it('marks an optional header as possibly absent', () => {
    type Optional = Header<typeof getOptionalRoute>
    assertType<undefined extends Optional['x-int-opt'] ? true : false>(true)
    assertType<Equal<Present<Optional, 'x-int-opt'>, number>>(true)
    assertType<Equal<Present<Optional, 'x-int64-opt'>, bigint>>(true)
    expect.assertions(0)
  })

  // undefined is not assignable to the type of a required header.
  // 必須ヘッダーの型には、undefined を代入できない。
  it('marks a required header as always present', () => {
    type Required = Header<typeof getRequiredRoute>
    assertType<Equal<Required['x-id'], number>>(true)
    assertType<Equal<Required['x-big'], bigint>>(true)
    assertType<Equal<Required['x-flag'], boolean>>(true)
    assertType<Equal<Required['x-name'], string>>(true)
    assertType<undefined extends Required['x-note'] ? true : false>(true)
    expect.assertions(0)
  })

  // The default of an int64 is a bigint.
  // int64 のデフォルトは bigint である。
  it('types a default by its declared type', () => {
    type Defaults = Header<typeof getDefaultsRoute>
    assertType<Equal<Present<Defaults, 'x-int-def'>, number>>(true)
    assertType<Equal<Present<Defaults, 'x-int64-def'>, bigint>>(true)
    assertType<Equal<Present<Defaults, 'x-bool-def'>, boolean>>(true)
    assertType<Equal<Present<Defaults, 'x-str-def'>, string>>(true)
    expect.assertions(0)
  })

  // A name declared in mixed case, or with an underscore, is the key the handler reads.
  // 大文字小文字混在やアンダースコア付きで宣言された名前が、ハンドラの読み取るキーになる。
  it('keeps each declared name as a key', () => {
    type Optional = Header<typeof getOptionalRoute>
    assertType<Equal<Present<Optional, 'X-Request-Id'>, string>>(true)
    assertType<Equal<Present<Optional, 'X-Rate-Limit'>, number>>(true)
    assertType<Equal<Present<Optional, 'accept-version'>, number>>(true)
    assertType<Equal<Present<Optional, 'x_underscore'>, number>>(true)
    expect.assertions(0)
  })
})
