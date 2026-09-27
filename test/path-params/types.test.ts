// Every parameter shape the generator supports, sent as a real path segment. A path value
// is always single and always required, so each shape has a route of its own
// (`/<shape>/{value}`) and fails alone.
//
// 生成器が対応するすべてのパラメータ形状を、実際のパスセグメントとして送信して検証する。
// パスの値は常に単一かつ必須なので、形状ごとに専用ルート(`/<shape>/{value}`)を持ち、
// 失敗は形状単位で切り分けられる。
//
// This file checks types, not requests: the static type each route hands its handler.
// このファイルでは、リクエストではなく型を検証する。各ルートがハンドラへ渡す静的型である。
import type { z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import type { Equal } from '../types/assert'
import { assertType } from '../types/assert'
import type {
  getBooleanValueRoute,
  getIenumValueRoute,
  getInt64ValueRoute,
  getIntegerValueRoute,
  getNamedUserIdPostIdRoute,
  getNumberValueRoute,
  getOneofValueRoute,
  getOrgsOrgIdReposRepoIdIssuesIssueIdRoute,
  getParamrefIdRoute,
  getSenumValueRoute,
  getStringValueRoute,
  getUint64ValueRoute,
} from './__generated__/routes'

/**
 * What a handler reads from `c.req.valid('param')` for the route `R`.
 * ルート `R` のハンドラが `c.req.valid('param')` から受け取る型。
 */
type Param<R extends { request: { params: z.ZodType } }> = z.output<R['request']['params']>

// These are checked by `tsc`, not at run time: `assertType<Equal<A, B>>(true)` fails to
// compile unless A and B are the same type. A route can coerce correctly and still describe
// the value to its handler as `string`, or as `any`, which no request would reveal.
// これらは実行時ではなく `tsc` によって検証される。`assertType<Equal<A, B>>(true)` は、
// A と B が同じ型でなければコンパイルに失敗する。ルートが正しく coerce していても、
// ハンドラには値を `string` や `any` として見せている可能性があり、それはリクエストでは
// 検出できない。
describe('types: the static type handed to the handler', () => {
  // An integer with no format is a number.
  // フォーマット指定のない integer は number である。
  it('types an integer as number', () => {
    assertType<Equal<Param<typeof getIntegerValueRoute>, { value: number }>>(true)
    expect.assertions(0)
  })

  // A number is a number.
  // number は number である。
  it('types a number as number', () => {
    assertType<Equal<Param<typeof getNumberValueRoute>, { value: number }>>(true)
    expect.assertions(0)
  })

  // An int64 is a bigint, not a number that would lose precision.
  // int64 は bigint である。桁落ちする number ではない。
  it('types an int64 as bigint', () => {
    assertType<Equal<Param<typeof getInt64ValueRoute>, { value: bigint }>>(true)
    expect.assertions(0)
  })

  // A uint64 is a bigint as well.
  // uint64 も bigint である。
  it('types a uint64 as bigint', () => {
    assertType<Equal<Param<typeof getUint64ValueRoute>, { value: bigint }>>(true)
    expect.assertions(0)
  })

  // A boolean is a boolean, not the string the wire carried.
  // boolean は boolean である。ワイヤが運んだ文字列ではない。
  it('types a boolean as boolean', () => {
    assertType<Equal<Param<typeof getBooleanValueRoute>, { value: boolean }>>(true)
    expect.assertions(0)
  })

  // A string is a string.
  // string は string である。
  it('types a string as string', () => {
    assertType<Equal<Param<typeof getStringValueRoute>, { value: string }>>(true)
    expect.assertions(0)
  })

  // An integer enum narrows to the union of its members, not to number.
  // integer の enum は number ではなく、メンバーのユニオン型に絞り込まれる。
  it('narrows an integer enum to its members', () => {
    assertType<Equal<Param<typeof getIenumValueRoute>, { value: 1 | 2 }>>(true)
    expect.assertions(0)
  })

  // A string enum narrows to the union of its members, not to string.
  // string の enum は string ではなく、メンバーのユニオン型に絞り込まれる。
  it('narrows a string enum to its members', () => {
    assertType<Equal<Param<typeof getSenumValueRoute>, { value: 'asc' | 'desc' }>>(true)
    expect.assertions(0)
  })

  // A oneOf is the union of its branches.
  // oneOf は各分岐のユニオン型になる。
  it('types a oneOf as the union of its branches', () => {
    assertType<Equal<Param<typeof getOneofValueRoute>, { value: number | 'all' }>>(true)
    expect.assertions(0)
  })

  // Each of several parameters keeps its own name and its own type.
  // 複数のパラメータは、それぞれ自身の名前と型を保つ。
  it('types each of several parameters by its own schema', () => {
    assertType<
      Equal<
        Param<typeof getOrgsOrgIdReposRepoIdIssuesIssueIdRoute>,
        { orgId: number; repoId: string; issueId: bigint }
      >
    >(true)
    expect.assertions(0)
  })

  // A name that is not an identifier is a quoted key of the same object.
  // 識別子でない名前は、同じオブジェクトの引用符付きキーになる。
  it('keeps a name that is not an identifier as a key', () => {
    assertType<
      Equal<Param<typeof getNamedUserIdPostIdRoute>, { 'user-id': number; post_id: boolean }>
    >(true)
    expect.assertions(0)
  })

  // A parameter $ref resolves to the type of the parameter it points at.
  // パラメータの $ref は、参照先パラメータの型に解決される。
  it('resolves a parameter $ref to its type', () => {
    assertType<Equal<Param<typeof getParamrefIdRoute>, { id: bigint }>>(true)
    expect.assertions(0)
  })
})
