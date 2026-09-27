// Every parameter shape the generator supports, sent as a real cookie. A cookie reaches
// the handler as a string just like a query or header value, but it took the branch that
// used to skip coercion entirely, so every numeric or boolean cookie rejected its own
// input.
//
// 生成器が対応するすべてのパラメータ形状を、実際の Cookie として送信して検証する。
// Cookie もクエリやヘッダーと同じく文字列で届くが、かつて coerce を完全にスキップしていた
// 分岐を通るため、数値・真偽値の Cookie はすべて自身の入力を拒否していた。
//
// This file checks types, not requests: the static type each route hands its handler.
// このファイルでは、リクエストではなく型を検証する。各ルートがハンドラへ渡す静的型である。
import type { z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import type { Equal } from '../types/assert'
import { assertType } from '../types/assert'
import type {
  getCookiesRoute,
  getDefaultsRoute,
  getOptionalRoute,
  getRequiredRoute,
} from './__generated__/routes'

/**
 * What a handler reads from `c.req.valid('cookie')` for the route `R`.
 * ルート `R` のハンドラが `c.req.valid('cookie')` から受け取る型。
 */
type Cookie<R extends { request: { cookies: z.ZodType } }> = z.output<R['request']['cookies']>

/**
 * The type of the cookie `K` once it is present.
 * Cookie `K` が存在する場合の型。
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
    type Shapes = Cookie<typeof getCookiesRoute>
    assertType<Equal<Present<Shapes, 'integer'>, number>>(true)
    assertType<Equal<Present<Shapes, 'number'>, number>>(true)
    assertType<Equal<Present<Shapes, 'uint32'>, number>>(true)
    expect.assertions(0)
  })

  // int64, uint64 and format: bigint are bigint, not a number that would lose precision.
  // int64・uint64・format: bigint は bigint である。桁落ちする number ではない。
  it('types 64-bit integers as bigint', () => {
    type Shapes = Cookie<typeof getCookiesRoute>
    assertType<Equal<Present<Shapes, 'int64'>, bigint>>(true)
    assertType<Equal<Present<Shapes, 'uint64'>, bigint>>(true)
    assertType<Equal<Present<Shapes, 'bigint'>, bigint>>(true)
    expect.assertions(0)
  })

  // A boolean is a boolean, not the string the wire carried.
  // boolean は boolean である。ワイヤが運んだ文字列ではない。
  it('types booleans as boolean', () => {
    assertType<Equal<Present<Cookie<typeof getCookiesRoute>, 'boolean'>, boolean>>(true)
    expect.assertions(0)
  })

  // A format does not change the type.
  // フォーマットを付けても、型は変わらない。
  it('types strings and string formats as string', () => {
    type Shapes = Cookie<typeof getCookiesRoute>
    assertType<Equal<Present<Shapes, 'string'>, string>>(true)
    assertType<Equal<Present<Shapes, 'uuid'>, string>>(true)
    assertType<Equal<Present<Shapes, 'date'>, string>>(true)
    expect.assertions(0)
  })

  // ids is number[].
  // ids は number[] である。
  it('types an array cookie as an array', () => {
    assertType<Equal<Present<Cookie<typeof getCookiesRoute>, 'ids'>, number[]>>(true)
    expect.assertions(0)
  })

  // An enum is the union of its members and a const is its one value.
  // enum はメンバーのユニオン型、const はその唯一の値の型になる。
  it('narrows literals to their members', () => {
    type Optional = Cookie<typeof getOptionalRoute>
    assertType<Equal<Present<Optional, 'ienum'>, 1 | 2 | 3>>(true)
    assertType<Equal<Present<Optional, 'benum'>, true>>(true)
    assertType<Equal<Present<Optional, 'iconst'>, 7>>(true)
    assertType<Equal<Present<Optional, 'senum'>, 'asc' | 'desc'>>(true)
    assertType<Equal<Present<Optional, 'ioneof'>, number | 'all'>>(true)
    expect.assertions(0)
  })

  // undefined is assignable to the type of an optional cookie.
  // 任意 Cookie の型には、undefined を代入できる。
  it('marks an optional cookie as possibly absent', () => {
    type Optional = Cookie<typeof getOptionalRoute>
    assertType<undefined extends Optional['int_opt'] ? true : false>(true)
    assertType<Equal<Present<Optional, 'int_opt'>, number>>(true)
    assertType<Equal<Present<Optional, 'int64_opt'>, bigint>>(true)
    expect.assertions(0)
  })

  // undefined is not assignable to the type of a required cookie.
  // 必須 Cookie の型には、undefined を代入できない。
  it('marks a required cookie as always present', () => {
    type Required = Cookie<typeof getRequiredRoute>
    assertType<Equal<Required['id'], number>>(true)
    assertType<Equal<Required['big'], bigint>>(true)
    assertType<Equal<Required['flag'], boolean>>(true)
    assertType<Equal<Required['name'], string>>(true)
    assertType<undefined extends Required['note'] ? true : false>(true)
    expect.assertions(0)
  })

  // The default of an int64 is a bigint.
  // int64 のデフォルトは bigint である。
  it('types a default by its declared type', () => {
    type Defaults = Cookie<typeof getDefaultsRoute>
    assertType<Equal<Present<Defaults, 'int_def'>, number>>(true)
    assertType<Equal<Present<Defaults, 'int64_def'>, bigint>>(true)
    assertType<Equal<Present<Defaults, 'bool_def'>, boolean>>(true)
    assertType<Equal<Present<Defaults, 'str_def'>, string>>(true)
    expect.assertions(0)
  })

  // Each odd name is a key of the validated object, with the type of its schema.
  // 特殊な名前は、それぞれ検証済みオブジェクトのキーとなり、スキーマどおりの型を持つ。
  it('keeps a name that is not an identifier as a key', () => {
    type Optional = Cookie<typeof getOptionalRoute>
    assertType<Equal<Present<Optional, 'session-id'>, number>>(true)
    assertType<Equal<Present<Optional, 'user.id'>, number>>(true)
    assertType<Equal<Present<Optional, 'Int_Opt'>, string>>(true)
    expect.assertions(0)
  })
})
