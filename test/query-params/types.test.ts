// Every parameter shape the generator supports, sent as a real query string and checked
// for the JavaScript type and value it arrives as. HTTP carries all of them as strings, so
// a schema that forgets to coerce rejects its own input: the failure this file exists to
// catch.
//
// 生成器が対応するすべてのパラメータ形状を、実際のクエリ文字列として送信し、届いた時点の
// JavaScript の型と値を検証する。HTTP はすべてを文字列で運ぶため、coerce を忘れたスキーマは
// 自身の入力を拒否してしまう。このファイルは、その種の不具合を検出するためにある。
//
// This file checks types, not requests: the static type each route hands its handler.
// このファイルでは、リクエストではなく型を検証する。各ルートがハンドラへ渡す静的型である。
import type { z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import type { Equal } from '../types/assert'
import { assertType } from '../types/assert'
import type {
  getDefaultsRoute,
  getLimitsRoute,
  getLiteralsRoute,
  getOptionalRoute,
  getParamsRoute,
  getRequiredRoute,
} from './__generated__/routes'

/**
 * What a handler reads from `c.req.valid('query')` for the route `R`.
 * ルート `R` のハンドラが `c.req.valid('query')` から受け取る型。
 */
type Query<R extends { request: { query: z.ZodType } }> = z.output<R['request']['query']>

/**
 * The type of the parameter `K` once it is present.
 * パラメータ `K` が存在する場合の型。
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
  // An integer and a number are both number, as a scalar and as an array element.
  // integer と number は、スカラーでも配列要素でも number である。
  it('types integers and numbers as number', () => {
    type Params = Query<typeof getParamsRoute>
    assertType<Equal<Present<Params, 'integer'>, number>>(true)
    assertType<Equal<Present<Params, 'integer_arr'>, number[]>>(true)
    assertType<Equal<Present<Params, 'number'>, number>>(true)
    assertType<Equal<Present<Params, 'uint32'>, number>>(true)
    expect.assertions(0)
  })

  // int64, uint64 and format: bigint are bigint, not a number that would lose precision.
  // int64・uint64・format: bigint は bigint である。桁落ちする number ではない。
  it('types 64-bit integers as bigint', () => {
    type Params = Query<typeof getParamsRoute>
    assertType<Equal<Present<Params, 'int64'>, bigint>>(true)
    assertType<Equal<Present<Params, 'int64_arr'>, bigint[]>>(true)
    assertType<Equal<Present<Params, 'uint64'>, bigint>>(true)
    assertType<Equal<Present<Params, 'bigint'>, bigint>>(true)
    expect.assertions(0)
  })

  // A boolean is a boolean, not the string the wire carried.
  // boolean は boolean である。ワイヤが運んだ文字列ではない。
  it('types booleans as boolean', () => {
    type Params = Query<typeof getParamsRoute>
    assertType<Equal<Present<Params, 'boolean'>, boolean>>(true)
    assertType<Equal<Present<Params, 'boolean_arr'>, boolean[]>>(true)
    expect.assertions(0)
  })

  // A format or a transform does not change the type.
  // フォーマットや変換を付けても、型は変わらない。
  it('types strings and string formats as string', () => {
    type Params = Query<typeof getParamsRoute>
    assertType<Equal<Present<Params, 'string'>, string>>(true)
    assertType<Equal<Present<Params, 'uuid_arr'>, string[]>>(true)
    assertType<Equal<Present<Params, 'date'>, string>>(true)
    assertType<Equal<Present<Params, 'tx_email_trim'>, string>>(true)
    expect.assertions(0)
  })

  // An enum is the union of its members and a const is its one value, not number or string.
  // enum はメンバーのユニオン型、const はその唯一の値の型になる。
  // number や string にはならない。
  it('narrows literals to their members', () => {
    type Literals = Query<typeof getLiteralsRoute>
    assertType<Equal<Present<Literals, 'ienum'>, 1 | 2 | 3>>(true)
    assertType<Equal<Present<Literals, 'nenum'>, 1.5 | 2.5>>(true)
    assertType<Equal<Present<Literals, 'benum'>, true>>(true)
    assertType<Equal<Present<Literals, 'iconst'>, 7>>(true)
    assertType<Equal<Present<Literals, 'senum'>, 'asc' | 'desc'>>(true)
    assertType<Equal<Present<Literals, 'sconst'>, 'fixed'>>(true)
    assertType<Equal<Present<Literals, 'ienum_arr'>, (1 | 2 | 3)[]>>(true)
    expect.assertions(0)
  })

  // The integer branch is number, the string branch is the literal "all".
  // integer 側は number、string 側はリテラル "all" である。
  it('types a oneOf as the union of its branches', () => {
    assertType<Equal<Present<Query<typeof getLiteralsRoute>, 'ioneof'>, number | 'all'>>(true)
    expect.assertions(0)
  })

  // null is part of the type, though the wire has no way to send it.
  // null は型に含まれる。ただし、ワイヤ上でそれを送る手段はない。
  it('types a nullable integer as number or null', () => {
    type Literals = Query<typeof getLiteralsRoute>
    assertType<Equal<Exclude<Literals['inull'], undefined>, number | null>>(true)
    expect.assertions(0)
  })

  // undefined is assignable to the type of an optional parameter.
  // 任意パラメータの型には、undefined を代入できる。
  it('marks an optional parameter as possibly absent', () => {
    type Optional = Query<typeof getOptionalRoute>
    assertType<undefined extends Optional['int_opt'] ? true : false>(true)
    assertType<undefined extends Optional['arr_opt'] ? true : false>(true)
    expect.assertions(0)
  })

  // undefined is not assignable to the type of a required parameter.
  // 必須パラメータの型には、undefined を代入できない。
  it('marks a required parameter as always present', () => {
    type Required = Query<typeof getRequiredRoute>
    assertType<Equal<Required['id'], number>>(true)
    assertType<Equal<Required['big'], bigint>>(true)
    assertType<Equal<Required['flag'], boolean>>(true)
    assertType<Equal<Required['name'], string>>(true)
    assertType<Equal<Required['tags'], number[]>>(true)
    assertType<undefined extends Required['note'] ? true : false>(true)
    expect.assertions(0)
  })

  // The default of an int64 is a bigint and the default of an integer array is number[].
  // int64 のデフォルトは bigint、integer 配列のデフォルトは number[] である。
  it('types a default by its declared type', () => {
    type Defaults = Query<typeof getDefaultsRoute>
    assertType<Equal<Present<Defaults, 'int_def'>, number>>(true)
    assertType<Equal<Present<Defaults, 'int64_def'>, bigint>>(true)
    assertType<Equal<Present<Defaults, 'bool_def'>, boolean>>(true)
    assertType<Equal<Present<Defaults, 'enum_def'>, 'asc' | 'desc'>>(true)
    assertType<Equal<Present<Defaults, 'arr_int_def'>, number[]>>(true)
    expect.assertions(0)
  })

  // Each odd name is a key of the validated object, with the type of its schema.
  // 特殊な名前は、それぞれ検証済みオブジェクトのキーとなり、スキーマどおりの型を持つ。
  it('keeps a name that is not an identifier as a key', () => {
    type Optional = Query<typeof getOptionalRoute>
    assertType<Equal<Present<Optional, 'page-size'>, number>>(true)
    assertType<Equal<Present<Optional, 'filter[name]'>, string>>(true)
    assertType<Equal<Present<Optional, '$top'>, number>>(true)
    assertType<Equal<Present<Optional, 'user.id'>, number>>(true)
    assertType<Equal<Present<Optional, 'ids[]'>, number[]>>(true)
    expect.assertions(0)
  })

  // A range does not change the type.
  // 範囲を指定しても、型は変わらない。
  it('types a constrained int64 as bigint', () => {
    assertType<Equal<Present<Query<typeof getLimitsRoute>, 'int64range'>, bigint>>(true)
    expect.assertions(0)
  })
})
